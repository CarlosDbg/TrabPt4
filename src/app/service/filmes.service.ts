import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../Model/filme.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private firestore: AngularFirestore) { }

    getObservable(): Observable<Filme[]> {
        return this.firestore.collection<Filme>('filmes').valueChanges({ idField: 'id' });
    }

    private convertToArte(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Filme {

        const dados = document.data();

        const arte = {
            id: document.id,
            ...dados
        } as Filme;

        if (dados.dataEdicao) {
            arte.dataEdicao = dados.dataEdicao.toDate();
        }

        if (dados.dataCadastro) {
            arte.dataCadastro = dados.dataCadastro.toDate();
        }

        return arte;

    }

    async add(estilo: Filme): Promise<Filme> {

        const documentRef = await this.firestore.collection<Filme>('filmes').add(estilo);
        const document = await documentRef.get();

        return this.convertToArte(document);

    }

    async get(id: string): Promise<Filme> {

        const document = await this.firestore.collection<Filme>('filmes').doc(id).get().toPromise();

        return this.convertToArte(document);

    }

    async update(id: string, filme: Filme): Promise<void> {

        await this.firestore.collection<Filme>('filmes').doc(id).update(filme);

    }

}
