package com.conciertos.datos.dtos;


import java.time.LocalDateTime;

public record EntradaDTO(
    Long id,
    Long tipoEntradaId,
    Long usuarioId,
    LocalDateTime fechaCompra,
    int cantidad
) {}