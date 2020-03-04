import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../pelicula';
import { ComentariosService } from '../comentarios.service';
import { ModalController } from '@ionic/angular';
import { ModalComentarioComponent } from '../modal-comentario/modal-comentario.component';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  pelicula: Pelicula = new Pelicula()

  constructor(private modalController: ModalController, private peliculaService: PeliculasService, private comentarioService: ComentariosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.peliculaService.getPeliculaByTitulo(this.route.snapshot.params['titulo']).subscribe(data => this.pelicula = data)
    this.comentarioService.getComentarios(this.route.snapshot.params['titulo']).subscribe()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComentarioComponent,
      componentProps: {
        'titulo': console.log(this.pelicula.titulo)         
      }
    });
    return await modal.present();
  }


}
