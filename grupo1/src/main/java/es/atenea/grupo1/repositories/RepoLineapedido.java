package es.atenea.grupo1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.atenea.grupo1.entities.Lineapedido;
import java.util.List;
import es.atenea.grupo1.entities.Pedido;

@Repository
public interface RepoLineapedido extends JpaRepository<Lineapedido, Long> {

    List<Lineapedido> findAllByPedido(Pedido pedido);
    void deleteAllByPedido(Pedido pedido);
}
