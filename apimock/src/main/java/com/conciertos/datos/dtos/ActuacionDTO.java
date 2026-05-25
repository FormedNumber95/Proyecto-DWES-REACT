package com.conciertos.datos.dtos;

public record ActuacionDTO(
    Long id,
    Long conciertoId,
    Long artistaId
) {}