package es.atenea.grupo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.atenea.grupo1.datos.BilleteDTO;
import es.atenea.grupo1.datos.TransporteDTO;
import es.atenea.grupo1.services.TransporteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class TransporteController {

    @Autowired
    private TransporteService transporteService;

    @GetMapping("/billetes")
    public ResponseEntity<List<BilleteDTO>> obtenerTodosBilletes() {
        List<BilleteDTO> lst = transporteService.obtenerTodosBilletes();
        if (lst.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @GetMapping("/billetes/{id}")
    public ResponseEntity<BilleteDTO> obtenerBillete(@PathVariable Long id) {
        BilleteDTO billete = transporteService.obtenerBillete(id);
        if (billete == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(billete);
    }

    @GetMapping("/billetes/usuario/{usuarioId}")
    public ResponseEntity<List<BilleteDTO>> obtenerBilletesUsuario(@PathVariable Long usuarioId) {
        List<BilleteDTO> lst = transporteService.obtenerBilletesUsuario(usuarioId);
        if (lst.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @GetMapping("/transportes/{transporteId}/billetes")
    public ResponseEntity<List<BilleteDTO>> obtenerBilletesTransporte(@PathVariable Long transporteId) {
        List<BilleteDTO> lst = transporteService.obtenerBilletesTransporte(transporteId);
        if (lst == null) {
            return ResponseEntity.notFound().build();
        }
        if (lst.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @PostMapping("/billetes")
    public ResponseEntity<BilleteDTO> postBillete(@RequestBody BilleteDTO billeteDTO) {
        BilleteDTO billeteDevolver = transporteService.postBillete(billeteDTO);
        if (billeteDevolver == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(billeteDevolver);
    }

    @DeleteMapping("/billetes/{id}")
    public ResponseEntity<BilleteDTO> deleteBillete(@PathVariable Long id) {
        if (transporteService.deleteBillete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // INVENTADOS

    @GetMapping("/transportes")
    public ResponseEntity<List<TransporteDTO>> obtenerTodosTransportes() {
        List<TransporteDTO> lst = transporteService.obtenerTodosTransportes();
        if (lst.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lst);
    }

    @GetMapping("/transportes/{id}")
    public ResponseEntity<TransporteDTO> obtenerTransporte(@PathVariable Long id) {
        TransporteDTO transporte = transporteService.obtenerTransporte(id);
        if (transporte == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(transporte);
    }

    @GetMapping("/transportes/conciertos/{id}")
    public ResponseEntity<List<TransporteDTO>> obtenerTransportesConcierto(@PathVariable Long id) {
        List<TransporteDTO> lstTransporte = transporteService.obtenerTransportesConcierto(id);
        if (lstTransporte == null) {
            return ResponseEntity.notFound().build();
        }
        if(lstTransporte.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(lstTransporte);
    }

    @PostMapping("/transportes")
    public ResponseEntity<TransporteDTO> postTransporte(@RequestBody TransporteDTO transporteDTO) {
        TransporteDTO transporteDevolver = transporteService.postTransporte(transporteDTO);
        if (transporteDevolver == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(transporteDevolver);
    }

    @DeleteMapping("/transportes/conciertos/{id}")
    public ResponseEntity<List<TransporteDTO>> eliminarTransportesDeConcierto(@PathVariable Long id){
        if(transporteService.eliminarTransportesDeConcierto(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
