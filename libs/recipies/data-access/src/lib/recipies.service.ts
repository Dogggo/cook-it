import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipiesEntity } from './+state/recipies.models';

@Injectable({
  providedIn: 'root',
})
export class RecipiesService {
  constructor(private http: HttpClient) {}
  crudUrl = 'https://crudcrud.com/api/a0bdd927811041a3bbb7127e4d910be8';
  baseUrl = `${this.crudUrl}/recipes`;

  public getRecipies() {
    return this.http.get<RecipiesEntity[]>(this.baseUrl);
  }

  public saveRecipe(recipe: RecipiesEntity): Observable<RecipiesEntity> {
    return this.http.post<RecipiesEntity>(this.baseUrl, recipe);
  }

  public editRecipe(
    recipe: RecipiesEntity,
    id: string
  ): Observable<RecipiesEntity> {
    console.log(recipe);
    return this.http.put<RecipiesEntity>(`${this.baseUrl}/${id}`, recipe).pipe(
      map(() => {
        return { ...recipe, _id: id };
      })
    );
  }

  public deleteRecipe(id: string): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/${id}`)
      .pipe(map(() => id));
  }
}
