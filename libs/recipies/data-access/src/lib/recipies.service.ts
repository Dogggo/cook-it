import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { RecipiesEntity } from './+state/recipies.models';

@Injectable({
  providedIn: 'root',
})
export class RecipiesService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ml-app-valueadd.herokuapp.com/recipes';

  public getRecipies(): Observable<RecipiesEntity[]> {
    return this.http.get<RecipiesEntity[]>(this.baseUrl);
  }

  public saveRecipe(recipe: RecipiesEntity): Observable<RecipiesEntity> {
    return this.http.post<RecipiesEntity>(this.baseUrl, recipe);
  }

  public editRecipe(recipe: RecipiesEntity, id: string): Observable<RecipiesEntity> {
    return this.http.put<RecipiesEntity>(`${this.baseUrl}/${id}`, recipe);
  }

  public deleteRecipe(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/${id}`).pipe(map(() => id));  }
}
