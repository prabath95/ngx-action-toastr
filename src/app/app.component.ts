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
    this.options.longMessage =
      'Tost long message can hold descriptions about the toast content.';
    this.options.timeToDisplay = 5000;
    this.buttons.push(new Button('Confirm', ButtonTypes.SUCCESS));
    this.buttons.push(new Button('Cancel', ButtonTypes.DANGER));
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
      toast.buttons = JSON.parse(JSON.stringify(this.buttons));
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
