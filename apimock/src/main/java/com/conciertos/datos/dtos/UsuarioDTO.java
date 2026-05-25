package com.conciertos.datos.dtos;

public record UsuarioDTO(
    Long id,
    String nombre,
    String email,
    String rol
) {}