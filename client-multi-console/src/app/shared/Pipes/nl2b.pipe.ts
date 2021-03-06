import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2b'
})
export class Nl2bPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\r/g, '').replace(/\n/g, '<br/>');
}

}
