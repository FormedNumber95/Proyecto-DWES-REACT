package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.TipoEntrada;
import java.util.List;
import es.atenea.grupo1.entities.Concierto;


@Repository
public interface RepoTipoEntrada extends JpaRepository<TipoEntrada, Long> {

    List<TipoEntrada> findByConcierto(Concierto concierto);

}
