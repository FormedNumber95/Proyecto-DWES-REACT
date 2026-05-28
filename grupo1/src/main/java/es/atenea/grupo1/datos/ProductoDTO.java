package es.atenea.grupo1.datos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductoDTO {
    private Long id;

    private String nombre;
    private Double precio;
    private Long stock;
    private Long conciertoId;

    //campo extra para la cantidad que ha comprado el usuario
    private Long cantidad;

    public ProductoDTO(Long id, String nombre, Double precio, Long stock, Long conciertoId){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.conciertoId=conciertoId;
        this.cantidad=0L;
    }
}
