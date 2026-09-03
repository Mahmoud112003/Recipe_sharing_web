export interface Recipe {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  category: string;
  imageUrl?: string;
  cardBgColor?: string;
  prepTime?: string;
  cookTime?: string;
  author?: string;
  isFavorite?: boolean;
  user_id?: string;
  createdAt?: string;
  updatedAt?: string;
}
