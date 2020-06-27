export interface IIngredient {
  id?: number;
  description?: string;
  amount?: number;
}

export class Ingredient implements IIngredient {
  constructor(public id?: number, public description?: string, public amount?: number) {}
}
