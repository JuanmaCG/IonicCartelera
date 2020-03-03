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
}
