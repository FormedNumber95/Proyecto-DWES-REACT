// package es.atenea.grupo1.services;


// import org.springframework.stereotype.Service;

// import es.atenea.grupo1.datos.*;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;


// @Service
// public class MockDataService {

//     /* =====================================================
//        GRUPO 1 – CONCIERTOS
//        ===================================================== */


//     private final List<ConciertoDTO> conciertos = List.of(
//         new ConciertoDTO(1L, "Rock Festival Madrid", LocalDateTime.of(2026, 5, 10, 20, 0), 1L, 30.0, "FINALIZADO"),
//         new ConciertoDTO(2L, "Jazz Night Barcelona", LocalDateTime.of(2026, 6, 20, 21, 30), 2L, 25.0, "PROGRAMADO"),
//         new ConciertoDTO(3L, "Electronic Beats Madrid", LocalDateTime.of(2026, 4, 5, 19, 0), 1L, 40.0, "CANCELADO"),
//         new ConciertoDTO(4L, "Flamenco en Valencia", LocalDateTime.of(2026, 7, 15, 22, 0), 3L, 35.0, "PROGRAMADO"),
//         new ConciertoDTO(5L, "Pop Summer Sevilla", LocalDateTime.of(2026, 8, 10, 20, 30), 4L, 50.0, "PROGRAMADO")
//     );
    
//     private final List<ActuacionDTO> actuaciones = List.of(
//         new ActuacionDTO(1L, 1L, 1L),
//         new ActuacionDTO(2L, 1L, 2L),
//         new ActuacionDTO(3L, 2L, 3L),
//         new ActuacionDTO(4L, 3L, 4L),
//         new ActuacionDTO(5L, 4L, 5L)
//     );

//     private final List<TipoEntradaDTO> tiposEntrada = List.of(
//         new TipoEntradaDTO(1L, 1L, "General", 30.0, 2000),
//         new TipoEntradaDTO(2L, 1L, "VIP", 60.0, 500),
//         new TipoEntradaDTO(3L, 2L, "General", 25.0, 3000),
//         new TipoEntradaDTO(4L, 2L, "VIP", 50.0, 1000),
//         new TipoEntradaDTO(5L, 3L, "General", 40.0, 2500),
//         new TipoEntradaDTO(6L, 4L, "General", 35.0, 4000),
//         new TipoEntradaDTO(7L, 5L, "VIP", 70.0, 600)
//     );

//     /* =====================================================
//        MÉTODOS GRUPO 1
//        ===================================================== */

//     public List<ConciertoDTO> getConciertos() {
//         return conciertos;
//     }

//     public ConciertoDTO getConciertoById(Long id) {
//         for (ConciertoDTO concierto : conciertos) {
//             if (concierto.id().equals(id)) {
//                 return concierto;
//             }
//         }
//         return null;
//     }

//     public List<ActuacionDTO> getActuacionesByConcierto(Long conciertoId) {
//         List<ActuacionDTO> resultado = new ArrayList<>();
//         for (ActuacionDTO actuacion : actuaciones) {
//             if (actuacion.conciertoId().equals(conciertoId)) {
//                 resultado.add(actuacion);
//             }
//         }
//         return resultado;
//     }

//     public List<ActuacionDTO> getActuacionesByArtista(Long artistaId) {
//         List<ActuacionDTO> resultado = new ArrayList<>();
//         for (ActuacionDTO actuacion : actuaciones) {
//             if (actuacion.artistaId().equals(artistaId)) {
//                 resultado.add(actuacion);
//             }
//         }
//         return resultado;
//     }

//     public List<TipoEntradaDTO> getTiposEntradaByConcierto(Long conciertoId) {
//         List<TipoEntradaDTO> resultado = new ArrayList<>();
//         for (TipoEntradaDTO tipo : tiposEntrada) {
//             if (tipo.conciertoId().equals(conciertoId)) {
//                 resultado.add(tipo);
//             }
//         }
//         return resultado;
//     }
// }

    
