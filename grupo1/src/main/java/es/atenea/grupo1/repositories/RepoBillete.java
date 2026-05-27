package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.atenea.grupo1.entities.Billete;
import java.util.List;
import es.atenea.grupo1.entities.Transporte;



public interface RepoBillete extends JpaRepository<Billete, Long> {

    List<Billete> findAllByUsuarioId(Long usuarioId);
    List<Billete> findAllByTransporte(Transporte transporte);
}
