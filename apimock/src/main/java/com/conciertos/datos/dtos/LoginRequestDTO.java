package com.conciertos.datos.dtos;

public record LoginRequestDTO(
    String email,
    String password
) {}