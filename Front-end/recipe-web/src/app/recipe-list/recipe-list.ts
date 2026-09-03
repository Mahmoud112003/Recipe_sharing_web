import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeService } from '../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm = '';
  selectedCategory = 'All';
  loading = true;
  errorMessage = '';
  favoriteOnly = false;

  readonly categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
  constructor(
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.favoriteOnly = params.get('favorite') === 'true';
      this.loadRecipes();
    });
  }

  loadRecipes(): void {
    this.loading = true;
    this.errorMessage = '';
    const searchTerm = this.searchTerm.trim().toLowerCase();

    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.recipes = response.recipes;
        this.filteredRecipes = this.recipes.filter((recipe) => {
      const matchesCategory = this.selectedCategory === 'All' || recipe.category === this.selectedCategory;
      const matchesFavorite = !this.favoriteOnly || recipe.isFavorite;
      const searchableText = [recipe.title, recipe.description, recipe.category, ...recipe.ingredients]
        .join(' ')
        .toLowerCase();
      return matchesCategory && matchesFavorite && (!searchTerm || searchableText.includes(searchTerm));
        });
        this.loading = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load recipes.';
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.loadRecipes();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.loadRecipes();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.loadRecipes();
  }

  openRecipeDetail(recipe: Recipe): void {
    const recipeId = recipe.id ?? recipe._id;
    if (recipeId) {
      void this.router.navigate(['/recipes', recipeId]);
    }
  }

  toggleFavorite(event: Event, recipe: Recipe): void {
    event.stopPropagation();
    recipe.isFavorite = this.recipeService.toggleFavorite(recipe.id);
  }

  createNewRecipe(): void {
    void this.router.navigate(['/recipe-form']);
  }

}
