package es.atenea.grupo1.services;

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
}
