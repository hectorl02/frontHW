import { HttpErrorResponse } from "@angular/common/http";

export interface AlertServiceInterface {
  show(message: string, title: string): void;
  showError(error: HttpErrorResponse): void;
}
