import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {first, map, Observable, switchMap, timer} from 'rxjs';
import {Store} from "@ngrx/store";
import {checkIfNameExists} from "@cook-it/recipies/data-access-recipes";

export class FormValidator {
  static uniqueNameRequired(store: Store, removedNames: string[]): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(500).pipe(
        switchMap(() => store.select(checkIfNameExists(control.value, removedNames))),
        map((res) => {
          return res ? { nameExists: true} : null;
        })
      ).pipe(first())
    };
  }
}
