package com.conciertos.datos.dtos;

public record RecintoDTO(
    Long id,
    String nombre,
    int aforo,
    Long ciudadId
) {}
