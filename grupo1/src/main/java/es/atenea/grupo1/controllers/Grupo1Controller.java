// package es.atenea.grupo1.controllers;


// import es.atenea.grupo1.datos.*;
// import es.atenea.grupo1.services.MockDataService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;



// // @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
// @CrossOrigin(originPatterns = "http://localhost:*")
// @RestController
// @RequestMapping("/api/conciertos")
// public class Grupo1Controller {
//     private final MockDataService service;

//     public Grupo1Controller(MockDataService service) {
//         this.service = service;
//     }

//     /* ================= CONCIERTOS ================= */

//     @GetMapping
//     public ResponseEntity<List<ConciertoDTO>> getConciertos() {
//         return ResponseEntity.ok(service.getConciertos());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<ConciertoDTO> getConcierto(@PathVariable Long id) {
//         ConciertoDTO concierto = service.getConciertoById(id);
//         return concierto != null
//                 ? ResponseEntity.ok(concierto)
//                 : ResponseEntity.notFound().build();
//     }

//     /* ================= ACTUACIONES ================= */

//     @GetMapping("/{id}/actuaciones")
//     public ResponseEntity<List<ActuacionDTO>> getActuacionesByConcierto(@PathVariable Long id) {
//         List<ActuacionDTO> actuaciones = service.getActuacionesByConcierto(id);
//         return ResponseEntity.ok(actuaciones);
//     }

//     @GetMapping("/artistas/{id}/actuaciones")
//     public ResponseEntity<List<ActuacionDTO>> getActuacionesByArtista(@PathVariable Long id) {
//         List<ActuacionDTO> actuaciones = service.getActuacionesByArtista(id);
//         return ResponseEntity.ok(actuaciones);
//     }

//     /* ================= TIPOS DE ENTRADA ================= */

//     @GetMapping("/{id}/tipos-entrada")
//     public ResponseEntity<List<TipoEntradaDTO>> getTiposEntrada(@PathVariable Long id) {
//         List<TipoEntradaDTO> tipos = service.getTiposEntradaByConcierto(id);
//         return ResponseEntity.ok(tipos);
//     }
   
// }
