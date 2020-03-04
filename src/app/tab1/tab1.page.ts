import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Login } from "../auth/login";
import { TokenStorageService } from "../auth/token-storage.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  formLogin: FormGroup;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  private loginInfo: Login;

  constructor(
    private route: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.formLogin = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.loginInfo = new Login(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.route.navigate(["/tabs/cartelera"]).then(() => this.reloadPage());
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.toastController
          .create({
            animated: true,
            duration: 4000,
            position: "bottom",
            message: "Usuario y/o contraseña incorrecta o no existe"
          })
          .then(toastEl => {
            toastEl.present();
          });
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
