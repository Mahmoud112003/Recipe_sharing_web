import { ChangeDetectorRef, Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  RecipeService } from '../services/recipe.service';
import { UserServices } from '../services/user.service';
import { Recipe } from '../models/recipe-model/recipe-model-module';
@Component({
  standalone: false,
  selector: 'app-recipe-detail',
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css'
})
export class RecipeDetail implements OnInit {
  recipe: Recipe | undefined;
  checkedIngredients: { [key: number]: boolean } = {};
  completedSteps: { [key: number]: boolean } = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private readonly userService: UserServices,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {
        this.recipeService.getRecipeById(id).subscribe({
          next: (recipe) => {
            this.recipe = recipe;
            this.changeDetector.detectChanges();
          },
          error: () => void this.router.navigate(['/recipes'])
        });
      }
    });
  }

@Input() userid!: string;

isAuthor(): boolean {
  const currentUserId = this.userid || this.userService.gettoken();
  if (!currentUserId || !this.recipe?.user_id) {
    return false;
  }

  return String(currentUserId) === String(this.recipe.user_id);
}

  toggleIngredient(index: number): void {
    this.checkedIngredients[index] = !this.checkedIngredients[index];
  }

  toggleStep(index: number): void {
    this.completedSteps[index] = !this.completedSteps[index];
  }

  editRecipe(): void {
    if (this.recipe) {
      void this.router.navigate(['/recipe-form']);
    }
  }

  deleteRecipe(): void {

    if (!this.recipe) {
      return;
    }

    if (confirm(`Are you sure you want to delete "${this.recipe.title}"?`)) {
      const recipeId = this.recipe.id ?? this.recipe._id;
      if (!recipeId) {
        return;
      }

      this.recipeService.deleteRecipe(recipeId).subscribe({
        next: () => void this.router.navigate(['/recipes']),
        error: (error) => {
          window.alert(error?.error?.msg || error?.error?.message || 'Failed to delete recipe.');
        }
      });
    }
  }

  goBack(): void {
    void this.router.navigate(['/recipes']);
  }
}
