package es.atenea.grupo1.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.BilleteDTO;
import es.atenea.grupo1.datos.TransporteDTO;
import es.atenea.grupo1.entities.Billete;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Entrada;
import es.atenea.grupo1.entities.Transporte;
import es.atenea.grupo1.repositories.RepoBillete;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoEntrada;
import es.atenea.grupo1.repositories.RepoTransporte;

@Service
public class TransporteService {

    @Autowired
    private RepoBillete repoBillete;
    @Autowired
    private RepoTransporte repoTransporte;
    @Autowired
    private RepoEntrada repoEntrada;
    @Autowired
    private RepoConcierto repoConcierto;

    /**
     * Funcion para obtener todos los billetes
     * 
     * @return lista de los billetes
     */
    public List<BilleteDTO> obtenerTodosBilletes() {
        List<Billete> lstBilletes = repoBillete.findAll();
        List<BilleteDTO> lstBilleteDTOs = new ArrayList<>();
        for (Billete billete : lstBilletes) {
            lstBilleteDTOs.add(new BilleteDTO(billete.getId(), billete.getFechaCompra(), billete.getUsuarioId(),
                    billete.getTransporte().getId()));
        }
        return lstBilleteDTOs;
    }

    /**
     * Funcion para obtener la informacion de un billete
     * 
     * @param id id del billete
     * @return la informacion del billete
     */
    public BilleteDTO obtenerBillete(Long id) {
        Optional<Billete> billeteOpt = repoBillete.findById(id);
        if (billeteOpt.isEmpty()) {
            return null;
        }
        Billete billete = billeteOpt.get();
        return new BilleteDTO(billete.getId(), billete.getFechaCompra(), billete.getUsuarioId(),
                billete.getTransporte().getId());
    }

    /**
     * Funcion para obtener los billetes de un usuario
     * 
     * @param idUsuario id del usuario
     * @return lista con los billetes del usuario
     */
    public List<BilleteDTO> obtenerBilletesUsuario(Long idUsuario) {
        List<Billete> lstBilletes = repoBillete.findAllByUsuarioId(idUsuario);
        List<BilleteDTO> lstBilleteDTOs = new ArrayList<>();
        for (Billete billete : lstBilletes) {
            lstBilleteDTOs.add(new BilleteDTO(billete.getId(), billete.getFechaCompra(), billete.getUsuarioId(),
                    billete.getTransporte().getId()));
        }
        return lstBilleteDTOs;
    }

    /**
     * Funcion para obtener los billetes de un transporte
     * 
     * @param idTransporte id del transporte
     * @return lista con los billetes vendidos del transporte
     */
    public List<BilleteDTO> obtenerBilletesTransporte(Long idTransporte) {
        Optional<Transporte> transporteOptional = repoTransporte.findById(idTransporte);
        if (transporteOptional.isEmpty()) {
            return null;
        }
        List<Billete> lstBilletes = repoBillete.findAllByTransporte(transporteOptional.get());
        List<BilleteDTO> lstBilleteDTOs = new ArrayList<>();
        for (Billete billete : lstBilletes) {
            lstBilleteDTOs.add(new BilleteDTO(billete.getId(), billete.getFechaCompra(), billete.getUsuarioId(),
                    billete.getTransporte().getId()));
        }
        return lstBilleteDTOs;
    }

    /**
     * Funcion para aniadir un billete a la db
     * 
     * @param billete el billeta a aniadir
     * @return el billete aniadido
     */
    public BilleteDTO postBillete(BilleteDTO billete) {
        List<Entrada> lstEntradas = repoEntrada.findAllByUsuarioId(billete.getUsuarioId());
        List<Concierto> lstConciertos = new ArrayList<>();
        for (Entrada e : lstEntradas) {
            Concierto c = e.getTipoEntrada().getConcierto();
            if (!c.getEstado().equals("CANCELADO") && !c.getEstado().equals("FINALIZADO")) {
                lstConciertos.add(c);
            }
        }
        Optional<Transporte> transporteOptional = repoTransporte.findById(billete.getTransporteId());
        if (transporteOptional.isEmpty()) {
            return null;
        }
        Transporte transporte = transporteOptional.get();
        if (!lstConciertos.contains(transporte.getConcierto())) {
            return null;
        }
        int cont = obtenerBilletesTransporte(billete.getTransporteId()).size();
        if (cont == transporte.getPlazas()) {
            return null;
        }
        Billete b = new Billete(billete.getId(), billete.getFechaCompra(), billete.getUsuarioId(),
                transporte);
        Billete bNew = repoBillete.save(b);
        return new BilleteDTO(bNew.getId(), bNew.getFechaCompra(), bNew.getUsuarioId(), bNew.getTransporte().getId());
    }

