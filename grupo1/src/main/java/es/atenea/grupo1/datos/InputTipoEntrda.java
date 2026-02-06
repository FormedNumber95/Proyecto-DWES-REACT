package es.atenea.grupo1.datos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InputTipoEntrda {

    private String nombre;
    private Double precio;
    private Integer cupoMaximo;
}
