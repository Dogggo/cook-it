import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatAutocompleteModule,
];

@Component({
  selector: 'cook-it-search-bar[filteredRecipes]',
  standalone: true,
  imports: [CommonModule, ...materialModules, ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  @Output()
  searchValue = new EventEmitter<string>();

  @Output()
  typedChars = new EventEmitter<string>();

  @Input()
  filteredRecipes?: string[];

  searchPhrase = new FormControl();

  ngOnInit(): void {
    this.searchPhrase.valueChanges
      .pipe(
        filter((phrase) => phrase.length >= 2),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((phrase) => {
        this.typedChars.emit(phrase);
      });
  }

  handleSearchClick() {
    this.searchValue.emit(this.searchPhrase.value);
  }
}
