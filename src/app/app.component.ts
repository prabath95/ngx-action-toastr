import { Component } from '@angular/core';
import { Toast, ToastService, ToastTypes } from 'ngx-action-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'toastr';

  constructor(private toastService: ToastService) {
    this.toastService.createSimpleToast(
      'Failed to create Paris Success.',
      ToastTypes.SUCCESS
    );
    this.toastService.createSimpleToast(
      'Failed to create Paris Warning.',
      ToastTypes.WARNING
    );
    this.toastService.createSimpleToast(
      'Failed to create Paris Info.',
      ToastTypes.INFO
    );
    this.toastService.createSimpleToast(
      'Failed to create Paris error.',
      ToastTypes.ERROR
    );
    const toast = new Toast(
      'Failed to create Paris error.',
      ToastTypes.SUCCESS
    );
    toast.closeButtonActive = true;
    toast.timeToDisplay = 0;
    this.toastService.createCustomToast(toast).subscribe(data=>{
      console.log(data);
    });
  }
}
