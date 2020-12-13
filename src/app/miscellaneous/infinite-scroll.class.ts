import { Pageable } from '../models/pageable.model';

export class InfiniteScroll {

    public static doInfinite(data, callback) {
        setTimeout(() => {

          if(InfiniteScroll.doIHaveToConcatMyPageable(data.offsetPagination, data.pagination)) {
            callback(() => {
                console.log("Complete");
                data.infiniteScroll.target.complete()
            })
          } else {
            data.infiniteScroll.target.complete();
          }
        }, 500);
    }

    public static handlePageable(offset : number, pageable : Pageable) : number {

        if(offset == pageable.totalPages) {
          return offset;
        }
    
        offset = offset + 1;
    
        return offset;
      }
    
    public static doIHaveToConcatMyPageable(offset : number, pageable : Pageable) : boolean {
        return (offset < pageable.totalPages);
    }

    public static doRefresh(event, callback) {
      callback(() => {
        event.target.complete();
      });
    }

}