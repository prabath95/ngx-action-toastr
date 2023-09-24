import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../models/Toast';
import { Button } from '../models/Button';
import * as icons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input()
  toast!: Toast;

  @Output()
  close: EventEmitter<Toast> = new EventEmitter<Toast>();

  @Output()
  timeOut: EventEmitter<Toast> = new EventEmitter<Toast>();

  @Output()
  buttonClick: EventEmitter<Toast> = new EventEmitter<Toast>();

  svgIcons = icons;

  constructor() {}

  ngOnInit(): void {
    if(this.toast?.timeToDisplay){
    this.setTimeOutForAutoDisappear();
    }
  }

  /**
   * create a timer to auto disappear the toast
   */
  setTimeOutForAutoDisappear() {
    setTimeout(() => {
      this.cancel();
    }, this.toast.timeToDisplay);
  }

  /**
   * remove the item from the toast
   * @param index item index of the toast to remove
   */
  cancel() {
    this.timeOut.emit(this.toast);
  }

  /**
   * remove the item from the toast
   * @param index item index of the toast to remove
   */
  closeAction() {
    this.close.emit(this.toast);
  }

  /**
   * toast button click event
   * @param toast toast object
   * @param button button object
   */
  buttonClicked(toast: Toast, button: Button) {
    toast.clickedButton = button;
    this.buttonClick.emit(toast);
  }
}
