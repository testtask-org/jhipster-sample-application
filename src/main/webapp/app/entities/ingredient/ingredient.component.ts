import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';
import { IngredientDeleteDialogComponent } from './ingredient-delete-dialog.component';

@Component({
  selector: 'jhi-ingredient',
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit, OnDestroy {
  ingredients?: IIngredient[];
  eventSubscriber?: Subscription;

  constructor(protected ingredientService: IngredientService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ingredientService.query().subscribe((res: HttpResponse<IIngredient[]>) => (this.ingredients = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInIngredients();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IIngredient): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInIngredients(): void {
    this.eventSubscriber = this.eventManager.subscribe('ingredientListModification', () => this.loadAll());
  }

  delete(ingredient: IIngredient): void {
    const modalRef = this.modalService.open(IngredientDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ingredient = ingredient;
  }
}
