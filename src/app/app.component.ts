import { Component } from '@angular/core';
import {
  ActionToast,
  SimpleToast,
  ToastPosition,
  ToastService,
  ToastTypes,
} from 'ngx-action-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toastr';

  constructor(private toastService: ToastService) {
    const toast = new SimpleToast(
      ToastPosition.RIGHT_TOP,
      'Failed to create Paris error.',
      ToastTypes.SUCCESS
    );
    toast.closeButtonActive = true;
    toast.timeToDisplay = 0;
    this.toastService.createSimpleToast(toast);
    const toast2 = new ActionToast(
      ToastPosition.RIGHT_TOP,
      'Failed to create Paris error.',
      ToastTypes.SUCCESS
    );
    toast2.closeButtonActive = true;
    toast2.timeToDisplay = 0;
    this.toastService.createCustomToast(toast2).subscribe((data) => {
      console.log(data);
    });
  }
}
