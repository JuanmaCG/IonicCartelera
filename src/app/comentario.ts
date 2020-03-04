import { Pelicula } from './pelicula';

export class Comentario {
    id: number;
    comentario: string;
    userRating: number;
    fecha: string;
    username: string;
    pelicula: Pelicula = new Pelicula();
}
