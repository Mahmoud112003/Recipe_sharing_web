import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-recipe-for',
  templateUrl: './recipe-for.html',
  styleUrl: './recipe-for.css'
})
export class RecipeFor {

  categories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack'
  ];

  recipe = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
    imageUrl: ''
  };

  constructor(
    private readonly router: Router,
    private readonly recipeService: RecipeService,
  ) {}

  onSubmit(form: NgForm): void {

    if (form.valid) {

      const recipePayload = {
        title: this.recipe.title.trim(),
        description: this.recipe.description.trim(),

        ingredients: this.recipe.ingredients
          .split('\n')
          .map(ingredient => ingredient.trim())
          .filter(Boolean),

        instructions: this.recipe.instructions.trim(),
        category: this.recipe.category.trim(),
        imageUrl: this.recipe.imageUrl.trim()
      };

      this.recipeService.addRecipe(recipePayload).subscribe({
        next: () => {
          alert('Recipe saved successfully');
          form.resetForm();
          void this.router.navigate(['/my-recipes']);
        },
        error: (error) => {
          alert(error?.error?.msg || error?.error?.message || 'Failed to save recipe.');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/my-recipes']);
  }
}