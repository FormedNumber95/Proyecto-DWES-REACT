package es.atenea.grupo1.datos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LineapedidoDTO {
    private Long id;
    private Long pedidoId;
    private Long productoId;
    private Long cantidad;
}
