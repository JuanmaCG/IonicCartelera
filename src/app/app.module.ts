import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ModalComentarioComponent } from './modal-comentario/modal-comentario.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPeliculaComponent } from './edit-pelicula/edit-pelicula.component';

@NgModule({
  declarations: [AppComponent, CreateMovieComponent, ComentariosComponent, ModalComentarioComponent, EditPeliculaComponent],
  entryComponents: [ModalComentarioComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
