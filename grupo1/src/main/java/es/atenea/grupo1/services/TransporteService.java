package es.atenea.grupo1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.atenea.grupo1.repositories.RepoBillete;
import es.atenea.grupo1.repositories.RepoTransporte;


@Service
public class TransporteService {

    @Autowired
    private RepoBillete repoBillete;
    @Autowired
    private RepoTransporte repoTransporte;
    

}
