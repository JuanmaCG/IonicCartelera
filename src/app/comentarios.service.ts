import { Injectable } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private comentarioUrls = "http://localhost:8080/peliculas";

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  headersObject = new HttpHeaders().append('Authorization', 'Bearer ' + this.token.getToken())

  httpOptions = {
    headers: this.headersObject
  };

  public getComentarios(titulo: string): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.comentarioUrls}/${titulo}/comentarios`, this.httpOptions);
  }

  public addComentario(comentario: Comentario, titulo: string) {
    return this.http.post(`${this.comentarioUrls}/${titulo}/comentarios`, comentario, this.httpOptions)
  }
}
