import { Injectable } from '@angular/core';
/* Services. */
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {

 constructor(private translate: TranslateService) {
 }

 showToast(key: string) {
  this.translate.get(key).subscribe((response: string) => {

  });
 }

 showDangerToast(key: string) {
  this.translate.get(key).subscribe((response: string) => {

  });
 }


}
