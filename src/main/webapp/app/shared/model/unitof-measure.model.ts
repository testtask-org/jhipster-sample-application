export interface IUnitofMeasure {
  id?: number;
  uom?: string;
}

export class UnitofMeasure implements IUnitofMeasure {
  constructor(public id?: number, public uom?: string) {}
}
