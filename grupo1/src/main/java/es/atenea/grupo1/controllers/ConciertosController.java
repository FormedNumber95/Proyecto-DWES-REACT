package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.ConciertoDTO;
import es.atenea.grupo1.services.ConciertosService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



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
    public ResponseEntity<ConciertoDTO> getConciertoId(@PathVariable("conciertoId") Long conciertoId) {
        ConciertoDTO concierto = conciertoService.getConciertoId(conciertoId);

        if(concierto == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(concierto);
    }

    @PostMapping("/conciertos")
    public ResponseEntity<ConciertoDTO> postConcierto(@RequestBody ConciertoDTO conciertoDto){
        ConciertoDTO conciertoNew = conciertoService.postConcierto(conciertoDto);

        if(conciertoNew == null){
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().body(conciertoNew);
    }

    @PutMapping("/conciertos/{conciertoId}")
    public ResponseEntity<ConciertoDTO> putConcierto(@PathVariable("conciertoId") Long conciertoId, @RequestBody ConciertoDTO conciertoDto) {
        ConciertoDTO conciertoUpdate = conciertoService.putConcierto(conciertoId, conciertoDto);

        if(conciertoUpdate == null){
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok().body(conciertoUpdate);
    }

    @DeleteMapping("/conciertos/{conciertoId}")
    public ResponseEntity<ConciertoDTO> deleteConcierto(@PathVariable("conciertoId") Long conciertoId){
        boolean existe = conciertoService.deleteConcierto(conciertoId);
        if(!existe){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
