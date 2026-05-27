package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.atenea.grupo1.entities.Billete;

public interface RepoBillete extends JpaRepository<Billete, Long> {

}
