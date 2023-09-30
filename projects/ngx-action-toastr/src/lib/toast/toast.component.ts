import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toast } from '../models/Toast';
import { Button } from '../models/Button';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../services/toast.service';
import { ToastPosition, ToastTypes } from '../models/SimpleToast';

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

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}

  /**
   * create a timer to auto disappear the toast
   * @param toast toast object
   * @param index item index of the toast
   */
  setTimeOutForAutoDisappear(toast: Toast, index: number) {
    setTimeout(() => {
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
   * toast button click event
   * @param toast toast object
   * @param button button object
   */
  buttonClicked(toast: Toast, button: Button) {
    toast.clickedButton = button;
    toast.subject?.next(toast);
  }
}
