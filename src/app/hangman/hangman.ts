import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  imports: [],
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
}
