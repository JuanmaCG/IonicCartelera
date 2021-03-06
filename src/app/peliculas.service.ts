import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from './auth/token-storage.service';
import { Observable } from 'rxjs';
import { Pelicula } from './pelicula';

@Injectable({
  providedIn: "root"
})
export class PeliculasService {
  private peliculasUrls = "http://localhost:8080/peliculas";

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  headersObject = new HttpHeaders().append('Authorization', 'Bearer ' + this.token.getToken())

  httpOptions = {
    headers: this.headersObject
  };


  public cargaPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.peliculasUrls, this.httpOptions);
  }

  public createMovie(pelicula: Pelicula) {
    return this.http.post(this.peliculasUrls, pelicula, this.httpOptions);
  }

  public getPeliculaByTitulo(titulo: string): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.peliculasUrls}/${titulo}`, this.httpOptions);
  }

  public deletePelicula(titulo: string){
    return this.http.delete(`${this.peliculasUrls}/${titulo}`, this.httpOptions);
  }

  updatePelicula(titulo: string, pelicula: Pelicula) {
    return this.http.put(`${this.peliculasUrls}/${titulo}`, pelicula, this.httpOptions);
  }
}
