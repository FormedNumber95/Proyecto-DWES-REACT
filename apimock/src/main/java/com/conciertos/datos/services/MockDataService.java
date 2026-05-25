package com.conciertos.datos.services;


import org.springframework.stereotype.Service;

import com.conciertos.datos.dtos.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MockDataService {

    /* =====================================================
       GRUPO 0 – DATOS BASE
       ===================================================== */

    private final List<ArtistaDTO> artistas = List.of(
        new ArtistaDTO(1L, "Artista A", "Rock", "España"),
        new ArtistaDTO(2L, "Artista B", "Pop", "USA"),
        new ArtistaDTO(3L, "Artista C", "Jazz", "Francia"),
        new ArtistaDTO(4L, "Artista D", "Electrónica", "Alemania"),
        new ArtistaDTO(5L, "Artista E", "Flamenco", "España")
    );

    private final List<CiudadDTO> ciudades = List.of(
        new CiudadDTO(1L, "Madrid", "España"),
        new CiudadDTO(2L, "Barcelona", "España"),
        new CiudadDTO(3L, "Valencia", "España"),
        new CiudadDTO(4L, "Sevilla", "España")
    );

    private final List<RecintoDTO> recintos = List.of(
        new RecintoDTO(1L, "Palacio de Deportes", 3000, 1L),
        new RecintoDTO(2L, "Sant Jordi Club", 4500, 2L),
        new RecintoDTO(3L, "Ciudad de las Artes", 5000, 3L),
        new RecintoDTO(4L, "FIB Arena", 6000, 4L)
    );

    private static String hash(String input) {
        // Mock hash: simple conversión a hexadecimal del hashCode
        return Integer.toHexString(input.hashCode());
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static class UsuarioInterno {
        Long id;
        String nombre;
        String email;
        String rol;
        String passwordHash;

        UsuarioInterno(Long id, String nombre, String email, String rol, String passwordHash) {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.rol = rol;
            this.passwordHash = passwordHash;
        }
    }

    private final List<UsuarioInterno> usuarios = new ArrayList<>(List.of(
        new UsuarioInterno(1L, "Admin", "admin@demo.com", "ADMIN", hash("admin@demo.com")),
        new UsuarioInterno(2L, "Promotor", "promotor@demo.com", "PROMOTOR", hash("promotor@demo.com")),
        new UsuarioInterno(3L, "Cliente", "cliente@demo.com", "CLIENTE", hash("cliente@demo.com")),
        new UsuarioInterno(4L, "Analista", "analista@demo.com", "ANALISTA", hash("analista@demo.com")),
        new UsuarioInterno(5L, "Cliente2", "cliente2@demo.com", "CLIENTE", hash("cliente2@demo.com")),
        new UsuarioInterno(6L, "Cliente3", "cliente3@demo.com", "CLIENTE", hash("cliente3@demo.com"))
    ));

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public List<UsuarioDTO> getUsuarios() {
        List<UsuarioDTO> lista = new ArrayList<>();
        for (UsuarioInterno u : usuarios) {
            lista.add(new UsuarioDTO(u.id, u.nombre, u.email, u.rol));
        }
        return lista;
    }

    public UsuarioDTO getUsuarioById(Long id) {
        for (UsuarioInterno u : usuarios) {
            if (u.id.equals(id)) {
                return new UsuarioDTO(u.id, u.nombre, u.email, u.rol);
            }
        }
        return null;
    }

    /* =====================================================
       GRUPO 1 – CONCIERTOS
       ===================================================== */


    private final List<ConciertoDTO> conciertos = List.of(
        new ConciertoDTO(1L, "Rock Festival Madrid", LocalDateTime.of(2026, 5, 10, 20, 0), 1L, 30.0, "FINALIZADO"),
        new ConciertoDTO(2L, "Jazz Night Barcelona", LocalDateTime.of(2026, 6, 20, 21, 30), 2L, 25.0, "PROGRAMADO"),
        new ConciertoDTO(3L, "Electronic Beats Madrid", LocalDateTime.of(2026, 4, 5, 19, 0), 1L, 40.0, "CANCELADO"),
        new ConciertoDTO(4L, "Flamenco en Valencia", LocalDateTime.of(2026, 7, 15, 22, 0), 3L, 35.0, "PROGRAMADO"),
        new ConciertoDTO(5L, "Pop Summer Sevilla", LocalDateTime.of(2026, 8, 10, 20, 30), 4L, 50.0, "PROGRAMADO")
    );
    
    private final List<ActuacionDTO> actuaciones = List.of(
        new ActuacionDTO(1L, 1L, 1L),
        new ActuacionDTO(2L, 1L, 2L),
        new ActuacionDTO(3L, 2L, 3L),
        new ActuacionDTO(4L, 3L, 4L),
        new ActuacionDTO(5L, 4L, 5L)
    );

    private final List<TipoEntradaDTO> tiposEntrada = List.of(
        new TipoEntradaDTO(1L, 1L, "General", 30.0, 2000),
        new TipoEntradaDTO(2L, 1L, "VIP", 60.0, 500),
        new TipoEntradaDTO(3L, 2L, "General", 25.0, 3000),
        new TipoEntradaDTO(4L, 2L, "VIP", 50.0, 1000),
        new TipoEntradaDTO(5L, 3L, "General", 40.0, 2500),
        new TipoEntradaDTO(6L, 4L, "General", 35.0, 4000),
        new TipoEntradaDTO(7L, 5L, "VIP", 70.0, 600)
    );

    /* =====================================================
       GRUPO 2 – ENTRADAS
       ===================================================== */
    private final List<EntradaDTO> entradas = List.of(
        // Entradas para Concierto 1 (2026-05-10, FINALIZADO)
        new EntradaDTO(1L, 1L, 3L, LocalDateTime.of(2026, 3, 15, 10, 30), 2),  // Comprada 2 meses antes
        new EntradaDTO(2L, 2L, 3L, LocalDateTime.of(2026, 4, 5, 14, 0), 1),     // Comprada 1 mes antes
        new EntradaDTO(10L, 7L, 1L, LocalDateTime.of(2026, 4, 20, 16, 45), 2), // Comprada 3 semanas antes
        new EntradaDTO(11L, 1L, 2L, LocalDateTime.of(2026, 5, 1, 11, 0), 3),   // Comprada 1 semana antes
        
        // Entradas para Concierto 2 (2026-06-20, PROGRAMADO)
        new EntradaDTO(3L, 3L, 3L, LocalDateTime.of(2026, 4, 10, 9, 0), 4),    // Comprada 2.5 meses antes
        new EntradaDTO(6L, 2L, 3L, LocalDateTime.of(2026, 5, 15, 15, 30), 1), // Comprada 1 mes antes
        new EntradaDTO(9L, 6L, 2L, LocalDateTime.of(2026, 6, 1, 12, 0), 4),   // Comprada 3 semanas antes
        new EntradaDTO(12L, 2L, 4L, LocalDateTime.of(2026, 6, 10, 18, 15), 1), // Comprada 10 días antes
        new EntradaDTO(20L, 3L, 2L, LocalDateTime.of(2026, 6, 15, 19, 30), 2), // Comprada 5 días antes
        
        // Entradas para Concierto 3 (2026-04-05, CANCELADO) - compras antes de cancelación
        new EntradaDTO(7L, 3L, 4L, LocalDateTime.of(2026, 2, 10, 10, 0), 6),    // Comprada 2 meses antes
        new EntradaDTO(21L, 4L, 3L, LocalDateTime.of(2026, 2, 25, 14, 20), 1), // Comprada 1.5 meses antes
        
        // Entradas para Concierto 4 (2026-07-15, PROGRAMADO)
        new EntradaDTO(4L, 4L, 5L, LocalDateTime.of(2026, 5, 20, 11, 15), 6),  // Comprada 2 meses antes
        new EntradaDTO(13L, 3L, 5L, LocalDateTime.of(2026, 6, 10, 15, 30), 2), // Comprada 1 mes antes
        new EntradaDTO(14L, 4L, 6L, LocalDateTime.of(2026, 6, 25, 20, 0), 1),  // Comprada 3 semanas antes
        new EntradaDTO(15L, 5L, 3L, LocalDateTime.of(2026, 7, 5, 21, 0), 2),   // Comprada 10 días antes
        new EntradaDTO(17L, 7L, 4L, LocalDateTime.of(2026, 7, 10, 19, 0), 1),  // Comprada 5 días antes
        new EntradaDTO(19L, 2L, 5L, LocalDateTime.of(2026, 7, 12, 18, 0), 1),  // Comprada 3 días antes
        
        // Entradas para Concierto 5 (2026-08-10, PROGRAMADO)
        new EntradaDTO(5L, 5L, 6L, LocalDateTime.of(2026, 6, 1, 12, 0), 5),    // Comprada 2.5 meses antes
        new EntradaDTO(8L, 1L, 5L, LocalDateTime.of(2026, 6, 20, 13, 0), 7),   // Comprada 1.5 meses antes
        new EntradaDTO(16L, 6L, 1L, LocalDateTime.of(2026, 7, 15, 18, 30), 3), // Comprada 3.5 semanas antes
        new EntradaDTO(18L, 1L, 6L, LocalDateTime.of(2026, 7, 25, 20, 0), 2),  // Comprada 2.5 semanas antes
        new EntradaDTO(22L, 5L, 1L, LocalDateTime.of(2026, 8, 1, 18, 0), 3),   // Comprada 1 semana antes
        new EntradaDTO(23L, 6L, 4L, LocalDateTime.of(2026, 8, 5, 19, 0), 2),   // Comprada 5 días antes
        new EntradaDTO(24L, 7L, 6L, LocalDateTime.of(2026, 8, 8, 20, 0), 1)    // Comprada 2 días antes
    );


    /* =====================================================
       MÉTODOS GRUPO 0
       ===================================================== */

    public List<ArtistaDTO> getArtistas() {
        return artistas;
    }

    public ArtistaDTO getArtistaById(Long id) {
        for (ArtistaDTO artista : artistas) {
            if (artista.id().equals(id)) {
                return artista;
            }
        }
        return null;
    }

    public List<CiudadDTO> getCiudades() {
        return ciudades;
    }

    public CiudadDTO getCiudadById(Long id) {
        for (CiudadDTO ciudad : ciudades) {
            if (ciudad.id().equals(id)) {
                return ciudad;
            }
        }
        return null;
    }

    public List<RecintoDTO> getRecintos() {
        return recintos;
    }

    public RecintoDTO getRecintoById(Long id) {
        for (RecintoDTO recinto : recintos) {
            if (recinto.id().equals(id)) {
                return recinto;
            }
        }
        return null;
    }

   
    /* =====================================================
       MÉTODOS GRUPO 1
       ===================================================== */

    public List<ConciertoDTO> getConciertos() {
        return conciertos;
    }

    public ConciertoDTO getConciertoById(Long id) {
        for (ConciertoDTO concierto : conciertos) {
            if (concierto.id().equals(id)) {
                return concierto;
            }
        }
        return null;
    }

    public List<ActuacionDTO> getActuacionesByConcierto(Long conciertoId) {
        List<ActuacionDTO> resultado = new ArrayList<>();
        for (ActuacionDTO actuacion : actuaciones) {
            if (actuacion.conciertoId().equals(conciertoId)) {
                resultado.add(actuacion);
            }
        }
        return resultado;
    }

    public List<ActuacionDTO> getActuacionesByArtista(Long artistaId) {
        List<ActuacionDTO> resultado = new ArrayList<>();
        for (ActuacionDTO actuacion : actuaciones) {
            if (actuacion.artistaId().equals(artistaId)) {
                resultado.add(actuacion);
            }
        }
        return resultado;
    }

    public List<TipoEntradaDTO> getTiposEntradaByConcierto(Long conciertoId) {
        List<TipoEntradaDTO> resultado = new ArrayList<>();
        for (TipoEntradaDTO tipo : tiposEntrada) {
            if (tipo.conciertoId().equals(conciertoId)) {
                resultado.add(tipo);
            }
        }
        return resultado;
    }

    /* =====================================================
       MÉTODOS GRUPO 2
       ===================================================== */

    public List<EntradaDTO> getEntradas() {
        return entradas;
    }

    public EntradaDTO getEntradaById(Long id) {
        for (EntradaDTO entrada : entradas) {
            if (entrada.id().equals(id)) {
                return entrada;
            }
        }
        return null;
    }

    public List<EntradaDTO> getEntradasByUsuario(Long usuarioId) {
        List<EntradaDTO> resultado = new ArrayList<>();
        for (EntradaDTO entrada : entradas) {
            if (entrada.usuarioId().equals(usuarioId)) {
                resultado.add(entrada);
            }
        }
        return resultado;
    }

    public List<EntradaDTO> getEntradasByConcierto(Long conciertoId) {
        List<EntradaDTO> resultado = new ArrayList<>();

        for (EntradaDTO entrada : entradas) {
            Long tipoEntradaId = entrada.tipoEntradaId();

            for (TipoEntradaDTO tipo : tiposEntrada) {
                if (tipo.id().equals(tipoEntradaId)
                        && tipo.conciertoId().equals(conciertoId)) {
                    resultado.add(entrada);
                    break;
                }
            }
        }

        return resultado;
    }

    public List<EntradaDTO> getEntradasByUsuarioAndConcierto(Long usuarioId, Long conciertoId) {
        List<EntradaDTO> resultado = new ArrayList<>();

        for (EntradaDTO entrada : entradas) {
            if (!entrada.usuarioId().equals(usuarioId)) {
                continue;
            }

            Long tipoEntradaId = entrada.tipoEntradaId();
            for (TipoEntradaDTO tipo : tiposEntrada) {
                if (tipo.id().equals(tipoEntradaId)
                        && tipo.conciertoId().equals(conciertoId)) {
                    resultado.add(entrada);
                    break;
                }
            }
        }

        return resultado;
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public UsuarioDTO login(LoginRequestDTO request) {
        // Generamos hash del password que envía el usuario
        String passwordHash = hash(request.password());

        // Buscamos el usuario por email y password
        for (UsuarioInterno u : usuarios) {
            if (u.email.equals(request.email()) && u.passwordHash.equals(passwordHash)) {
                // Devolvemos la versión pública sin password
                return new UsuarioDTO(u.id, u.nombre, u.email, u.rol);
            }
        }

        // Si no hay coincidencia, devolvemos null
        return null;
    }

    public UsuarioDTO register(String nombre, String email, String rol, String password) {
        // Generar hash de la contraseña
        String passwordHash = hash(password);

        // Generar un id simple (máximo actual + 1)
        Long nuevoId = usuarios.stream()
                .map(u -> u.id)
                .max(Long::compareTo)
                .orElse(0L) + 1;

        // Crear usuario interno
        UsuarioInterno nuevoUsuario = new UsuarioInterno(nuevoId, nombre, email, rol, passwordHash);

        // Añadir a la lista de usuarios
        usuarios.add(nuevoUsuario);

        // Devolver un DTO público sin password
        return new UsuarioDTO(nuevoUsuario.id, nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.rol);
    }
}

    
