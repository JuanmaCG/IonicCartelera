import { Component, OnInit } from "@angular/core";
import { PeliculasService } from "../peliculas.service";
import { Pelicula } from "../pelicula";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-create-movie",
  templateUrl: "./create-movie.component.html",
  styleUrls: ["./create-movie.component.scss"]
})
export class CreateMovieComponent implements OnInit {
  form: FormGroup;
  pelicula: Pelicula = new Pelicula();

  constructor(
    private peliculaService: PeliculasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
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

  addPelicula() {
    this.peliculaService
      .createMovie(this.pelicula)
      .subscribe(() => this.router.navigate(["/tabs/cartelera"]));
    this.toastController
      .create({
        animated: true,
        duration: 2000,
        position: "bottom",
        message: "Pelicula creada con exito"
      })
      .then(toastEl => {
        toastEl.present();
      });
  }
}
