import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2b'
})
export class Nl2bPipe implements PipeTransform {

  transform(value: string): string {
    let replaceR = value.replace(/\r/g, '').replace(/\n/g, '<br/>');
    return replaceR;
}

}
