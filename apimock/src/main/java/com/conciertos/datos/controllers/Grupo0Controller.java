package com.conciertos.datos.controllers;



import com.conciertos.datos.dtos.*;
import com.conciertos.datos.services.MockDataService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api")
public class Grupo0Controller {
 private final MockDataService service;

    public Grupo0Controller(MockDataService service) {
        this.service = service;
    }

    /* ================= ARTISTAS ================= */

    @GetMapping("/artistas")
    public ResponseEntity<List<ArtistaDTO>> getArtistas() {
        return ResponseEntity.ok(service.getArtistas());
    }

    @GetMapping("/artistas/{id}")
    public ResponseEntity<ArtistaDTO> getArtista(@PathVariable Long id) {
        ArtistaDTO artista = service.getArtistaById(id);
        return artista != null
                ? ResponseEntity.ok(artista)
                : ResponseEntity.notFound().build();
    }

    /* ================= CIUDADES ================= */

    @GetMapping("/ciudades")
    public ResponseEntity<List<CiudadDTO>> getCiudades() {
        return ResponseEntity.ok(service.getCiudades());
    }

    @GetMapping("/ciudades/{id}")
    public ResponseEntity<CiudadDTO> getCiudad(@PathVariable Long id) {
        CiudadDTO ciudad = service.getCiudadById(id);
        return ciudad != null
                ? ResponseEntity.ok(ciudad)
                : ResponseEntity.notFound().build();
    }

    /* ================= RECINTOS ================= */

    @GetMapping("/recintos")
    public ResponseEntity<List<RecintoDTO>> getRecintos() {
        return ResponseEntity.ok(service.getRecintos());
    }

    @GetMapping("/recintos/{id}")
    public ResponseEntity<RecintoDTO> getRecinto(@PathVariable Long id) {
        RecintoDTO recinto = service.getRecintoById(id);
        return recinto != null
                ? ResponseEntity.ok(recinto)
                : ResponseEntity.notFound().build();
    }

    /* ================= USUARIOS ================= */

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDTO>> getUsuarios() {
        return ResponseEntity.ok(service.getUsuarios());
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioDTO> getUsuario(@PathVariable Long id) {
        UsuarioDTO usuario = service.getUsuarioById(id);
        return usuario != null
                ? ResponseEntity.ok(usuario)
                : ResponseEntity.notFound().build();
    }

    /* ================= LOGIN ================= */

    @PostMapping("/auth/login")
    public ResponseEntity<UsuarioDTO> login(@RequestBody LoginRequestDTO request) {
        UsuarioDTO usuario = service.login(request);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /* ================= REGISTER ================= */

    @PostMapping("/auth/register")
    public ResponseEntity<UsuarioDTO> register(@RequestBody UsuarioDTO newUser) {
        // Validar rol
        List<String> rolesValidos = List.of("ADMIN", "PROMOTOR", "CLIENTE", "ANALISTA");
        if (!rolesValidos.contains(newUser.rol())) {
            return ResponseEntity.badRequest().build();
        }

        // Validar email único
        boolean emailExiste = service.getUsuarios().stream()
            .anyMatch(u -> u.email().equalsIgnoreCase(newUser.email()));
        if (emailExiste) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409
        }

        // Registrar usando el email como contraseña
        UsuarioDTO creado = service.register(
            newUser.nombre(),
            newUser.email(),
            newUser.rol(),
            newUser.email()  // contraseña = email
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
    

}
