import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/libros.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libros-editar',
  templateUrl: './libros-editar.component.html',
  styleUrls: ['./libros-editar.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LibrosEditarComponent implements OnInit {

  // Géneros disponibles, eventualmente obtener de la tabla libros

  generos = [
    'Autoayuda',
    'Biografía',
    'Ciencia Ficción',
    'Educativo',
    'Fantasía',
    'Ficción',
    'Histórico',
    'Misterio',
    'No Ficción',
    'Romance',
    'Técnico',
    'Thriller',
    'Spring Boot',
    'Java',
    'Base de Datos',
    'Angular','Calidad Software','Seguridad'
  ].sort();

  // Modelo del libro a editar
  libro: Libro = {
    titulo: '',
    autor: '',
    genero: '',
    anioPublicacion: new Date().getFullYear()
  };

  loading = false;
  cargando = true;
  errores: { [key: string]: string } = {};
  libroId?: number;

  constructor(
    private librosSrv: LibrosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // ===================================================================
  // Cargar el libro al inicializar el componente
  // ===================================================================
  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.libroId) {
      Swal.fire('Error', 'No se especificó un libro para editar', 'error')
        .then(() => this.router.navigate(['/libros']));
      return;
    }

    this.cargarLibro();
  }

  // ===================================================================
  // Obtener los datos del libro por ID
  // ===================================================================
  cargarLibro(): void {
    this.librosSrv.getById(this.libroId!).subscribe({
      next: (libro) => {
        this.libro = libro;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar libro:', err);
        this.cargando = false;
        Swal.fire('Error', 'No se pudo cargar el libro', 'error')
          .then(() => this.router.navigate(['/libros']));
      }
    });
  }

  // ===================================================================
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

  // ===================================================================
  // Guardar cambios
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

    this.librosSrv.update(this.libroId!, this.libro).subscribe({
     
      next: (libroActualizado) => {
        this.loading = false;
        Swal.fire({
          title: '¡Actualizado!',
          text: `"${libroActualizado.titulo}" ha sido actualizado correctamente`,
          icon: 'success',
          confirmButtonColor: '#28a745'
        }).then(() => {
          this.router.navigate(['/libros']);
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al actualizar libro:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el libro. Intenta de nuevo.',
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

  // ===================================================================
  // Resetear formulario a los valores originales
  // ===================================================================
  resetear(): void {
    this.cargarLibro();
    this.errores = {};
  }
}