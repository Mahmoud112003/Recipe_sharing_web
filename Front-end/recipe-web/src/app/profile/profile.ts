import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserServices } from '../services/user.service';
import { UserModel } from '../models/user-model/user-model-module';

@Component({
  selector: 'app-user-data',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class UserData implements OnInit {

  user: UserModel | null = null;

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userservice: UserServices,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userId = this.userservice.gettoken();

    console.log('User ID:', userId);

    if (!userId) {
      this.isLoading = false;
      this.errorMessage = 'Please login again.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.userservice.getuserbyid(userId).subscribe({
      next: (res: any) => {
        console.log('User response:', res);

        this.user =
          res?.user ||
          res?.data?.user ||
          res?.data ||
          res;

        this.isLoading = false;
        this.changeDetector.detectChanges();
      },

      error: (err: any) => {
        console.error('Get user error:', err);

        this.errorMessage =
          err?.error?.message ||
          err?.error?.msg ||
          'Failed to load user data.';

        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  logout(): void {
    this.userservice.logout();

    void this.router.navigate(['/login']);
  }
}
