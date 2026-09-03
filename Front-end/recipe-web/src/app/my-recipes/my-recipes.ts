import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe, RecipeService } from '../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-my-recipes',
  styleUrl: './my-recipes.css',
  templateUrl: './my-recipes.html',
})
export class MyRecipes {
  recipes: Recipe[] = [];

  constructor(
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.recipeService.getMyRecipes().subscribe({
      next: (response) => {
        this.recipes = response.recipes ?? [];
        this.changeDetector.detectChanges();
      },
      error: () => this.recipes = []
    });
  }

  createNewRecipe(): void {
    void this.router.navigate(['/recipe-form']);
  }

  openRecipeDetail(recipe: Recipe): void {
    const recipeId = recipe.id ?? recipe._id;
    if (recipeId) {
      void this.router.navigate(['/recipes', recipeId]);
    }
  }

  deleteRecipe(event: Event, recipe: Recipe): void {
    event.stopPropagation();

    if (!window.confirm(`Delete "${recipe.title}"?`)) {
      return;
    }

    const recipeId = recipe.id ?? recipe._id;
    if (!recipeId) {
      return;
    }

    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(
          (item) => (item.id ?? item._id) !== recipeId
        );
      },
      error: (error) => {
        window.alert(error?.error?.msg || error?.error?.message || 'Failed to delete recipe.');
      }
    });
  }
}
