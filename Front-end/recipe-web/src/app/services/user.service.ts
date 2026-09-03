import { Injectable, inject } from '@angular/core';
import { UserModel } from '../models/user-model/user-model-module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserServices {

  private readonly http = inject(HttpClient);
  private readonly apiurl = 'http://localhost:3000';

  register(user: UserModel) {
    return this.http.post<any>(`${this.apiurl}/auth/registration`, user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiurl}/auth/login`, { email, password });
  }

  settoken(token:string){
      localStorage.setItem("token",token)
    }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getuserbyid(userId: string) {
  return this.http.get<any>(
    `${this.apiurl}/auth/${userId}`
  );
}



gettoken(): string | null {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    console.log('Token payload:', payload);

    return (
      payload.id ||
      payload._id ||
      payload.userId ||
      payload.user?.id ||
      payload.user?._id ||
      null
    );
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

}
