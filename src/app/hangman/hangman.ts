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

    this.letraIngresada = '';
  }
}
