import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: token => {
          console.log('Este es',token)
          localStorage.setItem('token', token);
          console.log('token', localStorage.getItem('token'));
          this.router.navigate(['/tabs']); 
        },
        error: err => {
          this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
          console.error(err);
        }
      });
  }
}
