package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.atenea.grupo1.entities.TipoEntrada;

public interface RepoTipoEntrada extends JpaRepository<TipoEntrada, Long> {

}
