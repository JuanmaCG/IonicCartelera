import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { EditPeliculaComponent } from './edit-pelicula/edit-pelicula.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'creacion',
    component: CreateMovieComponent
  },
  {
    path: 'cartelera/:titulo/comentarios',
    component: ComentariosComponent
  },
  {
    path: 'cartelera/:titulo/edit',
    component: EditPeliculaComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
