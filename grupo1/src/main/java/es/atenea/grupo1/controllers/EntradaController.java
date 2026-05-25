package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.EntradaDTO;
import es.atenea.grupo1.services.EntradaService;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class EntradaController {

    @Autowired
    EntradaService entradaService;

    @GetMapping("/entradas")
    public ResponseEntity<List<EntradaDTO>> getEntradas() {
        List<EntradaDTO> entradas = entradaService.obtenerEntradasTodas();
        if (entradas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(entradas);
    }

    @GetMapping("/entradas/{entradaId}")
    public ResponseEntity<EntradaDTO> getEntradaPorId(@PathVariable Long entradaId) {
        EntradaDTO entrada = entradaService.obtenerEntradaPorId(entradaId);
        if (entrada == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(entrada);
    }

    @GetMapping("/entradas/usuario/{usuarioId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasDeUsuario(@PathVariable Long usuarioId) {
        List<EntradaDTO> entradas = entradaService.obtenerEntradasDeUsuario(usuarioId);

        if (entradas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(entradas);
    }

    @GetMapping("/entradas/concierto/{conciertoId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasDeConcierto(@PathVariable Long conciertoId) {
        List<EntradaDTO> entradas = entradaService.obtenerEntradasPorConcierto(conciertoId);

        if (entradas == null) {
            return ResponseEntity.notFound().build();
        }

        if (entradas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(entradas);
    }

    @GetMapping("/entradas/usuario/{usuarioId}/concierto/{conciertoId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasDeConciertoDeUsuario(@PathVariable Long usuarioId,
            @PathVariable Long conciertoId) {
        List<EntradaDTO> entradas = entradaService.obtenerEntradasPorConciertoYUsuarioId(conciertoId, usuarioId);

        if (entradas == null) {
            return ResponseEntity.notFound().build();
        }

        if (entradas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(entradas);
    }

    @PostMapping("/entradas")
    public ResponseEntity<EntradaDTO> postEntrada(@RequestBody EntradaDTO entradaDTO) {
        EntradaDTO entradaNew = entradaService.postEntrada(entradaDTO);

        if (entradaNew == null) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().body(entradaNew);
    }

    @PutMapping("/entradas/{entradaId}")
    public ResponseEntity<EntradaDTO> putEntrada(@RequestBody EntradaDTO entradaDTO,@PathVariable Long entradaId) {
        EntradaDTO entradaNew = entradaService.putEntrada(entradaDTO,entradaId);

        if (entradaNew == null) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().body(entradaNew);
    }
}
