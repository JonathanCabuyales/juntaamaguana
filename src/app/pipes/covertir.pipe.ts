import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'covertir'
})
export class CovertirPipe implements PipeTransform {

  transform(value: any) {
    console.log(value);
    console.log(JSON.parse(value));
    
    return JSON.parse(value);
  }

}
