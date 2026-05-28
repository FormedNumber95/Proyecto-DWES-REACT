package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Valoracion;
import java.util.List;
import es.atenea.grupo1.entities.Concierto;



@Repository
public interface RepoValoracion extends JpaRepository<Valoracion, Long>{
List<Valoracion> findAllByConcierto(Concierto concierto);
List<Valoracion> findAllByUsuarioId(Long usuarioId);
}
