import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';

@Component({
  selector: 'jhi-recipe',
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes?: IRecipe[];
  eventSubscriber?: Subscription;

  constructor(
    protected recipeService: RecipeService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.recipeService.query().subscribe((res: HttpResponse<IRecipe[]>) => (this.recipes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRecipes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRecipe): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInRecipes(): void {
    this.eventSubscriber = this.eventManager.subscribe('recipeListModification', () => this.loadAll());
  }

  delete(recipe: IRecipe): void {
    const modalRef = this.modalService.open(RecipeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recipe = recipe;
  }
}
