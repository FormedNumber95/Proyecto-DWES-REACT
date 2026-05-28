package es.atenea.grupo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.datos.LineapedidoDTO;
import es.atenea.grupo1.datos.PedidoDTO;
import es.atenea.grupo1.datos.ProductoDTO;
import es.atenea.grupo1.entities.Concierto;
import es.atenea.grupo1.entities.Lineapedido;
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
     * Funcion para obtener los productos de un concierto
     * 
     * @param idConcierto id del concierto
     * @return lista de los productos
     */
    public List<ProductoDTO> obtenerProductosDeConcierto(Long idConcierto) {
        Optional<Concierto> conciertoOptional = repoConcierto.findById(idConcierto);
        if (conciertoOptional.isEmpty()) {
            return null;
        }
        List<Producto> lstProductos = repoProducto.findAllByConcierto(conciertoOptional.get());
        List<ProductoDTO> lstProductoDTOs = new ArrayList<>();
        for (Producto p : lstProductos) {
            lstProductoDTOs.add(
                    new ProductoDTO(p.getId(), p.getNombre(), p.getPrecio(), p.getStock(), p.getConcierto().getId()));
        }
        return lstProductoDTOs;
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
    public PedidoDTO putPedido(Long id, PedidoDTO pedidoDTO) {
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
     * 
     * @param id id del pedido a eliminar
     * @return si se ha eliminado el pedido
     */
    @Transactional
    public boolean deletePedido(Long id) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(id);
        if (pedidoOptional.isEmpty()) {
            return false;
        }
        repoPedido.deleteById(id);
        return true;
    }

    /**
     * Funcion para obtener las lineas de pedido de un pedido
     * 
     * @param idPedido id del pedido
     * @return
     *         lista de las lineas de pedido
     */
    public List<LineapedidoDTO> obtenerLineapedidosDePedido(Long idPedido) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(idPedido);
        if (pedidoOptional.isEmpty()) {
            return null;
        }
        List<Lineapedido> lstLineapedidos = repoLineapedido.findAllByPedido(pedidoOptional.get());
        List<LineapedidoDTO> lstLineapedidoDTOs = new ArrayList<>();
        for (Lineapedido linea : lstLineapedidos) {
            lstLineapedidoDTOs.add(new LineapedidoDTO(linea.getId(), linea.getPedido().getId(),
                    linea.getProducto().getId(), linea.getCantidad()));
        }
        return lstLineapedidoDTOs;
    }

    /**
     * Funcion para aniadir una linea de pedido
     * 
     * @param lineapedidoDTO la linea de pedido a aniadir
     * @return la linea de pedido aniadida
     */
    public LineapedidoDTO postLineapedido(Long pedidoId, LineapedidoDTO lineapedidoDTO) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(pedidoId);
        if (pedidoOptional.isEmpty()) {
            return null;
        }
        Optional<Producto> productoOptional = repoProducto.findById(lineapedidoDTO.getProductoId());
        if (productoOptional.isEmpty()) {
            return null;
        }
        Producto producto = productoOptional.get();
        if (producto.getStock() < lineapedidoDTO.getCantidad()) {
            return null;
        }
        Lineapedido lineapedidoNew = repoLineapedido
                .save(new Lineapedido(lineapedidoDTO.getId(), pedidoOptional.get(), producto,
                        lineapedidoDTO.getCantidad()));
        putProducto(producto.getId(), new ProductoDTO(producto.getId(), producto.getNombre(), producto.getPrecio(),
                producto.getStock() - lineapedidoNew.getCantidad(), producto.getConcierto().getId()));
        return new LineapedidoDTO(lineapedidoNew.getId(), pedidoId, lineapedidoNew.getProducto().getId(),
                lineapedidoNew.getCantidad());
    }

    /**
     * Funcion para editar una linea de pedido
     * 
     * @param pedidoDTO linea de pedido a editar
     * @return linea de pedido editada
     */
    public LineapedidoDTO putLineapedido(Long id, LineapedidoDTO lineapedidoDTO) {
        Optional<Lineapedido> lineaPedidoOptional = repoLineapedido.findById(id);
        if (lineaPedidoOptional.isEmpty()) {
            return null;
        }
        Lineapedido lineapedido = lineaPedidoOptional.get();
        Producto producto = repoProducto.findById(lineapedido.getProducto().getId()).get();
        if ((producto.getStock() + lineapedido.getCantidad() - lineapedidoDTO.getCantidad()) < 0) {
            return null;
        }
        long cantidadOriginal = lineapedido.getCantidad();
        Lineapedido lineapedidoEditada = repoLineapedido
                .save(new Lineapedido(lineapedido.getId(), lineapedido.getPedido(), lineapedido.getProducto(),
                        lineapedidoDTO.getCantidad()));
        putProducto(producto.getId(), new ProductoDTO(producto.getId(), producto.getNombre(), producto.getPrecio(),
                producto.getStock() + cantidadOriginal - lineapedidoEditada.getCantidad(),
                producto.getConcierto().getId()));
        return new LineapedidoDTO(lineapedidoEditada.getId(), lineapedidoEditada.getPedido().getId(),
                lineapedidoEditada.getProducto().getId(),
                lineapedidoEditada.getCantidad());
    }

    /**
     * Funcion para eliminar una linea de pedido
     * 
     * @param id id de la linea de pedido
     * @return si se ha elimnado
     */
    @Transactional
    public boolean deleteLineapedido(Long id) {
        Optional<Lineapedido> lineaPedidoOptional = repoLineapedido.findById(id);
        if (lineaPedidoOptional.isEmpty()) {
            return false;
        }
        repoLineapedido.deleteById(id);
        return true;
    }

    /**
     * Funcion para eliminar las lineas de pedido de un pedido
     * 
     * @param idPedido id del pedido
     * @return si se ha elimnado
     */
    @Transactional
    public boolean deleteLineapedidoDePedido(Long idPedido) {
        Optional<Pedido> pedidoOptional = repoPedido.findById(idPedido);
        if (pedidoOptional.isEmpty()) {
            return false;
        }
        repoLineapedido.deleteAllByPedido(pedidoOptional.get());
        return true;
    }

    /**
     * Funcion para eliminar las lineas de pedido de un producto
     * 
     * @param idProducto id del producto
     * @return si se ha elimnado
     */
    @Transactional
    public boolean deleteLineapedidoDeProducto(Long idProducto) {
        Optional<Producto> productoOptional = repoProducto.findById(idProducto);
        if (productoOptional.isEmpty()) {
            return false;
        }
        repoLineapedido.deleteAllByProducto(productoOptional.get());
        return true;
    }

    /**
     * Funcion para aniadir una serie de lineas de pedido
     * 
     * @param lstLineapedidoDTOs la lista de lineas de pedido
     * @return la lista de las lineas aniadidas
     */
    @Transactional
    public List<LineapedidoDTO> postCompras(Long idPedido, List<LineapedidoDTO> lstLineapedidoDTOs) {
        List<LineapedidoDTO> lstDevolver = new ArrayList<>();
        for (LineapedidoDTO lineapedidoDTO : lstLineapedidoDTOs) {
            LineapedidoDTO linea = postLineapedido(idPedido, lineapedidoDTO);
            if(linea==null){
                return null;
            }
            lstDevolver.add(linea);
        }
        return lstDevolver;
    }

    /**
     * Funcion para obtener los productos que ha comprado un usuario
     * @param idUsuario id del usuario
     * @return lista de los productos que ha comprado
     */
    public List<ProductoDTO> obtenerProductosDeUsuario(Long idUsuario){
        List<ProductoDTO> lstDevolver=new ArrayList<>();
        List<PedidoDTO> lstPedidosUsuario=obtenerPedidosUsuario(idUsuario);
        for(PedidoDTO pedidoDTO:lstPedidosUsuario){
            List<LineapedidoDTO> lstLineapedidoDTOs=obtenerLineapedidosDePedido(pedidoDTO.getId());
            for(LineapedidoDTO linea:lstLineapedidoDTOs){
                ProductoDTO productoDTO=obtenerProducto(linea.getProductoId());
                productoDTO.setCantidad(linea.getCantidad());
                lstDevolver.add(productoDTO);
            }
        }
        return lstDevolver;
    }
}
