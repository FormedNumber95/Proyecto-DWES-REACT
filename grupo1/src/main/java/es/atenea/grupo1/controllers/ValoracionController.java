package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.ValoracionDTO;
import es.atenea.grupo1.services.ValoracionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class ValoracionController {

    @Autowired
    ValoracionService valoracionService;

    @GetMapping("/valoraciones")
    public ResponseEntity<List<ValoracionDTO>> getValoraciones() {
        List<ValoracionDTO> lstValoracionDTOs = valoracionService.getValoraciones();
        if (lstValoracionDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstValoracionDTOs);
    }

    @GetMapping("/valoraciones/{id}")
    public ResponseEntity<ValoracionDTO> getValoracion(@PathVariable Long id) {
        ValoracionDTO lstValoracionDTO = valoracionService.getValoracion(id);
        if (lstValoracionDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(lstValoracionDTO);
    }

    @PostMapping("/valoraciones")
    public ResponseEntity<ValoracionDTO> postValoracion(@RequestBody ValoracionDTO valoracionDTO) {
        ValoracionDTO valoracion = this.valoracionService.postValoracion(valoracionDTO);
        if (valoracion == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(valoracion);
    }

    @PutMapping("valoraciones/{id}")
    public ResponseEntity<ValoracionDTO> putValoracion(@PathVariable Long id,
            @RequestBody ValoracionDTO valoracionDTO) {
        ValoracionDTO valoracion = this.valoracionService.putValoracion(id, valoracionDTO);
        if (valoracion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(valoracion);
    }

    @DeleteMapping("valoraciones/{id}")
    public ResponseEntity<ValoracionDTO> deleteValoracion(@PathVariable Long id) {
        if (this.valoracionService.deleteValoracion(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/conciertos/{conciertoId}/valoraciones")
    public ResponseEntity<List<ValoracionDTO>> obtenerValoracionesDeConcierto(@PathVariable Long conciertoId) {
        List<ValoracionDTO> lstValoracionDTOs = valoracionService.obtenerValoracionesDeConcierto(conciertoId);
        if (lstValoracionDTOs == null) {
            return ResponseEntity.notFound().build();
        }
        if (lstValoracionDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstValoracionDTOs);
    }

    @GetMapping("/conciertos/{conciertoId}/puntuacion-media")
    public ResponseEntity<Double> obtenerMediaDeConcierto(@PathVariable Long conciertoId) {
        Double media = valoracionService.obtenerMediaDeConcierto(conciertoId);
        if (media == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(media);
    }

    @GetMapping("/usuarios/{usuarioId}/valoraciones")
    public ResponseEntity<List<ValoracionDTO>> obtenerValoracionesDeUusario(@PathVariable Long usuarioId) {
        List<ValoracionDTO> lstValoracionDTOs = valoracionService.obtenerValoracionesDeUusario(usuarioId);
        if (lstValoracionDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstValoracionDTOs);
    }

}
