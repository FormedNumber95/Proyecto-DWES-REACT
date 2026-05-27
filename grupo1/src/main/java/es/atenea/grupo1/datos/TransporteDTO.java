package es.atenea.grupo1.datos;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransporteDTO {
    private Long id;
    private String tipo;
    private Double precio;
    private String lugarSalida;
    private LocalTime horaSalida;
    private int plazas;
    private Long conciertoId;
}
