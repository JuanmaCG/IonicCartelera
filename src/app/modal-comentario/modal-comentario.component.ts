import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../pelicula';
import { TokenStorageService } from '../auth/token-storage.service';
import { ComentariosService } from '../comentarios.service';
import { Comentario } from '../comentario';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-modal-comentario',
  templateUrl: './modal-comentario.component.html',
  styleUrls: ['./modal-comentario.component.scss'],
})
export class ModalComentarioComponent implements OnInit {

  @Input() titulo: string;

  constructor(private modalController: ModalController, private token: TokenStorageService, private comentarioService: ComentariosService) {
    this.comentario = new Comentario()
    this.comentario.fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.titulo);
    
    this.comentario.pelicula.titulo = this.titulo;
    this.comentario.username = this.token.getUsername();
  }

  comentario: Comentario

  ngOnInit() { }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addComentario() {
    console.log(this.comentario);

    // this.comentarioService.addComentario(this.comentario, this.titulo).subscribe( () => this.dismiss())
  }


}
