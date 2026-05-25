package com.conciertos.datos.dtos;

public record ArtistaDTO(
    Long id,
    String nombre,
    String estilo,
    String pais
) {}