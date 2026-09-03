import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() userName = 'User Name';
  @Input() userImageUrl = '';
}
