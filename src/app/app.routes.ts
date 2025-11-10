import { Routes } from '@angular/router';
import { LibrosListaComponent } from './components/libros-lista/libros-lista.component';
import { LibrosCrearComponent } from './components/libros-crear/libros-crear.component';
import { LibrosEditarComponent } from './components/libros-editar/libros-editar.component';

export const routes: Routes = [
{
        path: '', // Ruta raíz (http://localhost:4200)
        redirectTo: 'libros', // Redirige automáticamente
        pathMatch: 'full'
    },
    {
        path: 'libros', // Ruta principal
        component: LibrosListaComponent // El componente que se muestra
    },
    { path: 'libros/nuevo', component: LibrosCrearComponent },
    { path: 'libros/editar/:id', component: LibrosEditarComponent },// GET por ID visible
    { path: '**', redirectTo: 'libros' }

];
