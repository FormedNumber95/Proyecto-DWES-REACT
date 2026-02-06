package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.ConciertoDTO;
import es.atenea.grupo1.services.ConciertosService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api")
public class ConciertosController {

    @Autowired
    private ConciertosService conciertoService;

    @GetMapping("/conciertos")
    public ResponseEntity<List<ConciertoDTO>> getConciertos() {
        List<ConciertoDTO> conciertos = conciertoService.getConciertos();

        if(conciertos.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(conciertos);
    }

    
    @GetMapping("/conciertos/{conciertoId}")
    public ResponseEntity<ConciertoDTO> getConciertoId(@PathVariable Long conciertoId) {
        ConciertoDTO concierto = conciertoService.getConciertoId(conciertoId);

        if(concierto == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(concierto);
    }

}
