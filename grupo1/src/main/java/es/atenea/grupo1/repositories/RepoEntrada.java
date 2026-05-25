package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Entrada;

@Repository
public interface RepoEntrada extends JpaRepository<Entrada, Long> {

}
