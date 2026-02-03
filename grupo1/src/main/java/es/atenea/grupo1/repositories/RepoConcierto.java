package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.atenea.grupo1.entities.Concierto;

public interface RepoConcierto extends JpaRepository<Concierto, Long> {

}
