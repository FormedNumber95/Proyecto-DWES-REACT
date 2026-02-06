package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.TipoEntradaDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.TipoEntrada;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoTipoEntrada;

@Service
public class TipoEntradaService {

    @Autowired
    RepoTipoEntrada repoTipoEntrada;
    @Autowired
    RepoConcierto repoConcierto;

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

    public boolean borrarTipoEntrada(Long id) {
        if (!repoTipoEntrada.existsById(id)) {
            return false;
        }
        repoTipoEntrada.deleteById(id);
        return true;
    }
}
