import { Component, signal } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('recipe-web');
}
