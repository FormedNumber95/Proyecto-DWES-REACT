package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.EntradaDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Entrada;
import es.atenea.grupo1.entities.TipoEntrada;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoEntrada;
import es.atenea.grupo1.repositories.RepoTipoEntrada;
import jakarta.transaction.Transactional;

@Service
public class EntradaService {

    @Autowired
    RepoEntrada repoEntrada;
    @Autowired
    RepoTipoEntrada repoTipoEntrada;
    @Autowired
    RepoConcierto repoConcierto;

    /**
     * Funcion para obtener todas las entradas
     * 
     * @return lista de DTO de las entradas
     */
    public List<EntradaDTO> obtenerEntradasTodas() {
        List<EntradaDTO> lstDevolver = new ArrayList<>();
        List<Entrada> lstEntradas = repoEntrada.findAll();
        for (Entrada e : lstEntradas) {
            lstDevolver.add(new EntradaDTO(e.getId(), e.getTipoEntrada().getId(), e.getUsuarioId(), e.getFecha_compra(),
                    e.getCantidad()));
        }
        return lstDevolver;
    }

    /**
     * Funcion para obtener una entrada por su id
     * 
     * @param idEntrada id de la entrada a buscar
     * @return la entrada buscada o null
     */
    public EntradaDTO obtenerEntradaPorId(Long idEntrada) {
        Optional<Entrada> entradaOpt = repoEntrada.findById(idEntrada);
        if (entradaOpt.isEmpty()) {
            return null;
        }
        Entrada entrada = entradaOpt.get();
        return new EntradaDTO(entrada.getId(), entrada.getTipoEntrada().getId(), entrada.getUsuarioId(),
                entrada.getFecha_compra(),
                entrada.getCantidad());
    }

    /**
     * Funcion para obtener las entradas de un usuario
     * 
     * @param idUsuario id del usuario
     * @return entradas del usuario
     */
    public List<EntradaDTO> obtenerEntradasDeUsuario(Long idUsuario) {
        List<EntradaDTO> lstDevolver = new ArrayList<>();
        List<Entrada> lstEntradas = repoEntrada.findAllByUsuarioId(idUsuario);
        for (Entrada e : lstEntradas) {
            lstDevolver.add(new EntradaDTO(e.getId(), e.getTipoEntrada().getId(), e.getUsuarioId(), e.getFecha_compra(),
                    e.getCantidad()));
        }
        return lstDevolver;
    }

    /**
     * Funcion para obtener las entradas de un concierto
     * 
     * @param idConcierto id del concierto a buscar
     * @return lista de las entradas de ese concierto o null si hay error con el id
     *         del concierto
     */
    public List<EntradaDTO> obtenerEntradasPorConcierto(Long idConcierto) {
        Optional<Concierto> conciertoOpt = repoConcierto.findById(idConcierto);
        if (conciertoOpt.isEmpty()) {
            return null;
        }
        Concierto concierto = conciertoOpt.get();

        List<TipoEntrada> lstTiposEntrada = repoTipoEntrada.findByConcierto(concierto);

        List<EntradaDTO> lstDevolver = new ArrayList<>();
        List<Entrada> lstEntradas = new ArrayList<>();
        for (TipoEntrada t : lstTiposEntrada) {
            lstEntradas.addAll(repoEntrada.findAllByTipoEntrada(t));
        }
        for (Entrada e : lstEntradas) {
            lstDevolver.add(new EntradaDTO(e.getId(), e.getTipoEntrada().getId(), e.getUsuarioId(), e.getFecha_compra(),
                    e.getCantidad()));
        }
        return lstDevolver;
    }

    /**
     * Funcion para obtener las entradas de un concierto de un usuario
     * 
     * @param idConcierto id del concierto a buscar
     * @param idUsuario   id del usuario a buscar
     * @return lista de las entradas de ese concierto o null si hay error con el id
     *         del concierto
     */
    public List<EntradaDTO> obtenerEntradasPorConciertoYUsuarioId(Long idConcierto, Long idUsuario) {
        Optional<Concierto> conciertoOpt = repoConcierto.findById(idConcierto);
        if (conciertoOpt.isEmpty()) {
            return null;
        }
        Concierto concierto = conciertoOpt.get();

        List<TipoEntrada> lstTiposEntrada = repoTipoEntrada.findByConcierto(concierto);

        List<EntradaDTO> lstDevolver = new ArrayList<>();
        List<Entrada> lstEntradas = new ArrayList<>();
        for (TipoEntrada t : lstTiposEntrada) {
            lstEntradas.addAll(repoEntrada.findAllByTipoEntradaAndUsuarioId(t, idUsuario));
        }
        for (Entrada e : lstEntradas) {
            lstDevolver.add(new EntradaDTO(e.getId(), e.getTipoEntrada().getId(), e.getUsuarioId(), e.getFecha_compra(),
                    e.getCantidad()));
        }
        return lstDevolver;
    }

