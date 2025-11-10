import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/libros.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros-crear',
  templateUrl: './libros-crear.component.html',
  styleUrls: ['./libros-crear.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class LibrosCrearComponent {

  // Géneros disponibles
  generos = [
    'Ficción',
    'No Ficción',
    'Ciencia Ficción',
    'Fantasía',
    'Misterio',
    'Thriller',
    'Romance',
    'Histórico',
    'Biografía',
    'Autoayuda',
    'Técnico',
    'Educativo',
    'Spring Boot',
    'Java',
    'Base de Datos',
    'Angular','Calidad Software','Seguridad'
  ].sort();

  // Modelo del libro a crear
  libro: Libro = {
    titulo: '',
    autor: '',
    genero: '',
    anioPublicacion: new Date().getFullYear()
  };

  loading = false;
  errores: { [key: string]: string } = {};

  constructor(
    private librosSrv: LibrosService,
    private router: Router
  ) { }

  //===================================================================
  // Validar formulario
  // ===================================================================
  validar(): boolean {
    this.errores = {};

    if (!this.libro.titulo || this.libro.titulo.trim() === '') {
      this.errores['titulo'] = 'El título es requerido';
    }

    if (!this.libro.autor || this.libro.autor.trim() === '') {
      this.errores['autor'] = 'El autor es requerido';
    }

    if (!this.libro.genero || this.libro.genero === '') {
      this.errores['genero'] = 'Debes seleccionar un género';
    }

    if (!this.libro.anioPublicacion || this.libro.anioPublicacion < 1000 || this.libro.anioPublicacion > new Date().getFullYear()) {
      this.errores['anioPublicacion'] = `El año debe estar entre 1000 y ${new Date().getFullYear()}`;
    }

    return Object.keys(this.errores).length === 0;
  }

  //===================================================================
  // Crear el libro
  // ===================================================================
  guardar(): void {
    if (!this.validar()) {
      Swal.fire({
        title: 'Errores en el formulario',
        html: Object.values(this.errores).join('<br>'),
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    this.loading = true;

    this.librosSrv.create(this.libro).subscribe({
      next: (nuevoLibro) => {
        this.loading = false;
        Swal.fire({
          title: '¡Éxito!',
          text: `"${nuevoLibro.titulo}" ha sido creado correctamente`,
          icon: 'success',
          confirmButtonColor: '#28a745'
        }).then(() => {
          this.router.navigate(['/libros']);
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear libro:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el libro. Intenta de nuevo.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ===================================================================
  // Cancelar y volver
  // ===================================================================
  cancelar(): void {
    this.router.navigate(['/libros']);
  }

  //===================================================================
  // Resetear formulario
  // ===================================================================
  limpiar(): void {
    this.libro = {
      titulo: '',
      autor: '',
      genero: '',
      anioPublicacion: new Date().getFullYear()
    };
    this.errores = {};
  }
}