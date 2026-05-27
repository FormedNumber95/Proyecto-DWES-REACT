package es.atenea.grupo1.datos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long id;

    private String nombre;
    private Double precio;
    private Long stock;
    private Long conciertoId;
}
