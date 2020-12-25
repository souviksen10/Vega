import { ErrorHandler, Injector,Injectable,NgZone, isDevMode } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import * as Raven from "raven-js";

@Injectable()
export class AppErrorHandler implements ErrorHandler{
  
  constructor(private ngZone: NgZone,private injector: Injector) { }

    handleError(error: any): void {
      if(!isDevMode())
        Raven.captureException(error.originalError || error);
      else
        throw error;  

      this.ngZone.run(() => {
        let toastrService = this.injector.get(ToastrService);
        toastrService.error('Some Unexpected Error Occured','Error'
          ,{
            closeButton: true,
            timeOut: 5000
          });
      });
    }

}