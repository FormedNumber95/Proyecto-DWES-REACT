package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.ActuacionDTO;
import es.atenea.grupo1.datos.TipoEntradaDTO;
import es.atenea.grupo1.services.TipoEntradaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class TipoEntradaController {

    @Autowired
    TipoEntradaService tipoEntradaService;

    @GetMapping("conciertos/{concId}/tipos-entrada")
    public ResponseEntity<List<TipoEntradaDTO>> getTiposDeEntradaDeConcierto(
            @PathVariable(name = "concId") Long concId) {
        List<TipoEntradaDTO> lst = tipoEntradaService.obtenerTiposDeEntradaDeConcierto(concId);
        if (lst == null) {
            return ResponseEntity.badRequest().build();
        }
        if (lst.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @DeleteMapping("tipos-entrada/{tipoEntradaId}")
    public ResponseEntity<TipoEntradaDTO> borrarTipoEntrada(@PathVariable(name = "tipoEntradaId") Long tipoEntradaId) {
        if (tipoEntradaService.borrarTipoEntrada(tipoEntradaId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
