package es.atenea.grupo1.datos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EntradaDTO {
    private Long id;
    private Long tipo_entradaId;
    private Long usuarioId;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") 
    private LocalDateTime fecha_compra;
    private Long cantidad;
}
