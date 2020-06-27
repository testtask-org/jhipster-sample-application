import { Difficulty } from 'app/shared/model/enumerations/difficulty.model';

export interface IRecipe {
  id?: number;
  description?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  source?: string;
  url?: string;
  directions?: string;
  difficulty?: Difficulty;
  imageContentType?: string;
  image?: any;
}

export class Recipe implements IRecipe {
  constructor(
    public id?: number,
    public description?: string,
    public prepTime?: number,
    public cookTime?: number,
    public servings?: number,
    public source?: string,
    public url?: string,
    public directions?: string,
    public difficulty?: Difficulty,
    public imageContentType?: string,
    public image?: any
  ) {}
}
