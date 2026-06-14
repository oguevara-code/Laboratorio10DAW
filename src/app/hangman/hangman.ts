import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hangman',
  imports: [FormsModule],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {

  palabras: string[] = [
    'ANGULAR',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'PROGRAMACION',
    'COMPONENTE',
    'SERVICIO'
  ];

  palabraSecreta: string = '';

  letrasAdivinadas: string[] = [];

  letraIngresada: string = '';

  errores: number = 0;

  maxErrores: number = 6;

  juegoTerminado: boolean = false;

  mensaje: string = '';
  
  constructor() {
    this.seleccionarPalabra();
  }

  seleccionarPalabra() {
    const indice = Math.floor(
      Math.random() * this.palabras.length
    );

    this.palabraSecreta = this.palabras[indice];
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
      this.juegoTerminado = true;
      this.mensaje = '¡Perdiste! La palabra era: ' + this.palabraSecreta;
    }

    const gano = this.palabraSecreta
      .split('')
      .every(letra => this.letrasAdivinadas.includes(letra));

    if (gano) {
      this.juegoTerminado = true;
      this.mensaje = '¡Ganaste!';
    }

    this.letraIngresada = '';
  }

  reiniciarJuego() {
    this.letrasAdivinadas = [];
    this.letraIngresada = '';
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
    this.seleccionarPalabra();
  }
}
