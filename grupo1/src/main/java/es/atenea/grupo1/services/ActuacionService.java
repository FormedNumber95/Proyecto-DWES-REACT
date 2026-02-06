package es.atenea.grupo1.services;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import es.atenea.grupo1.datos.ActuacionDTO;
import es.atenea.grupo1.datos.InputActuacion;
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

    public ActuacionDTO insertarActuacion(InputActuacion input){
        if(input==null){
            return null;
        }
        Optional<Concierto> op=repoConcierto.findById(input.getConciertoId());
        if (op.isEmpty()){
            return null;
        }
        Actuacion actuacion=new Actuacion();
        actuacion.setArtistaId(input.getArtistaId());
        actuacion.setConcierto(op.get());
        //Un artista solo puede estar en un concierto al dia
        //Lista de los conciertos de un dia concreto
        List<Concierto> lst = repoConcierto.findByFechaBetween(actuacion.getConcierto().getFecha().toLocalDate().atStartOfDay(),
                actuacion.getConcierto().getFecha().toLocalDate().atTime(LocalTime.MAX));
        //comprobar si el artista esta en mas de una actuacion
        boolean esta=false;
        for(Concierto c:lst){
            List<Actuacion> lstActuaciones=repoActuacion.findByConcierto(c);
            for(Actuacion a:lstActuaciones){
                if(a.getArtistaId()==actuacion.getArtistaId()){
                    //marcar que se ha encontrado el artista
                    esta=true;
                }
            }
        }
        //comprobar si el artista ya tenia un concierto ese dia
        if(esta){
            return null;
        }
        Actuacion devuleto = repoActuacion.save(actuacion);
        return new ActuacionDTO(devuleto.getId(),devuleto.getConcierto().getId(),devuleto.getArtistaId());
    }

    public boolean borrarActuacion(Long id){
        if (!repoActuacion.existsById(id)) {
            return false;
        }
        repoActuacion.deleteById(id);
        return true;
    }


}
