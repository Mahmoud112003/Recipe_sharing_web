import { Routes } from '@angular/router';
import { Login } from './login/login';
import { MyRecipes } from './my-recipes/my-recipes';
import { RecipeFor } from './recipe-form/recipe-for';
import { RecipeList } from './recipe-list/recipe-list';
import { Register } from './register/register';
import { UserData } from './profile/profile';
import { RecipeDetail } from './recipe-details/recipe-details';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
	{ path: 'recipes', component: RecipeList,canActivate:[authGuard]},
	{ path: 'recipes/:id', component: RecipeDetail, canActivate:[authGuard]},
	{ path: 'my-recipes', component: MyRecipes, canActivate:[authGuard]},
	{ path: 'recipe-form', component: RecipeFor, canActivate:[authGuard]},
	{ path: 'login', component: Login },
	{ path: 'registration', component: Register },
	{ path: 'profile', component: UserData ,canActivate:[authGuard]},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
];
