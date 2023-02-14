import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipiesEntity } from './+state/recipies.models';
import { RecipiesOverview } from '@cook-it/recipies/ui-recipe-details';

@Injectable({
  providedIn: 'root',
})
export class RecipiesService {
  constructor(private http: HttpClient) {}
  crudUrl = 'https://crudcrud.com/api/f94a44f6d9554aa7bed163afa1737bda';
  baseUrl = `${this.crudUrl}/recipes`;

  public getRecipies() {
    return this.http.get<RecipiesEntity[]>(this.baseUrl);
  }

  public saveRecipe(recipe: RecipiesOverview): Observable<RecipiesEntity> {
    return this.http.post<RecipiesEntity>(this.baseUrl, recipe);
  }

  public editRecipe(
    recipe: RecipiesOverview,
    id: string
  ): Observable<RecipiesEntity> {
    return this.http.put<RecipiesEntity>(`${this.baseUrl}/${id}`, recipe).pipe(
      map(() => {
        return { ...recipe, _id: id };
      })
    );
  }

  public deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
