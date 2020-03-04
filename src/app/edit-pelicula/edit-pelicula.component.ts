import { Component, OnInit } from "@angular/core";
import { PeliculasService } from "../peliculas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Pelicula } from "../pelicula";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-edit-pelicula",
  templateUrl: "./edit-pelicula.component.html",
  styleUrls: ["./edit-pelicula.component.scss"]
})
export class EditPeliculaComponent implements OnInit {
  form: FormGroup;
  pelicula: Pelicula = new Pelicula();

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.peliculaService
      .getPeliculaByTitulo(this.route.snapshot.params["titulo"])
      .subscribe(data => (this.pelicula = data));
    this.form = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      argumento: ["", [Validators.required, Validators.maxLength(200)]],
      director: ["", [Validators.required, Validators.maxLength(50)]],
      poster: [
        "",
        [Validators.required, Validators.pattern("(https?://.*.(?:png|jpg))")]
      ],
      fecha: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
          )
        ]
      ],
      rating: ["", [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  updatePelicula() {
    this.peliculaService
      .updatePelicula(this.pelicula.titulo, this.pelicula)
      .subscribe();
    this.toastController
      .create({
        animated: true,
        duration: 2000,
        position: "bottom",
        message: "Pelicula editada con exito"
      })
      .then(toastEl => {
        toastEl.present();
      });
    setTimeout(() => {
      this.router
        .navigate(["/tabs/cartelera"])
        .then(() => window.location.reload());
    }, 2000);
  }
}
