package es.atenea.grupo1.datos;

import java.time.LocalDateTime;

public record ConciertoDTO(
    Long id,
    String nombre,
    LocalDateTime fecha,
    Long recintoId,
    Double precioBase,
    String estado
) {}