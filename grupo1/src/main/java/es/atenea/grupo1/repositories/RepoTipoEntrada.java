package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.TipoEntrada;

@Repository
public interface RepoTipoEntrada extends JpaRepository<TipoEntrada, Long> {

}
