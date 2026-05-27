package es.atenea.grupo1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.repositories.RepoLineapedido;
import es.atenea.grupo1.repositories.RepoPedido;
import es.atenea.grupo1.repositories.RepoProducto;

@Service
public class PedidoService {

    @Autowired
    private RepoLineapedido repoLineapedido;
    @Autowired
    private RepoPedido repoPedido;
    @Autowired
    private RepoProducto repoProducto;
}
