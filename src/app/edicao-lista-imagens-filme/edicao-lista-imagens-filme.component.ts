import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from '../service/filmes.service';
import { Filme } from '../Model/filme.model';

export class Imagem {
  url: string;
  arquivo: File;
}

@Component({
  selector: 'app-edicao-lista-imagens-filme',
  templateUrl: './edicao-lista-imagens-filme.component.html',
  styleUrls: ['./edicao-lista-imagens-filme.component.scss']
})
export class EdicaoListaImagensFilmeComponent implements OnInit {

  carregando: boolean;
    idFilme: string;
    descricaoArte: string;
    imagens: Imagem[] = [];

    constructor(
        private actvitedRoute: ActivatedRoute,
        private filmeService: FilmesService
    ) { }

    async ngOnInit() {

        this.carregando = true;

        this.idFilme = this.actvitedRoute.snapshot.paramMap.get('id');

        const arte = await this.filmeService.get(this.idFilme);

        this.descricaoArte = `${arte.nome} - ${arte.descricao}`;

        if (arte.imagens) {

            console.log(arte.imagens);

            this.imagens = arte.imagens.map<Imagem>(urlImagem => {
                return { url: urlImagem, arquivo: null };
            });

        }

        this.carregando = false;

    }

    adicionarImagens(event: any) {

        const arquivos = event.target.files as FileList;

        for (let index = 0; index < arquivos.length; index++) {

            const arquivo = arquivos[index];

            this.imagens.push({ url: null, arquivo: arquivo });

        }

    }

    imagemEnviada() {
        this.atualizarImagens();
    }

    excluirImagem(imagem: Imagem) {

        const indice = this.imagens.indexOf(imagem);
        this.imagens.splice(indice, 1);

        this.atualizarImagens();

    }

    async atualizarImagens() {

        const imagensArte = this.imagens.filter(x => x.url).map(x => x.url);

        console.log(imagensArte);

        const arte = { imagens: imagensArte } as Filme;

        await this.filmeService.update(this.idFilme, arte);

    }



}
