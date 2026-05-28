package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Producto;
import java.util.List;
import es.atenea.grupo1.entities.Concierto;


@Repository
public interface RepoProducto extends JpaRepository<Producto, Long> {

    List<Producto> findAllByConcierto(Concierto concierto);
}
