package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Lineapedido;

@Repository
public interface RepoLineapedido extends JpaRepository<Lineapedido, Long> {

}
