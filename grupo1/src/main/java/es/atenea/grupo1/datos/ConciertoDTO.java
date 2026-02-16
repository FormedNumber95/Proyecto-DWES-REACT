package es.atenea.grupo1.datos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record ConciertoDTO(
        Long id,
        String nombre,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") 
        LocalDateTime fecha,
        Long recintoId,
        Double precioBase,
        String estado) {
}