    /**
     * Funcion para insertar una nueva entrada en la db
     * 
     * @param entradaDto dto de la entrada a guardar
     * @return la entrada guardada
     */
    public EntradaDTO postEntrada(EntradaDTO entradaDto) {
        if (entradaDto == null) {
            return null;
        }
        Optional<TipoEntrada> tipoOpt = repoTipoEntrada.findById(entradaDto.getTipo_entradaId());
        if (tipoOpt.isEmpty()) {
            return null;
        }
        TipoEntrada tipo = tipoOpt.get();

        if(tipo.getConcierto().getEstado().equals("CANCELADO")){
            return null;
        }

        List<Entrada> entradas=repoEntrada.findAllByTipoEntrada(tipo);
        long cant=0;
        for(Entrada e:entradas){
            cant+=e.getCantidad();
        }
        if(tipo.getCupoMaximo()<cant+entradaDto.getCantidad()){
            return null;
        }

        Entrada entrada = new Entrada();
        entrada.setId(entradaDto.getId());
        entrada.setTipoEntrada(tipo);
        entrada.setUsuarioId(entradaDto.getUsuarioId());
        entrada.setFecha_compra(entradaDto.getFecha_compra());
        entrada.setCantidad(entradaDto.getCantidad());
        Entrada entradaNew = repoEntrada.save(entrada);
        return new EntradaDTO(entradaNew.getId(), entradaNew.getTipoEntrada().getId(), entradaNew.getUsuarioId(),
                entradaNew.getFecha_compra(), entradaNew.getCantidad());
    }

    /**
     * Funcion para actualizar una entrada
     * 
     * @param entradaDto dto de la entrada a guardar
     * @param entradaId  id de la entrada a guardar
     * @return la entrada guardada
     */
    public EntradaDTO putEntrada(EntradaDTO entradaDto, Long entradaId) {
        if (entradaDto == null) {
            return null;
        }
        Optional<TipoEntrada> tipoOpt = repoTipoEntrada.findById(entradaDto.getTipo_entradaId());
        if (tipoOpt.isEmpty()) {
            return null;
        }
        TipoEntrada tipo = tipoOpt.get();
        Optional<Entrada> entradaOpt = repoEntrada.findById(entradaId);
        if (entradaOpt.isEmpty()) {
            return null;
        }

        Entrada entrada = entradaOpt.get();
        entrada.setTipoEntrada(tipo);
        entrada.setUsuarioId(entradaDto.getUsuarioId());
        entrada.setFecha_compra(entradaDto.getFecha_compra());
        entrada.setCantidad(entradaDto.getCantidad());
        Entrada entradaNew = repoEntrada.save(entrada);
        return new EntradaDTO(entradaNew.getId(), entradaNew.getTipoEntrada().getId(), entradaNew.getUsuarioId(),
                entradaNew.getFecha_compra(), entradaNew.getCantidad());
    }

    /**
     * Funcion para eliminar una entrada
     * @param entradaId id de la entrada a eliminar
     * @return si se ha eliminado la entrada
     */
    public boolean deleteEntrada(Long entradaId) {
        Optional<Entrada> entradaOpt = repoEntrada.findById(entradaId);

        if (entradaOpt.isEmpty()) {
            return false;
        }

        repoEntrada.deleteById(entradaId);
        return true;
    }

    /**
     * funcion para aniadir varias entradas en una sola operacion
     * @param entradasAAniadir lista de las entradas a aniadir
     * @return la lista de las entradas
     */
    @Transactional
    public List<EntradaDTO> postCompras(List<EntradaDTO> entradasAAniadir){
        List<EntradaDTO> lstDevolver=new ArrayList<>();

        for(EntradaDTO e:entradasAAniadir){
            if(postEntrada(e)==null){
                return null;
            }
        }

        return lstDevolver;
    }
}
