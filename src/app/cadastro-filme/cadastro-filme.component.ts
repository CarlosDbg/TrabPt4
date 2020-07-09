import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmesService } from '../service/filmes.service';
import { TemasService } from '../service/temas.service';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Filme } from '../Model/filme.model';
import { Tema } from '../Model/tema.model';

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.scss']
})
export class CadastroFilmeComponent implements OnInit {

    temas: Observable<Tema[]>;
    //superficies: Observable<Superficie[]>;

    formulario = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        valor: ['', [Validators.required]],
        idTema: ['', Validators.required],
        
    });

    @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

    constructor(
        private formBuilder: FormBuilder,
        private temasService: TemasService,
        private filmeService: FilmesService,
        private snackBar: MatSnackBar,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this.temas = this.temasService.getObservable();
        
    }

    async submit() {

        if (!this.formulario.valid) {
            return;
        }

        this.formulario.disable();

        const novoFilme = this.formulario.value as Filme;
        novoFilme.dataCadastro = new Date();

        const filme = await this.filmeService.add(novoFilme);

        console.log('Uma nova arte foi salva ----------------------');
        console.log(filme);

        this.formulario.enable();
        this.formGroupDirective.resetForm();

        this.snackBar.open('Nova arte cadastrada com sucesso!');

    }

    voltar() {
        this.location.back();
    }

}

