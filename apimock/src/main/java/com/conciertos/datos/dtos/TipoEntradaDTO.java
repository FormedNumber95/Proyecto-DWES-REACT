package com.conciertos.datos.dtos;

public record TipoEntradaDTO(
    Long id,
    Long conciertoId,
    String nombre,
    Double precio,
    int cupoMaximo
) {}