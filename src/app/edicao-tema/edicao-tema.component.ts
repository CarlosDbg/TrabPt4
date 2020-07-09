import { Component, OnInit } from '@angular/core';
import { Tema } from '../Model/tema.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TemasService } from '../service/temas.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edicao-tema',
  templateUrl: './edicao-tema.component.html',
  styleUrls: ['./edicao-tema.component.scss']
})
export class EdicaoTemaComponent implements OnInit {

  idTema: string;
    tema: Tema;

    formulario = this.formBuilder.group({
        nome: ['', Validators.required]
    });

    constructor(
        private formBuilder: FormBuilder,
        private temaService: TemasService,
        private activedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location,
    ) { }

    async ngOnInit() {

        this.formulario.disable();

        this.idTema = this.activedRoute.snapshot.paramMap.get('id');
        this.tema = await this.temaService.get(this.idTema);

        this.formulario.patchValue(this.tema);

        this.formulario.enable();

    }

    async submit() {

        if (!this.formulario.valid || !this.tema) {
            return;
        }

        this.formulario.disable();

        const temaEditado = this.formulario.value as Tema;
        temaEditado.dataEdicao = new Date();

        await this.temaService.update(this.idTema, temaEditado);

        console.log('Um estilo foi editado -------------------------');
        console.log('Estilo:');
        console.log(this.tema);
        console.log('Campos atualizados:');
        console.log(temaEditado);


        Object.assign(this.tema, temaEditado);

        this.formulario.enable();

        this.snackBar.open('Estilo atualizado com sucesso!');

    }

    voltar() {
        this.location.back();
    }

}

