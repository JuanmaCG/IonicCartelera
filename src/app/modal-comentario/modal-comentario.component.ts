import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Pelicula } from '../pelicula';
import { TokenStorageService } from '../auth/token-storage.service';
import { ComentariosService } from '../comentarios.service';
import { Comentario } from '../comentario';
import { formatDate } from '@angular/common';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-modal-comentario',
  templateUrl: './modal-comentario.component.html',
  styleUrls: ['./modal-comentario.component.scss']
})
export class ModalComentarioComponent implements OnInit {
  titulo: string;

  constructor(
    private modalController: ModalController,
    private token: TokenStorageService,
    private comentarioService: ComentariosService,
    private navParams: NavParams,
  ) {
    this.comentario = new Comentario();
    this.comentario.fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.titulo = this.navParams.get('titulo');
    this.comentario.pelicula.titulo = this.titulo;
    this.comentario.username = this.token.getUsername();
  }

  comentario: Comentario;

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  addComentario() {
    this.comentarioService.addComentario(this.comentario, this.titulo).subscribe( () => {
      this.dismiss();
      window.location.reload();
    });
  }
}
