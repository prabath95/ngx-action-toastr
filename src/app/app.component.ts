import { Component } from '@angular/core';
import { ButtonTypes } from '../../projects/ngx-action-toastr/src/lib/models/SimpleToast';
import {
  ActionToast,
  Button,
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
  options!: ActionToast;
  toastTypes = ToastTypes;
  toastPositions = ToastPosition;
  buttonOptions = {
    text: '',
    buttonType: ButtonTypes.SUCCESS,
  };
  buttonTypes = ButtonTypes;
  buttons: Array<Button> = [];

  constructor(private toastService: ToastService) {
    this.options = new ActionToast(
      ToastPosition.RIGHT_TOP,
      'Hey! its me Action Toaster.',
      ToastTypes.SUCCESS
    );
    this.options.timeToDisplay = 5000;
  }

  addButtons() {
    const button = new Button(
      this.buttonOptions.text,
      this.buttonOptions.buttonType
    );
    this.buttons.push(button);
  }

  removeButton(index: number) {
    this.buttons.splice(index, 1);
  }

  openToast() {
    if (this.buttons.length > 0) {
      const toast = JSON.parse(JSON.stringify(this.options));
      toast.buttons = this.buttons;
      this.toastService.createCustomToast(toast);
    } else {
      const toast = JSON.parse(JSON.stringify(this.options));
      this.toastService.createSimpleToast(toast);
    }
  }

  removeAll() {
    this.toastService.removeAll();
  }
}
