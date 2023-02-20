import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  transform(timeInMinutes: number | undefined): string | '' {
    if (timeInMinutes == undefined) {
      return '';
    }
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}h : ${String(minutes).padStart(2, '0')}m`;
  }
}
