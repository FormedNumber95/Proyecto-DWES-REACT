package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Actuacion;
import es.atenea.grupo1.entities.Concierto;

import java.util.List;

@Repository
public interface RepoActuacion extends JpaRepository<Actuacion, Long> {

    List<Actuacion> findByConcierto(Concierto concierto);
    List<Actuacion> findByArtistaId(Long artistaId);
}
