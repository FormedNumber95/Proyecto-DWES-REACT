package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Pedido;
import java.util.List;


@Repository
public interface RepoPedido extends JpaRepository<Pedido, Long> {
List<Pedido> findAllByUsuarioId(Long usuarioId);
}
