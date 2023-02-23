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
  crudUrl = 'https://crudcrud.com/api/eb9829aa8b3142e9b2874003a9ef6fc4';
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
