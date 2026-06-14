import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hangman',
  imports: [FormsModule],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {

  palabras = [
    
    { categoria: 'Programacion', palabra: 'ANGULAR' },
    { categoria: 'Programacion', palabra: 'JAVASCRIPT' },
    { categoria: 'Programacion', palabra: 'TYPESCRIPT' },
    { categoria: 'Programacion', palabra: 'VARIABLE' },
    { categoria: 'Programacion', palabra: 'ALGORITMO' },

    { categoria: 'Web', palabra: 'HTML' },
    { categoria: 'Web', palabra: 'CSS' },
    { categoria: 'Web', palabra: 'SERVIDOR' },
    { categoria: 'Web', palabra: 'NAVEGADOR' },
    { categoria: 'Web', palabra: 'INTERNET' },

    { categoria: 'BaseDatos', palabra: 'MYSQL' },
    { categoria: 'BaseDatos', palabra: 'POSTGRESQL' },
    { categoria: 'BaseDatos', palabra: 'TABLA' },
    { categoria: 'BaseDatos', palabra: 'CONSULTA' },
    { categoria: 'BaseDatos', palabra: 'REGISTRO' },
  ];

  palabraSecreta: string = '';

  letrasAdivinadas: string[] = [];

  letraIngresada: string = '';

  errores: number = 0;

  maxErrores: number = 6;

  juegoTerminado: boolean = false;

  mensaje: string = '';

  categoriaActual: string = '';

  puntaje: number = 0;

  tiempo: number = 60;

  intervalo: any;
  
  constructor() {
    this.seleccionarPalabra();
    this.iniciarTemporizador();
  }

  seleccionarPalabra() {
    const aleatorio =
      this.palabras[Math.floor(Math.random() * this.palabras.length)];

    this.palabraSecreta = aleatorio.palabra;
    this.categoriaActual = aleatorio.categoria;
  }

  iniciarTemporizador() {

    this.intervalo = setInterval(() => {

      this.tiempo--;

      if (this.tiempo <= 0) {

        clearInterval(this.intervalo);

        this.juegoTerminado = true;

        this.mensaje = '¡Tiempo agotado!';

      }

    }, 1000);

  }

  obtenerPalabraOculta(): string {
    let resultado = '';

    for (let letra of this.palabraSecreta) {

      if (this.letrasAdivinadas.includes(letra)) {
        resultado += letra + '';
      } else {
        resultado += '_ ';
      }

    }

    return resultado;
  }

  intentarLetra() {

    if (this.juegoTerminado) {
      return;
    }

    const letra = this.letraIngresada.toUpperCase();

    if (letra == '') {
      return;
    }

    if (this.letrasAdivinadas.includes(letra)) {
      this.letraIngresada = '';
      return;
    }

    this.letrasAdivinadas.push(letra);

    if (!this.palabraSecreta.includes(letra)) {
      this.errores++;
    }

    if (this.errores >= this.maxErrores) {
      clearInterval(this.intervalo);
      this.juegoTerminado = true;
      this.puntaje -= 5;
      this.mensaje = '¡Perdiste! La palabra era: ' + this.palabraSecreta;
    }

    const gano = this.palabraSecreta
      .split('')
      .every(letra => this.letrasAdivinadas.includes(letra));

    if (gano) {
      clearInterval(this.intervalo);
      this.juegoTerminado = true;
      this.puntaje += 10;
      this.mensaje = '¡Ganaste!';
    }

    this.letraIngresada = '';
  }

  reiniciarJuego() {
    clearInterval(this.intervalo);
    this.tiempo = 60;
    this.letrasAdivinadas = [];
    this.letraIngresada = '';
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
    this.seleccionarPalabra();
    this.iniciarTemporizador();
  }
}
