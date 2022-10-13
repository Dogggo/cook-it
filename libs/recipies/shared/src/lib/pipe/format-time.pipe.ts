import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  minutesInHour = 60;

  transform(value: number | undefined): string | null {
    if (value == undefined) return null;

    if (value > 0 && value / this.minutesInHour < 1) {
      return value < 10 ? `0h : 0${value}m` : `0h : ${value}m`;
    } else {
      const hours = value / this.minutesInHour;
      return `${Math.trunc(hours)}h : ${this.extractMinutes(hours)}`;
    }
  }

  private extractMinutes(value: number): string {
    const decimalDigit = value % 1;
    const minutes = Math.ceil(this.minutesInHour * decimalDigit);
    return minutes < 10 ? `0${minutes}m` : `${minutes}m`;
  }
}
