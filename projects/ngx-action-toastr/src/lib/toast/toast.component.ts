import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toast } from '../models/Toast';
import { Button } from '../models/Button';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../services/toast.service';
import { ToastPosition, ToastTypes, ButtonTypes } from '../models/SimpleToast';

@Component({
  selector: 'lib-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  svgIcons = icons;
  toastPosition: ToastPosition = ToastPosition.RIGHT_TOP;
  toastPositions = ToastPosition;
  toastTypes = ToastTypes;
  buttonTypes = ButtonTypes;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}

  /**
   * create a timer to auto disappear the toast
   * @param toast toast object
   * @param index item index of the toast
   */
  setTimeOutForAutoDisappear(toast: Toast) {
    setTimeout(() => {
      const index = this.toastService.toasts.findIndex(
        (data) => data.toastId === toast.toastId
      );
      this.cancel(index);
    }, toast.timeToDisplay);
  }

  /**
   * remove the item from the toast
   * @param index item index of the toast to remove
   */
  cancel(index: number) {
    const removed = this.toastService.toasts.splice(index, 1);
    if (this.toastService.toasts.length <= 0) {
      this.close.emit(true);
    }
  }

  /**
   * remove the item from the toast
   * @param index item index of the toast to remove
   */
  closeAction(index: number) {
    const toast = this.toastService.toasts[index];
    toast.subject?.next(toast);
    this.cancel(index);
  }

  /**
   * close toast on click
   * @param toast  toast to close
   * @param index  index of the toast
   */
  tapToDismiss(toast: Toast, index: number) {
    if (toast.isTapToClose) {
      this.closeAction(index);
    }
  }

  /**
   * toast button click event
   * @param toast toast object
   * @param button button object
   */
  buttonClicked(toast: Toast, button: Button, index: number) {
    toast.clickedButton = button;
    toast.subject?.next(toast);
    this.closeAction(index);
  }
}
