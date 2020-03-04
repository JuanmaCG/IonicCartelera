import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { Pelicula } from '../pelicula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {

  pelicula: Pelicula = new Pelicula();

  constructor(private peliculaService: PeliculasService, private router:Router) { }

  ngOnInit() {}

  addPelicula() {
    this.peliculaService.createMovie(this.pelicula).subscribe( () => this.router.navigate(['/tabs/cartelera']))
  }

}
