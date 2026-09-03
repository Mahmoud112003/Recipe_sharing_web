import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;
  alertMessage = '';
  showAlert = false;

  constructor(
    private userservice: UserServices,
    private fb: FormBuilder,
    private readonly router: Router
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

  }

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.userservice.register(this.registerForm.value)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.userservice.settoken(res.token);
          void this.router.navigate(['/recipes']);

        },

        error: (err) => {

          console.log(err);
          this.alertMessage =
            err?.error?.message ||
            err?.error?.msg ||
            'Registration failed. Check your details and try again.';
          this.showAlert = true;

        }

      });

  }

}
