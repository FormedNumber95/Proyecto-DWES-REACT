package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.ConciertoDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.repositories.RepoConcierto;

@Service
public class ConciertosService {

    @Autowired
    private RepoConcierto repoConcierto;


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

        Concierto concierto = new Concierto();
        concierto.setNombre(conciertoDto.nombre());
        concierto.setFecha(conciertoDto.fecha());
        concierto.setRecintoId(conciertoDto.recintoId());
        concierto.setPrecioBase(conciertoDto.precioBase());
        concierto.setEstado(conciertoDto.estado());

        Concierto conciertoNew = repoConcierto.save(concierto);

        ConciertoDTO conciertoDtoNew = new ConciertoDTO(conciertoNew.getId(),
                                                    conciertoNew.getNombre(), 
                                                    conciertoNew.getFecha(), 
                                                    conciertoNew.getRecintoId(), 
                                                    conciertoNew.getPrecioBase(), 
                                                    conciertoNew.getEstado());

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

    public ConciertoDTO deleteConcierto(Long conciertoId){
        Optional<Concierto> conciertoOpt = repoConcierto.findById(conciertoId);

        if(conciertoOpt.isEmpty()){
            return null;
        }

        Concierto concierto = conciertoOpt.get();

        repoConcierto.delete(concierto);

        ConciertoDTO conciertoDtoDelete = new ConciertoDTO(concierto.getId(),
                                                    concierto.getNombre(), 
                                                    concierto.getFecha(), 
                                                    concierto.getRecintoId(), 
                                                    concierto.getPrecioBase(), 
                                                    concierto.getEstado());

        return conciertoDtoDelete;
    }

}
