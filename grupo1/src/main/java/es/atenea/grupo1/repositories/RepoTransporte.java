package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Transporte;
import java.util.List;
import es.atenea.grupo1.entities.Concierto;


@Repository
public interface RepoTransporte extends JpaRepository<Transporte, Long> {

    List<Transporte> findAllByConcierto(Concierto concierto);
    void deleteByConcierto(Concierto concierto);
}
