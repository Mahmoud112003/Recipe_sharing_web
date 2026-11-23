import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Recipe } from '../models/recipe-model/recipe-model-module';

export type { Recipe } from '../models/recipe-model/recipe-model-module';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://recipe-sharing-api-alpha.vercel.app/recipes';

  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: { Authorization: string } } {
    return {
      headers: {
        Authorization: localStorage.getItem('token') ?? ''
      }
    };
  }

  getRecipes(): Observable<{ count: number; recipes: Recipe[] }> {
    return this.http.get<{ count: number; recipes: Recipe[] }>(this.apiUrl);
  }

  createRecipe(recipe: Recipe): Observable<{ message: string; recipe: Recipe }> {
    return this.http.post<{ message: string; recipe: Recipe }>(
      this.apiUrl,
      recipe,
      this.authHeaders()
    );
  }

  updateRecipe(
    id: string,
    recipe: Partial<Recipe>
  ): Observable<{ message: string; recipe: Recipe }> {
    return this.http.put<{ message: string; recipe: Recipe }>(
      `${this.apiUrl}/${id}`,
      recipe,
      this.authHeaders()
    );
  }

  deleteRecipe(id: string | undefined): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}`,
      this.authHeaders()
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<{ recipe: Recipe }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.recipe)
    );
  }

  getMyRecipes(): Observable<{ recipes: Recipe[] }> {
    return this.http.get<{ recipes: Recipe[] }>(
      `${this.apiUrl}/mine`,
      this.authHeaders()
    );
  }

  addRecipe(recipe: Partial<Recipe>): Observable<{ message: string; recipe: Recipe }> {
    return this.createRecipe(recipe as Recipe);
  }

  toggleFavorite(id: string | undefined): boolean {
    return Boolean(id);
  }
}
