import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../auth/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  form: any = {};
  signupInfo: Usuario;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new Usuario(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.route.navigate(['/tabs/login']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
