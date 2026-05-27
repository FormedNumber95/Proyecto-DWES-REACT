package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.PedidoDTO;
import es.atenea.grupo1.datos.ProductoDTO;
import es.atenea.grupo1.entities.Pedido;
import es.atenea.grupo1.services.PedidoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

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
        if (pedidoService.deleteProducto(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

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

}
