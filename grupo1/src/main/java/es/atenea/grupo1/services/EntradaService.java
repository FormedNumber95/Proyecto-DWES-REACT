package es.atenea.grupo1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.repositories.RepoEntrada;

@Service
public class EntradaService {

    @Autowired RepoEntrada repoEntrada;
}
