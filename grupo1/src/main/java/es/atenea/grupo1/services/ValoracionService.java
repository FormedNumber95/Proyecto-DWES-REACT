package es.atenea.grupo1.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.ValoracionDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Valoracion;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoValoracion;

@Service
public class ValoracionService {

    @Autowired
    RepoValoracion repoValoracion;
    @Autowired
    RepoConcierto repoConcierto;

    /**
     * Funcion para obtener todas las valoraciones
     * 
     * @return lista de las valoraciones
     */
    public List<ValoracionDTO> getValoraciones() {
        List<Valoracion> lstValoracions = repoValoracion.findAll();
        List<ValoracionDTO> lstValoracionDTOs = new ArrayList<>();
        for (Valoracion valoracion : lstValoracions) {
            lstValoracionDTOs.add(
                    new ValoracionDTO(valoracion.getId(), valoracion.getConcierto().getId(), valoracion.getUsuarioId(),
                            valoracion.getPuntuacion(), valoracion.getComentario(), valoracion.getFecha()));
        }
        return lstValoracionDTOs;
    }

    /**
     * Funcion para obtener la informacion de una valoracion
     * 
     * @param idValoracion id de la valoracion
     * @return la valoracion
     */
    public ValoracionDTO getValoracion(Long idValoracion) {
        Optional<Valoracion> valoracionOptional = repoValoracion.findById(idValoracion);
        if (valoracionOptional.isEmpty()) {
            return null;
        }
        Valoracion valoracion = valoracionOptional.get();
        return new ValoracionDTO(valoracion.getId(), valoracion.getConcierto().getId(), valoracion.getUsuarioId(),
                valoracion.getPuntuacion(), valoracion.getComentario(), valoracion.getFecha());
    }

    /**
     * Funcion para aniadur una nueva valoracion
     * 
     * @param valoracionDTO la valoraciona aniadir
     * @return la valoracion aniadida
     */
    public ValoracionDTO postValoracion(ValoracionDTO valoracionDTO) {
        Optional<Concierto> concioertoOptional = repoConcierto.findById(valoracionDTO.getConciertoId());
        if (concioertoOptional.isEmpty()) {
            return null;
        }
        Valoracion valoracion = repoValoracion.save(
                new Valoracion(valoracionDTO.getId(), concioertoOptional.get(), valoracionDTO.getUsuarioId(),
                        valoracionDTO.getPuntuacion(), valoracionDTO.getComentario(), valoracionDTO.getFecha()));
        return new ValoracionDTO(valoracion.getId(), valoracion.getConcierto().getId(), valoracion.getUsuarioId(),
                valoracion.getPuntuacion(), valoracion.getComentario(), valoracion.getFecha());
    }

    /**
     * Funcion para editar una valoracion
     * 
     * @param id            id de la valoracion a editar
     * @param valoracionDTO la valoracion con la edicion
     * @return la valoracion editada
     */
    public ValoracionDTO putValoracion(Long id, ValoracionDTO valoracionDTO) {
        Optional<Valoracion> valoracionOptional = this.repoValoracion.findById(id);
        if (valoracionOptional.isEmpty()) {
            return null;
        }
        Valoracion valoracion = valoracionOptional.get();
        if (valoracion.getFecha().isAfter(LocalDateTime.now().plusHours(2))) {
            return null;
        }
        Valoracion valoracionEditada = this.repoValoracion
                .save(new Valoracion(id, valoracion.getConcierto(), valoracion.getUsuarioId(),
                        valoracionDTO.getPuntuacion(), valoracionDTO.getComentario(), valoracionDTO.getFecha()));
        return new ValoracionDTO(id, valoracionEditada.getConcierto().getId(), valoracionEditada.getUsuarioId(),
                valoracionEditada.getPuntuacion(), valoracionEditada.getComentario(), valoracionEditada.getFecha());
    }

    /**
     * Funcion para borrar una valoracion
     * 
     * @param id id de la valoracion
     * @return si se ha borrado
     */
    public boolean deleteValoracion(Long id) {
        Optional<Valoracion> valoracionOptional = this.repoValoracion.findById(id);
        if (valoracionOptional.isEmpty()) {
            return false;
        }
        this.repoValoracion.delete(valoracionOptional.get());
        return true;
    }

    /**
     * Funcion para obtener las valoraciones de un concierto
     * 
     * @param conciertoId id del concierto
     * @return lista de las actuaciones del concierto
     */
    public List<ValoracionDTO> obtenerValoracionesDeConcierto(Long conciertoId) {
        Optional<Concierto> conciertoOptional = this.repoConcierto.findById(conciertoId);
        if (conciertoOptional.isEmpty()) {
            return null;
        }
        List<Valoracion> lstValoracions = this.repoValoracion.findAllByConcierto(conciertoOptional.get());
        List<ValoracionDTO> lstValoracionDTOs = new ArrayList<>();
        for (Valoracion valoracion : lstValoracions) {
            lstValoracionDTOs.add(new ValoracionDTO(valoracion.getId(), conciertoId, valoracion.getUsuarioId(),
                    valoracion.getPuntuacion(), valoracion.getComentario(), valoracion.getFecha()));
        }
        return lstValoracionDTOs;
    }

    /**
     * Funcion para obtener la media de las puntuaciones de un concierto
     * 
     * @param conciertoId id del concierto
     * @return la puntuacion media
     */
    public Double obtenerMediaDeConcierto(Long conciertoId) {
        Optional<Concierto> conciertoOptional = this.repoConcierto.findById(conciertoId);
        if (conciertoOptional.isEmpty()) {
            return null;
        }
        Double media = 0.0;
        Long cont = 0L;
        List<Valoracion> lstValoracions = this.repoValoracion.findAllByConcierto(conciertoOptional.get());
        for (Valoracion valoracion : lstValoracions) {
            cont++;
            media += valoracion.getPuntuacion();
        }
        return media / cont;
    }

    /**
     * Funcion para obtener las valoraciones de un usuario
     * 
     * @param usuarioId id del usuario
     * @return lista de las valoraciones
     */
    public List<ValoracionDTO> obtenerValoracionesDeUsuario(Long usuarioId) {
        List<Valoracion> lstValoracions = this.repoValoracion.findAllByUsuarioId(usuarioId);
        List<ValoracionDTO> lstValoracionDTOs = new ArrayList<>();
        for (Valoracion valoracion : lstValoracions) {
            lstValoracionDTOs.add(new ValoracionDTO(valoracion.getId(), usuarioId, valoracion.getUsuarioId(),
                    valoracion.getPuntuacion(), valoracion.getComentario(), valoracion.getFecha()));
        }
        return lstValoracionDTOs;
    }
}
