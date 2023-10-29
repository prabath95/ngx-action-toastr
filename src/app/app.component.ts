import { Component } from '@angular/core';
import { ButtonTypes } from '../../projects/ngx-action-toastr/src/lib/models/SimpleToast';
import {
  ActionToast,
  Button,
  SimpleToast,
  Theme,
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
  themes = Theme;
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
    this.options.theme = this.themes.CLASSIC;
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

  setDefaults() {
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.defaultConfig(toast);
  }

  openSuccessToast() {
    this.setDefaults();
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.success(toast.message, toast.longMessage);
  }

  openInfoToast() {
    this.setDefaults();
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.info(toast.message, toast.longMessage);
  }

  openWarningToast() {
    this.setDefaults();
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.warning(toast.message, toast.longMessage);
  }

  openDangerToast() {
    this.setDefaults();
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.danger(toast.message, toast.longMessage);
  }

  openDefaultToast() {
    this.setDefaults();
    const toast = JSON.parse(JSON.stringify(this.options));
    this.toastService.default(toast.message, toast.longMessage);
  }
}
