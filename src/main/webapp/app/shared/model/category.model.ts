import { INotes } from 'app/shared/model/notes.model';

export interface ICategory {
  id?: number;
  categoryName?: string;
  notes?: INotes[];
}

export class Category implements ICategory {
  constructor(public id?: number, public categoryName?: string, public notes?: INotes[]) {}
}
