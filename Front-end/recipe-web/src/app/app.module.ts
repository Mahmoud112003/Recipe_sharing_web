import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';
import { MyRecipes } from './my-recipes/my-recipes';
import { Navbar } from './navbar/navbar';
import { RecipeFor } from './recipe-form/recipe-for';
import { RecipeList } from './recipe-list/recipe-list';
import { Login } from './login/login';
import { Register } from './register/register';
import { UserData } from './profile/profile';
import { RecipeDetail } from './recipe-details/recipe-details';

@NgModule({
  declarations: [App, MyRecipes, Navbar, RecipeFor, RecipeList, Login, Register, UserData, RecipeDetail],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  bootstrap: [App],
})
export class AppModule {}
