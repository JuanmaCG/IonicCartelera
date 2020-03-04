import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { PeliculasService } from '../peliculas.service';
import { Pelicula } from '../pelicula';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  info: any;

  peliculas: Pelicula[] = [];
  constructor(private token: TokenStorageService, private route: Router, private peliculaService: PeliculasService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.peliculaService.cargaPeliculas().subscribe((data) => {
      this.peliculas = data
    })

  }

  logout() {
    this.token.signOut();
    this.route.navigate(['/tabs/login']).then( () => window.location.reload());
  }
}
