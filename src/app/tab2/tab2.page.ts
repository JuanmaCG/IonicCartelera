import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Usuario } from "../auth/usuario";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  formLogin: FormGroup;
  form: any = {};
  signupInfo: Usuario;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(
    private route: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });
  }

  onSubmit() {
    this.signupInfo = new Usuario(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.route.navigate(["/tabs/login"]);
        this.toastController.create({
          animated: true,
          duration: 4000,
          position: 'bottom',
          message: 'Cuenta creada con exito'
        }).then(toastEl => {
          toastEl.present();
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.toastController.create({
          animated: true,
          duration: 4000,
          position: 'bottom',
          message: this.errorMessage
        }).then(toastEl => {
          toastEl.present();
        });
      }
    );

    
  }

  reloadPage() {
    window.location.reload();
  }
}
