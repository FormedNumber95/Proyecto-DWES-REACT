package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.LineapedidoDTO;
import es.atenea.grupo1.datos.PedidoDTO;
import es.atenea.grupo1.datos.ProductoDTO;
import es.atenea.grupo1.services.PedidoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // PRODUCTOS

    @GetMapping("/productos")
    public ResponseEntity<List<ProductoDTO>> obtenerProductos() {
        List<ProductoDTO> lstProductoDTOs = pedidoService.obtenerProductos();
        if (lstProductoDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstProductoDTOs);
    }

    @GetMapping("/productos/{productoId}")
    public ResponseEntity<ProductoDTO> obtenerProducto(@PathVariable Long productoId) {
        ProductoDTO productoDTO = pedidoService.obtenerProducto(productoId);
        if (productoDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(productoDTO);
    }

    @GetMapping("/productos/conciertos/{id}")
    public ResponseEntity<List<ProductoDTO>> obtenerProductosDeConcierto(@PathVariable Long id) {
        List<ProductoDTO> lstProductoDTOs = pedidoService.obtenerProductosDeConcierto(id);
        if (lstProductoDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstProductoDTOs);
    }

    @PostMapping("/productos")
    public ResponseEntity<ProductoDTO> postProducto(@RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = pedidoService.postProducto(productoDTO);
        if (producto == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }

    @PutMapping("productos/{id}")
    public ResponseEntity<ProductoDTO> putProducto(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = pedidoService.putProducto(id, productoDTO);
        if (producto == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(producto);
    }

    @DeleteMapping("productos/{id}")
    public ResponseEntity<ProductoDTO> deleteProducto(@PathVariable Long id) {
        deleteLineapedidoDeProducto(id);
        if (pedidoService.deleteProducto(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // PEDIDOS

    @GetMapping("pedidos/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosUsuario(@PathVariable Long usuarioId) {
        List<PedidoDTO> lstPedidoDTOs = pedidoService.obtenerPedidosUsuario(usuarioId);
        if (lstPedidoDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstPedidoDTOs);
    }

    @GetMapping("pedidos/{pedidoId}")
    public ResponseEntity<PedidoDTO> getMethodName(@PathVariable Long pedidoId) {
        PedidoDTO pedidoDTO = pedidoService.obtenerPedido(pedidoId);
        if (pedidoDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(pedidoDTO);
    }

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoDTO> postPedido(@RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO pedido = pedidoService.postPedido(pedidoDTO);
        if (pedido == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    @PutMapping("pedidos/{idPedido}")
    public ResponseEntity<PedidoDTO> putPedido(@PathVariable Long idPedido, @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO pedido = pedidoService.putPedido(idPedido, pedidoDTO);
        if (pedido == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(pedido);
    }

    @DeleteMapping("pedidos/{idPedido}")
    public ResponseEntity<ProductoDTO> deletePedido(@PathVariable Long idPedido) {
        deleteLineapedidoDePedido(idPedido);
        if (pedidoService.deletePedido(idPedido)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // LINEA PEDIDO

    @GetMapping("pedidos/{pedidoId}/lineas")
    public ResponseEntity<List<LineapedidoDTO>> obtenerLineapedidosDePedido(@PathVariable Long pedidoId) {
        List<LineapedidoDTO> lstLineapedidoDTOs = pedidoService.obtenerLineapedidosDePedido(pedidoId);
        if (lstLineapedidoDTOs == null) {
            return ResponseEntity.notFound().build();
        }
        if (lstLineapedidoDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstLineapedidoDTOs);
    }

    @PostMapping("/pedidos/{pedidoId}/lineas")
    public ResponseEntity<LineapedidoDTO> postPedido(@PathVariable Long pedidoId,
            @RequestBody LineapedidoDTO lineapedidoDTO) {
        LineapedidoDTO lineapedido = pedidoService.postLineapedido(pedidoId, lineapedidoDTO);
        if (lineapedido == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(lineapedido);
    }

    @PutMapping("lineas/{lineaId}")
    public ResponseEntity<LineapedidoDTO> putLineapedido(@PathVariable Long lineaId,
            @RequestBody LineapedidoDTO lineapedidoDTO) {
        LineapedidoDTO lineapedido = pedidoService.putLineapedido(lineaId, lineapedidoDTO);
        if (lineapedido == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(lineapedido);
    }

    @DeleteMapping("lineas/{lineaId}")
    public ResponseEntity<ProductoDTO> deleteLineapedido(@PathVariable Long lineaId) {
        if (pedidoService.deleteLineapedido(lineaId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("lineas/pedidos/{pedidoId}")
    public ResponseEntity<ProductoDTO> deleteLineapedidoDePedido(@PathVariable Long pedidoId) {
        if (pedidoService.deleteLineapedidoDePedido(pedidoId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("lineas/productos/{productoId}")
    public ResponseEntity<ProductoDTO> deleteLineapedidoDeProducto(@PathVariable Long productoId) {
        if (pedidoService.deleteLineapedidoDeProducto(productoId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/compras/productos/{pedidoId}")
    public ResponseEntity<List<LineapedidoDTO>> postCompra(@PathVariable Long pedidoId, @RequestBody List<LineapedidoDTO> lineapedidoDTOs) {
        List<LineapedidoDTO> lineasNew = pedidoService.postCompras(pedidoId,lineapedidoDTOs);

        if (lineasNew == null) {
            return ResponseEntity.badRequest().build();
        }

        if (lineasNew.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(lineasNew);
    }
}
