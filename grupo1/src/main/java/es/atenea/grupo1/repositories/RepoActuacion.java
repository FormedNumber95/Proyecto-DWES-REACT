package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.atenea.grupo1.entities.Actuacion;

public interface RepoActuacion extends JpaRepository<Actuacion, Long> {

}
