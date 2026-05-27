package es.atenea.grupo1.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.BilleteDTO;
import es.atenea.grupo1.entities.Billete;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Entrada;
import es.atenea.grupo1.entities.TipoEntrada;
import es.atenea.grupo1.entities.Transporte;
import es.atenea.grupo1.repositories.RepoBillete;
import es.atenea.grupo1.repositories.RepoEntrada;
import es.atenea.grupo1.repositories.RepoTipoEntrada;
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
    private RepoTipoEntrada repoTipoEntrada;

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
        if (ahora.plusHours(2).isAfter(billeteOptional.get().getFechaCompra())) {
            return false;
        }
        repoBillete.deleteById(id);
        return true;

    }
}
