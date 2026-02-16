package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.ConciertoDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.repositories.RepoActuacion;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoTipoEntrada;

@Service
public class ConciertosService {

    @Autowired
    private RepoConcierto repoConcierto;
    @Autowired RepoActuacion repoActuacion;
    @Autowired RepoTipoEntrada repoTipoEntrada;


    public List<ConciertoDTO> getConciertos(){
        List<Concierto> conciertos = repoConcierto.findAll();
        List<ConciertoDTO> conciertoDTOs = new ArrayList<>();
        for(Concierto concierto : conciertos){
            conciertoDTOs.add(new ConciertoDTO(concierto.getId(), concierto.getNombre(), concierto.getFecha(), concierto.getRecintoId(), concierto.getPrecioBase(), concierto.getEstado()));
        }
        return conciertoDTOs;
    }

    public ConciertoDTO getConciertoId(Long id){
        Optional<Concierto> conciertoOpt = repoConcierto.findById(id);

        if(conciertoOpt.isEmpty()){
            return null;
        }

        Concierto concierto = conciertoOpt.get();

        ConciertoDTO conciertoDto = new ConciertoDTO(concierto.getId(),
                                                    concierto.getNombre(), 
                                                    concierto.getFecha(), 
                                                    concierto.getRecintoId(), 
                                                    concierto.getPrecioBase(), 
                                                    concierto.getEstado());

        return conciertoDto;
    }

    public ConciertoDTO postConcierto(ConciertoDTO conciertoDto){
        if(conciertoDto == null){
            return null;
        }
        System.out.println("-------------------------------------------------------------------a");
        Concierto concierto = new Concierto();
        concierto.setNombre(conciertoDto.nombre());
        concierto.setFecha(conciertoDto.fecha());
        concierto.setRecintoId(conciertoDto.recintoId());
        concierto.setPrecioBase(conciertoDto.precioBase());
        concierto.setEstado(conciertoDto.estado());
        System.out.println(concierto);
        System.out.println("-------------------------------------------------------------------a");

        Concierto conciertoNew = repoConcierto.save(concierto);
        System.out.println("-------------------------------------------------------------------a");

        ConciertoDTO conciertoDtoNew = new ConciertoDTO(conciertoNew.getId(),
                                                    conciertoNew.getNombre(), 
                                                    conciertoNew.getFecha(), 
                                                    conciertoNew.getRecintoId(), 
                                                    conciertoNew.getPrecioBase(), 
                                                    conciertoNew.getEstado());
        System.out.println("-------------------------------------------------------------------a");

        return conciertoDtoNew;
    }

    public ConciertoDTO putConcierto(Long conciertoId, ConciertoDTO conciertoDto){
        if(conciertoDto == null){
            return null;
        }

        Optional<Concierto> conciertoOpt = repoConcierto.findById(conciertoId);

        if(conciertoOpt.isEmpty()){
            return null;
        }

        Concierto concierto = conciertoOpt.get();

        concierto.setNombre(conciertoDto.nombre());
        concierto.setFecha(conciertoDto.fecha());
        concierto.setRecintoId(conciertoDto.recintoId());
        concierto.setPrecioBase(conciertoDto.precioBase());
        concierto.setEstado(conciertoDto.estado());

        Concierto conciertoUpdate = repoConcierto.save(concierto);

        ConciertoDTO conciertoDtoUpdate = new ConciertoDTO(conciertoUpdate.getId(),
                                                    conciertoUpdate.getNombre(), 
                                                    conciertoUpdate.getFecha(), 
                                                    conciertoUpdate.getRecintoId(), 
                                                    conciertoUpdate.getPrecioBase(), 
                                                    conciertoUpdate.getEstado());

        return conciertoDtoUpdate;
    }

    public boolean deleteConcierto(Long conciertoId){
        Optional<Concierto> conciertoOpt = repoConcierto.findById(conciertoId);

        if(conciertoOpt.isEmpty()){
            return false;
        }
        Concierto c=conciertoOpt.get();
        repoTipoEntrada.deleteAllByConcierto(c);
        repoActuacion.deleteAllByConcierto(c);
        repoConcierto.deleteById(conciertoId);
        return true;
    }

}
