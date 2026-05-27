package es.atenea.grupo1.datos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BilleteDTO {

    private Long id;
    private LocalDateTime fechaCompra;
    private Long usuarioId;
    private Long transporteId;
}
