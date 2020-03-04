import { Component, OnInit } from "@angular/core";
import { PeliculasService } from "../peliculas.service";
import { ActivatedRoute } from "@angular/router";
import { Pelicula } from "../pelicula";
import { ComentariosService } from "../comentarios.service";
import { ModalController } from "@ionic/angular";
import { ModalComentarioComponent } from "../modal-comentario/modal-comentario.component";
import { TokenStorageService } from "../auth/token-storage.service";
import { Comentario } from '../comentario';

@Component({
  selector: "app-comentarios",
  templateUrl: "./comentarios.component.html",
  styleUrls: ["./comentarios.component.scss"]
})
export class ComentariosComponent implements OnInit {
  pelicula: Pelicula = new Pelicula();
  comentarios: Comentario[] = [];
  usuario: string;

  constructor(
    private modalController: ModalController,
    private peliculaService: PeliculasService,
    private comentarioService: ComentariosService,
    private route: ActivatedRoute,
    private token: TokenStorageService
  ) {
    this.usuario = this.token.getUsername();
  }

  public ngOnInit() {
    this.peliculaService
      .getPeliculaByTitulo(this.route.snapshot.params["titulo"])
      .subscribe(data => (this.pelicula = data));
    this.comentarioService
      .getComentarios(this.route.snapshot.params["titulo"])
      .subscribe( (data) => this.comentarios = data);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComentarioComponent,
      componentProps: {
        titulo: this.route.snapshot.params["titulo"]
      }
    });
    return await modal.present();
  }

  deleteComentario(id: number, titulo: string) {
    this.comentarioService.deleteComentario(id, titulo).subscribe(() => this.ngOnInit());
  }
}
