import { MatPaginatorIntl } from '@angular/material';
import { ELEMENT_DATA } from './elemt';

export const LAST_PAGE_PARAM={
  page:0,
  limit:0
}

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 of ${length}`; }
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

      const additionalPage=LAST_PAGE_PARAM.page ==0 ? 
      0
      :
      (LAST_PAGE_PARAM.page -1) *LAST_PAGE_PARAM.limit

  return `${startIndex +1 + additionalPage} - ${endIndex +additionalPage} of ${ELEMENT_DATA.length}`;
}


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  // paginatorIntl.itemsPerPageLabel = 'Items per pagina:';
  // paginatorIntl.nextPageLabel = 'Volgende pagina';
  // paginatorIntl.previousPageLabel = 'Vorige pagina';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  
  return paginatorIntl;
}