import { Component } from '@angular/core';
import { Hangman } from './hangman/hangman';

@Component({
  selector: 'app-root',
  imports: [Hangman],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
