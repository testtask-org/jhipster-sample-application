import { ICategory } from 'app/shared/model/category.model';

export interface INotes {
  id?: number;
  notes?: string;
  categories?: ICategory[];
}

export class Notes implements INotes {
  constructor(public id?: number, public notes?: string, public categories?: ICategory[]) {}
}
