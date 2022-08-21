import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ELEMENT_DATA } from '../elemt';

@Injectable()
export class DataService {

  constructor() { }

  getTableData(startIndex:number =0,endIndex: number= 100) {

   
    if(startIndex >=0){
       console.log("getting data from"+startIndex+" to "+endIndex)
    return of(ELEMENT_DATA).pipe(map(res=> res.slice(startIndex,endIndex)))
    }
  }

}