import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash-es/get';

@Pipe({
    name: 'get',
})
export class GetPipe implements PipeTransform
{
    transform(object: any, path: any, defaultValue?: any): any
    {
        return get(object, path, defaultValue);
    }
}
