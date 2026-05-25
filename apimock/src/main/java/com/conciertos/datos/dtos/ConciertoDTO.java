package com.conciertos.datos.dtos;

import java.time.LocalDateTime;

public record ConciertoDTO(
    Long id,
    String nombre,
    LocalDateTime fecha,
    Long recintoId,
    Double precioBase,
    String estado
) {}