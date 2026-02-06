package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.ActuacionDTO;
import es.atenea.grupo1.datos.InputActuacion;
import es.atenea.grupo1.services.ActuacionService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class ActuacionController {

    @Autowired ActuacionService actuacionService;

    @GetMapping("conciertos/{concId}/actuaciones")
    public ResponseEntity<List<ActuacionDTO>> obtenerActuacionesDeConcierto(@PathVariable (name = "concId") Long concId) {
        List<ActuacionDTO>lst=actuacionService.obtenerActuacionesDeConcierto(concId);
        if(lst==null){
            return ResponseEntity.notFound().build();
        }
        if(lst.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @GetMapping("conciertos/artistas/{artistaId}/actuaciones")
    public ResponseEntity<List<ActuacionDTO>> obtenerActuacionedDeArtista(@PathVariable (name = "artistaId") Long artistaId) {
        List<ActuacionDTO>lst=actuacionService.obtenerActuacionesDeArtista(artistaId);
        if(lst.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @PostMapping("actuaciones")
    public ResponseEntity<ActuacionDTO> postActuacion(@RequestBody InputActuacion input) {
        ActuacionDTO actuacionDTO = actuacionService.insertarActuacion(input);
        if (actuacionDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(actuacionDTO);
    }

    @DeleteMapping("actuaciones/{actId}")
    public ResponseEntity<ActuacionDTO> borrarActuacion(@PathVariable (name = "actId") Long actId){
        if (actuacionService.borrarActuacion(actId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    
    

}
