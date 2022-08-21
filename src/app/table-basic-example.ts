import {
  Component,
  OnInit,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import { ELEMENT_DATA } from '../elemt';
import { LAST_PAGE_PARAM } from '../mat-paginat';

enum PaginationButtons{
  next="NEXT",
  last="LAST"
}

export const ButtonIdentifier={
  name:''
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample implements OnInit, AfterViewInit, OnChanges {
  displayedColumns = ['id', 'name', 'progress', 'color'];

  @Input() totalRecords: number = 96;
  @Output() getNewRecords = new EventEmitter<any>();
  @Output() getFirstOrLastPage = new EventEmitter<any>();
  @Output() getPrevNextAfterLastPage = new EventEmitter<any>();
  dataSource: any = [];
  @Input('data')
  set Data(res) {
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
  }

  currentButtonCalled: PaginationButtons;

  // mat-paginator-navigation-last mat-icon-button ng-star-inserted

  ngOnChanges(changes) {
    // if(changes && changes.dataSource &&  changes.dataSource){
    //   this.dataSource= new MatTableDataSource(changes.dataSource.curentValue)
    // }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    // this.dataSource=  new MatTableDataSource(this.dataSource)
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    var elements = document.querySelectorAll('.mat-paginator-navigation-last');
// console.log(elements)
    for (let i = 0; i < elements.length; ++i) { 
      elements[i].addEventListener('click', function() {
        // Do something amazing
        console.log("called last")
        this.currentButtonCalled= PaginationButtons.last;
        ButtonIdentifier.name=PaginationButtons.last;
      });
    }

    var elements = document.querySelectorAll('.mat-paginator-navigation-next');
    console.log(elements)
        for (let i = 0; i < elements.length; ++i) { 
          elements[i].addEventListener('click', function() {
            // Do something amazing
            this.currentButtonCalled= PaginationButtons.next;
            console.log("called next", this.currentButtonCalled)

            ButtonIdentifier.name=PaginationButtons.next;
          });
        }
  }


  pageChange1(event: PageEvent) {
setTimeout(()=>{
this.pageChange(event)
},0)
  }
  pageChange(event: PageEvent) {
   
    const lastPageIndex = Math.trunc(event.length / event.pageSize);
    console.log(event,lastPageIndex)
    if(event.length ===this.totalRecords)
    return
    // return
    if (
      event.length === 11 &&
      (event.pageIndex == 1 || event.pageIndex === 0)
    ) {
      this.getNewRecords.emit(true);
      console.log("emitting next with true")
      return
    }
    if (
      event.length > 11  &&
      (event.pageIndex == 0 && event.previousPageIndex === 1) &&  LAST_PAGE_PARAM.page >1
    ) {
      console.log("emitting prev")
      this.getPrevNextAfterLastPage.emit({ page: 'prev' });
      setTimeout(() => {
        console.log("in emit prev",  this.paginator.length, this.paginator.pageSize)
        // if(this.paginator.pageSize==10){
        //   this.paginator.pageIndex= 10
        // }
        // if(this.paginator.pageSize==50){
          this.paginator.pageIndex= Math.trunc(100/ this.paginator.pageSize);
        // }
        
        // Math.trunc(this.paginator.length/ (2 * this.paginator.pageSize))
        // this.paginator.pageIndex= 2 in emit prev 208 50
        const event: PageEvent = {
          length: this.paginator.length,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
        };
        this.paginator.page.next(event);
      }, 0);
      return;
    } 
    if (event.length > 11 && event.pageIndex === 0 
      && event.previousPageIndex >=0
      // && LAST_PAGE_PARAM.page ==1
      ) {
        event.pageSize>=25?
        this.getFirstOrLastPage.emit({ page: 'firstWithPage50' })
        :
      this.getFirstOrLastPage.emit({ page: 'first' });
      console.log("emitting first")
    }

    if (
      event.pageSize% 15 ==0?
         lastPageIndex  === event.pageIndex
         :
         lastPageIndex - 1 === event.pageIndex &&
      this.totalRecords > event.length
    ) {
      console.log("inside emit",  ButtonIdentifier.name)
      if (
        // event.previousPageIndex !== event.pageIndex - 1 &&
        event.pageIndex !== 0 && event.pageIndex >  event.previousPageIndex
        &&    ButtonIdentifier.name== PaginationButtons.last 
        // && event.pageSize <50
      ) {

        console.log("emitting last",LAST_PAGE_PARAM)
        this.getFirstOrLastPage.emit({ page: 'last' });
        // 
        setTimeout(() => {
        //  this.paginator.pageIndex= 10
        const event: PageEvent = {
          length: this.paginator.length,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
        };
        
   
        if(event.length <= event.pageSize){
          // this.paginator.pageIndex= 4 //{length: 13, pageIndex: 0, pageSize: 25}
        const lastPage= Math.trunc((this.paginator.length+100)/event.pageSize)
         
          this.paginator.pageIndex= lastPage
          this.getPrevNextAfterLastPage.emit({ page: 'prev' });
        
          console.log("emitting prev inside last",lastPage)
        }
          if(( event.pageSize >event.length )){
            this.paginator.page.next(event);
          }
        }, 0);
        return;
      } else {
        // console.log("inside emit",  ButtonIdentifier.name)
        if (
          // LAST_PAGE_PARAM.page * LAST_PAGE_PARAM.limit >
          // this.totalRecords 
          // &&
          // {previousPageIndex: 3, pageIndex: 4, pageSize: 10, length: 100…}
          Math.ceil(event.length/ event.pageSize) -1 == event.pageIndex
          && ButtonIdentifier.name== PaginationButtons.next
          // event.previousPageIndex==8 &&  event.pageIndex== 9
        ) {
          this.getNewRecords.emit();
          console.log("emitting new records")
        } 


        // else{
        //   //  
        //   console.log("emitting new records")
        // }

      }
    }
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
