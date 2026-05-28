package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.PedidoDTO;
import es.atenea.grupo1.datos.ProductoDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Pedido;
import es.atenea.grupo1.entities.Producto;
import es.atenea.grupo1.repositories.RepoConcierto;
import es.atenea.grupo1.repositories.RepoLineapedido;
import es.atenea.grupo1.repositories.RepoPedido;
import es.atenea.grupo1.repositories.RepoProducto;
import jakarta.transaction.Transactional;

@Service
public class PedidoService {

    @Autowired
    private RepoLineapedido repoLineapedido;
    @Autowired
    private RepoPedido repoPedido;
    @Autowired
    private RepoProducto repoProducto;
    @Autowired
    private RepoConcierto repoConcierto;

    /**
     * Funcion para obtener todos los productos
     * 
     * @return lista de todos los productos
     */
    public List<ProductoDTO> obtenerProductos() {
        List<Producto> lstProductos = repoProducto.findAll();
        List<ProductoDTO> lstProductoDTOs = new ArrayList<>();
        for (Producto p : lstProductos) {
            lstProductoDTOs.add(
                    new ProductoDTO(p.getId(), p.getNombre(), p.getPrecio(), p.getStock(), p.getConcierto().getId()));
        }
        return lstProductoDTOs;
    }

    /**
     * Funcion para obtener un producto
     * 
     * @return el producto
     */
    public ProductoDTO obtenerProducto(Long id) {
        Optional<Producto> productoOptional = repoProducto.findById(id);
        if (productoOptional.isEmpty()) {
            return null;
        }
        Producto producto = productoOptional.get();
        return new ProductoDTO(producto.getId(), producto.getNombre(), producto.getPrecio(), producto.getStock(),
                producto.getConcierto().getId());
    }

    /**
     * Funcion para aniadir un nuevo producto
     * 
     * @param productoDTO el producto a aniadir
     * @return el producto aniadido
     */
    public ProductoDTO postProducto(ProductoDTO productoDTO) {
        Optional<Concierto> concirtoOptional = repoConcierto.findById(productoDTO.getConciertoId());
        if (concirtoOptional.isEmpty()) {
            return null;
        }
        Producto producto = new Producto(productoDTO.getId(), productoDTO.getNombre(), productoDTO.getPrecio(),
                productoDTO.getStock(), concirtoOptional.get());
        Producto productoNew = repoProducto.save(producto);
        return new ProductoDTO(productoNew.getId(), productoNew.getNombre(), productoNew.getPrecio(),
                productoNew.getStock(), productoNew.getConcierto().getId());
    }

    /**
     * Funcion para editar un producto
     * 
     * @param productoDTO el producto a editar
     * @return el producto editado
     */
    public ProductoDTO putProducto(Long id, ProductoDTO productoDTO) {
        Optional<Producto> producto = repoProducto.findById(id);
        if (producto.isEmpty()) {
            return null;
        }
        Optional<Concierto> concirtoOptional = repoConcierto.findById(productoDTO.getConciertoId());
        if (concirtoOptional.isEmpty()) {
            return null;
        }
        Producto productoEditado = repoProducto.save(new Producto(id, productoDTO.getNombre(),
                productoDTO.getPrecio(), productoDTO.getStock(), concirtoOptional.get()));
        return new ProductoDTO(productoEditado.getId(), productoEditado.getNombre(), productoEditado.getPrecio(),
                productoEditado.getStock(), productoEditado.getConcierto().getId());
    }

    /**
     * Funcion para eliminar un producto
     * 
     * @param id id del producto
     * @return si se ha eliminado o no
     */
    @Transactional
    public boolean deleteProducto(Long id) {
        Optional<Producto> productoOptional = repoProducto.findById(id);
        if (productoOptional.isEmpty()) {
            return false;
        }
        repoProducto.delete(productoOptional.get());
        return true;
    }

    /**
     * Funcion para obtener la lista de los pedidos de un usuario
     * 
     * @param id id del usuario
     * @return la lista de los pedidos del usuario
     */
    public List<PedidoDTO> obtenerPedidosUsuario(Long id) {
        List<Pedido> lstPedidos = repoPedido.findAllByUsuarioId(id);
        List<PedidoDTO> lstPedidoDTOs = new ArrayList<>();
        for (Pedido pedido : lstPedidos) {
            lstPedidoDTOs.add(new PedidoDTO(pedido.getId(), pedido.getUsuarioId(), pedido.getFecha()));
        }
        return lstPedidoDTOs;
    }

    /**
     * Funcion para obtener la informacion del pedido
     * 
     * @param id id del pedido
     * @return el pedido
     */
    public PedidoDTO obtenerPedido(Long id) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(id);
        if (pedidoOptional.isEmpty()) {
            return null;
        }
        Pedido pedido = pedidoOptional.get();
        return new PedidoDTO(pedido.getId(), pedido.getUsuarioId(), pedido.getFecha());
    }

    /**
     * Funcion para aniadir un pedido
     * 
     * @param pedidoDTO el pedido a aniadir
     * @return el pedido aniadido
     */
    public PedidoDTO postPedido(PedidoDTO pedidoDTO) {
        Pedido pedidoNew = repoPedido
                .save(new Pedido(pedidoDTO.getId(), pedidoDTO.getUsuarioId(), pedidoDTO.getFecha()));
        return new PedidoDTO(pedidoNew.getId(), pedidoNew.getUsuarioId(), pedidoNew.getFecha());
    }

    /**
     * Funcion para editar un pedido
     * 
     * @param pedidoDTO el pedido a editar
     * @return el pedido editado
     */
    public PedidoDTO putPedido(Long id,PedidoDTO pedidoDTO) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(id);
        if (pedidoOptional.isEmpty()) {
            return null;
        }
        Pedido pedidoEditado = repoPedido
                .save(new Pedido(id, pedidoDTO.getUsuarioId(), pedidoDTO.getFecha()));
        return new PedidoDTO(id, pedidoEditado.getUsuarioId(), pedidoEditado.getFecha());
    }

    /**
     * Funcion para eliminar un pedido
     * @param id
     * @return
     */
    @Transactional
    public boolean deletePedido(Long id){
        Optional<Pedido> pedidoOptional=repoPedido.findById(id);
        if(pedidoOptional.isEmpty()){
            return false;
        }
        repoPedido.deleteById(id);
        return true;
    }
}
