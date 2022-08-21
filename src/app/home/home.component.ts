import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from '../../elemt';
import { LAST_PAGE_PARAM } from '../../mat-paginat';
import { DataService } from '../data.service';

@Component({
  selector: 'HomeComponent',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data$ = this.api.getTableData();
  totalRecords = ELEMENT_DATA.length;
  constructor(private api: DataService) {}

  payload = { page: 1, limit: 100 };
  callCount = 1;


  ngOnInit() {
    this.setLastPageParam(0,0)
  }

  getNextPage(event: any) {
    this.callCount += 1;
  
    this.payload.page = this.callCount;

    if(event){
      this.getApiData(this.payload, true);
    }else{
      this.getApiData(this.payload, false);
    }
  }

  getFirstOrLastPage(event: any) {
    this.payload.page =
      event.page === 'last'
        ? Math.ceil(this.totalRecords / 100)
        : 0;
    console.log(event);


    this.setLastPageParam(this.payload.page, this.payload.limit);
    this.callCount = event.page === 'first' ? 1 : this.callCount + 1;
if(event.page=='firstWithPage50'){
  this.getApiData({...this.payload,limit:200});
}else{
    // this.getApiData({...this.payload,limit:200});
    this.getApiData(this.payload)

}
  }
  getPrevNextAfterLastPage(event: any) {
    // this.payload.page =
    //   event.page === 'prev'
    //     ? parseInt((this.totalRecords / 100).toFixed(0), 10) -1
    //     : parseInt((this.totalRecords / 100).toFixed(0), 10) + 1;
    const payLoadPage=this.payload.page
    this.payload.page =
      event.page === 'prev'
        ? payLoadPage -1
        : payLoadPage + 1;
    this.callCount =
      event.page === 'prev' ? this.callCount - 1 : this.callCount + 1;
      this.setLastPageParam(this.payload.page, this.payload.limit);
      this.getAPidataForPerev(( this.payload.page - 1) *  this.payload.limit,this.totalRecords);
  }

  getAPidataForPerev(start, end){
    this.data$ = this.api.getTableData(start, end);
  }

  getApiData(data, addRecords= true) {
    if(addRecords){
     
      const start = data.page == 0 ? 0 : (data.page - 1) * data.limit;
      const end =
        data.page == 0 ? (data.page + 1) * data.limit : data.page * data.limit;
  
      if (start >= 0) {
        this.data$ = this.api.getTableData(start, end);
      }
    }else{
      console.log(data);
      const start = 0;
      const end =
        data.page == 0 ? (data.page + 1) * data.limit : data.page * data.limit;
  
      if (start >= 0) {
        this.data$ = this.api.getTableData(start, end);
      }

      // limit: 100
      // page: 2


   
  }
  }

  setLastPageParam(page, limit) {
    LAST_PAGE_PARAM.page = page;
    LAST_PAGE_PARAM.limit = limit;
  }
}
