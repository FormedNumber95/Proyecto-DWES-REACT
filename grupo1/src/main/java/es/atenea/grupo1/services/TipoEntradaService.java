package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import es.atenea.grupo1.datos.InputTipoEntrda;
import es.atenea.grupo1.datos.RecintoDTO;
import es.atenea.grupo1.datos.TipoEntradaDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.TipoEntrada;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoTipoEntrada;

@Service
public class TipoEntradaService {

    @Autowired
    private RepoTipoEntrada repoTipoEntrada;
    @Autowired
    private RepoConcierto repoConcierto;
    // @Autowired
    // private RestTemplate restTemplate;

    public RecintoDTO obtenerRecinto(Long id) {
        RestTemplate r=new RestTemplate();
        String url = "http://localhost:8090/api/recintos/" + id;
        RecintoDTO recinto = r.getForObject(url, RecintoDTO.class);
        return recinto;

    }

    public List<TipoEntradaDTO> obtenerTiposDeEntradaDeConcierto(Long idConcierto) {
        Optional<Concierto> op = repoConcierto.findById(idConcierto);
        if (op.isEmpty()) {
            return null;
        }
        List<TipoEntrada> lst = repoTipoEntrada.findByConcierto(op.get());
        List<TipoEntradaDTO> devolver = new ArrayList<TipoEntradaDTO>();
        for (TipoEntrada tipo : lst) {
            devolver.add(new TipoEntradaDTO(tipo.getId(), idConcierto, tipo.getNombre(), tipo.getPrecio(),
                    tipo.getCupoMaximo()));
        }
        return devolver;
    }

    public TipoEntradaDTO insertarTipoEntrada(InputTipoEntrda inputTipoEntrda, Long idConcierto) {
        if (inputTipoEntrda == null) {
            return null;
        }
        Optional<Concierto> op = repoConcierto.findById(idConcierto);
        if (op.isEmpty()) {
            return null;
        }
        Concierto c = op.get();
        RecintoDTO recinto = obtenerRecinto(c.getId());
        List<TipoEntrada> lst = repoTipoEntrada.findByConcierto(c);
        int cant = 0;
        for (TipoEntrada tipo : lst) {
            cant += tipo.getCupoMaximo();
        }
        if (inputTipoEntrda.getCupoMaximo() > recinto.aforo() - cant) {
            return null;
        }
        TipoEntrada guardar = new TipoEntrada();
        guardar.setConcierto(c);
        guardar.setCupoMaximo(inputTipoEntrda.getCupoMaximo());
        guardar.setNombre(inputTipoEntrda.getNombre());
        guardar.setPrecio(inputTipoEntrda.getPrecio());
        TipoEntrada devolver = repoTipoEntrada.save(guardar);
        return new TipoEntradaDTO(devolver.getId(), devolver.getConcierto().getId(), devolver.getNombre(),
                devolver.getPrecio(), devolver.getCupoMaximo());
    }

    public TipoEntradaDTO actialuzarTipoEntrada(InputTipoEntrda inputTipoEntrda,Long id){
        if(inputTipoEntrda==null){
            return null;
        }
        Optional<Concierto> op = repoConcierto.findById(inputTipoEntrda.getConciertoId());
        if (op.isEmpty()) {
            return null;
        }
        Concierto c = op.get();
        RecintoDTO recinto = obtenerRecinto(c.getId());
        List<TipoEntrada> lst = repoTipoEntrada.findByConciertoAndIdNot(c,id);
        int cant = 0;
        for (TipoEntrada tipo : lst) {
            cant += tipo.getCupoMaximo();
        }
        if (inputTipoEntrda.getCupoMaximo() > recinto.aforo() - cant) {
            return null;
        }
        TipoEntrada guardar = new TipoEntrada();
        guardar.setConcierto(c);
        guardar.setCupoMaximo(inputTipoEntrda.getCupoMaximo());
        guardar.setNombre(inputTipoEntrda.getNombre());
        guardar.setPrecio(inputTipoEntrda.getPrecio());
        guardar.setId(id);
        TipoEntrada devolver = repoTipoEntrada.save(guardar);
        return new TipoEntradaDTO(devolver.getId(), devolver.getConcierto().getId(), devolver.getNombre(),
                devolver.getPrecio(), devolver.getCupoMaximo());
    }

    public boolean borrarTipoEntrada(Long id) {
        if (!repoTipoEntrada.existsById(id)) {
            return false;
        }
        repoTipoEntrada.deleteById(id);
        return true;
    }
}
