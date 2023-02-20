import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { first, map, Observable, switchMap, timer } from 'rxjs';

export class FormValidator {
  static uniqueNameRequired(
    fn: (currentName: string) => Observable<boolean>
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(500)
        .pipe(
          switchMap(() => fn(control.value)),
          map((res) => {
            return res ? { nameExists: true } : null;
          })
        )
        .pipe(first());
    };
  }
}
