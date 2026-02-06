package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import es.atenea.grupo1.datos.ActuacionDTO;
import es.atenea.grupo1.entities.Actuacion;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.repositories.RepoActuacion;
import es.atenea.grupo1.repositories.RepoConcierto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ActuacionService {

    @Autowired RepoConcierto repoConcierto;
    @Autowired RepoActuacion repoActuacion;


    public List<ActuacionDTO> obtenerActuacionesDeConcierto(Long id){
        Optional<Concierto> op=repoConcierto.findById(id);
        if(op.isEmpty()){
            return null;
        }
        Concierto c=op.get();
        List<Actuacion> lst=repoActuacion.findByConcierto(c);
        List<ActuacionDTO> lstDevolver=new ArrayList<ActuacionDTO>();
        for(Actuacion a:lst){
            lstDevolver.add(new ActuacionDTO(a.getId(),a.getConcierto().getId(),a.getArtistaId()));
        }
        return lstDevolver;
    }

    public List<ActuacionDTO> obtenerActuacionesDeArtista(Long id){
        List<Actuacion> lst=repoActuacion.findByArtistaId(id);
        List<ActuacionDTO> lstDevolver=new ArrayList<ActuacionDTO>();
        for(Actuacion a:lst){
            lstDevolver.add(new ActuacionDTO(a.getId(),a.getConcierto().getId(),a.getArtistaId()));
        }
        return lstDevolver;
    }

    public ActuacionDTO insertarActuacion(Actuacion actuacion){
        if(actuacion==null){
            return null;
        }
        //TODO validar que el artista no este en otro concierto simultaneamente
        repoActuacion.save(actuacion);
        return new ActuacionDTO(actuacion.getId(),actuacion.getConcierto().getId(),actuacion.getArtistaId());
    }

    public boolean borrarActuacion(Long id){
        if (!repoActuacion.existsById(id)) {
            return false;
        }
        System.out.println("-------------------");
        repoActuacion.deleteById(id);
        System.out.println("-------------------");
        return true;
    }


}
