import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'date',
  standalone: true
})
export class MyDatePipe implements PipeTransform {

  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd h:mm:ss'): string {
    date = new Date(date);
    date.setDate(date.getDate()-day);
    return new DatePipe('en-US').transform(date, format) as string;
  }

}
