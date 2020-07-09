import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemasService } from '../service/temas.service';
import { UsuarioService } from '../service/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FilmesService } from '../service/filmes.service';
import { Observable } from 'rxjs';
import { Tema } from '../Model/tema.model';
import { Filme } from '../Model/filme.model';


@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

    temas: Observable<Tema[]>;
    filmes: Observable<Filme[]>;

  constructor(private router: Router,
    private temasService: TemasService,
    
    private usuarioService: UsuarioService,
    private filmeService: FilmesService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.temas = this.temasService.getObservable();
    this.filmes = this.filmeService.getObservable();


  }

}
