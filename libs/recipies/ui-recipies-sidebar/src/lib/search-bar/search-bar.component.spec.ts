import { SearchBarComponent } from './search-bar.component';
import { SpectatorHost } from '@ngneat/spectator';
import { createHostFactory } from '@ngneat/spectator/jest';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchBarComponent', () => {
  let spectator: SpectatorHost<SearchBarComponent>;
  const createHost = createHostFactory(SearchBarComponent);
  const baseSelector = (selector: string) => `[data-cy=${selector}]`;

  it('should display input', () => {
    spectator = createHost(`
                <cook-it-search-bar
                (typedChars)="handleTypingPhrase($event)">
                </cook-it-search-bar>
                `);
    expect(spectator.query(baseSelector('searchInput'))).toBeVisible();
  });

  it('should emiit search phrase', fakeAsync(() => {
    spectator = createHost(`
                <cook-it-search-bar
                (typedChars)="handleTypingPhrase($event)">
                </cook-it-search-bar>
                `);

    const searchTerm = 'pasta';
    const input = spectator.query(
      baseSelector('search-input')
    ) as HTMLInputElement;
    const spyTypedChars = jest.spyOn(spectator.component.typedChars, 'emit');

    spectator.typeInElement(searchTerm, input);
    tick(200);

    expect(spyTypedChars).toHaveBeenCalledWith(searchTerm);
    expect(input.value).toEqual(searchTerm);
  }));
});
