import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
  age?: number;
  createdAt?: string;
  updatedAt?: string;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UserModelModule {}
