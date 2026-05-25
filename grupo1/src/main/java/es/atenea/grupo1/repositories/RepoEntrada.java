package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Entrada;
import java.util.List;
import es.atenea.grupo1.entities.TipoEntrada;



@Repository
public interface RepoEntrada extends JpaRepository<Entrada, Long> {

    List<Entrada> findAllByUsuarioId(Long usuarioId);

    List<Entrada> findAllByTipoEntrada(TipoEntrada tipoEntrada);

    List<Entrada> findAllByTipoEntradaAndUsuarioId(TipoEntrada tipoEntrada, Long usuarioId);

}
