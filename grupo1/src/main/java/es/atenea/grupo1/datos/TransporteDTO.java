package es.atenea.grupo1.datos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime horaSalida;
    private int plazas;
    private Long conciertoId;
}
