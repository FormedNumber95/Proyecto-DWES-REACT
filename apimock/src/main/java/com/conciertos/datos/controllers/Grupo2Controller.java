package com.conciertos.datos.controllers;


import com.conciertos.datos.dtos.*;
import com.conciertos.datos.services.MockDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api/entradas")
public class Grupo2Controller {
    private final MockDataService service;

    public Grupo2Controller(MockDataService service) {
        this.service = service;
    }

    /* ================= ENTRADAS ================= */

    @GetMapping
    public ResponseEntity<List<EntradaDTO>> getEntradas() {
        return ResponseEntity.ok(service.getEntradas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntradaDTO> getEntrada(@PathVariable Long id) {
        EntradaDTO entrada = service.getEntradaById(id);
        return entrada != null
                ? ResponseEntity.ok(entrada)
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasByUsuario(@PathVariable Long usuarioId) {
        List<EntradaDTO> entradas = service.getEntradasByUsuario(usuarioId);
        return ResponseEntity.ok(entradas);
    }

    @GetMapping("/concierto/{conciertoId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasByConcierto(@PathVariable Long conciertoId) {
        List<EntradaDTO> entradas = service.getEntradasByConcierto(conciertoId);
        return ResponseEntity.ok(entradas);
    }

    @GetMapping("/usuario/{usuarioId}/concierto/{conciertoId}")
    public ResponseEntity<List<EntradaDTO>> getEntradasByUsuarioAndConcierto(
            @PathVariable Long usuarioId,
            @PathVariable Long conciertoId) {

        List<EntradaDTO> entradas = service.getEntradasByUsuarioAndConcierto(usuarioId, conciertoId);
        return ResponseEntity.ok(entradas);
    }
}
