package es.atenea.grupo1.datos;

public record RecintoDTO(
    Long id,
    String nombre,
    int aforo,
    Long ciudadId
) {}