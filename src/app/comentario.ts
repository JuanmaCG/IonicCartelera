import { Pelicula } from './pelicula';

export class Comentario {
    comentario: string;
    userRating: number;
    fecha: string;
    username: string;
    pelicula: Pelicula = new Pelicula();
}