    /**
     * Funcion para eliminar un billete
     * 
     * @param id id del billete a eliminar
     * @return si se ha podido eliminar o no
     */
    public boolean deleteBillete(Long id) {
        Optional<Billete> billeteOptional = repoBillete.findById(id);
        if (billeteOptional.isEmpty()) {
            return false;
        }
        LocalDateTime ahora = LocalDateTime.now();
        if (ahora.plusHours(2).isAfter(billeteOptional.get().getTransporte().getHoraSalida())) {
            return false;
        }
        repoBillete.deleteById(id);
        return true;
    }

    // INVENTADOS

    /**
     * Funcion para obtener todos los tranportes
     * 
     * @return lista de todos los transportes
     */
    public List<TransporteDTO> obtenerTodosTransportes() {
        List<Transporte> lstTransportes = repoTransporte.findAll();
        List<TransporteDTO> lstTransporteDTOs = new ArrayList<>();
        for (Transporte t : lstTransportes) {
            lstTransporteDTOs.add(new TransporteDTO(t.getId(), t.getTipo(), t.getPrecio(), t.getLugarSalida(),
                    t.getHoraSalida(), t.getPlazas(), t.getConcierto().getId()));
        }
        return lstTransporteDTOs;
    }

    /**
     * Funcion para obtener un transporte por su id
     * 
     * @param id id del transporte
     * @return el transporte
     */
    public TransporteDTO obtenerTransporte(Long id) {
        Optional<Transporte> tOptional = repoTransporte.findById(id);
        if (tOptional.isEmpty()) {
            return null;
        }
        Transporte t = tOptional.get();
        return new TransporteDTO(t.getId(), t.getTipo(), t.getPrecio(), t.getLugarSalida(),
                t.getHoraSalida(), t.getPlazas(), t.getConcierto().getId());
    }

    /**
     * Funcion para obtener todos los transportes de un concierto
     * @param idConcierto id del concierto
     * @return lista con los transportes del concierto
     */
    public List<TransporteDTO> obtenerTransportesConcierto(Long idConcierto){
        Optional<Concierto> conciertoOptional=repoConcierto.findById(idConcierto);
        if(conciertoOptional.isEmpty()){
            return null;
        }
        List<Transporte> lstTransportes=repoTransporte.findAllByConcierto(conciertoOptional.get());
        List<TransporteDTO> lstTransporteDTOs=new ArrayList<>();
        for(Transporte t:lstTransportes){
            lstTransporteDTOs.add(new TransporteDTO(t.getId(),t.getTipo(),t.getPrecio(),t.getLugarSalida(),t.getHoraSalida(),t.getPlazas(), idConcierto));
        }
        return lstTransporteDTOs;
    }

    /**
     * Funcion para aniadir un transporte
     * @param transporte el transporte a aniadir
     * @return el transporte aniadido
     */
    public TransporteDTO postTransporte(TransporteDTO transporte){
        Optional<Concierto> c=repoConcierto.findById(transporte.getConciertoId());
        if(c.isEmpty()){
            return null;
        }
        Transporte t=new Transporte(transporte.getId(),transporte.getTipo(),transporte.getPrecio(),transporte.getLugarSalida(),transporte.getHoraSalida(), transporte.getPlazas(),c.get());
        Transporte tNew=repoTransporte.save(t);
        return new TransporteDTO(t.getId(),tNew.getTipo(),tNew.getPrecio(),tNew.getLugarSalida(),tNew.getHoraSalida(),tNew.getPlazas(),tNew.getConcierto().getId());
    }
}
