import { ButtonTypes } from './SimpleToast';

export class Button {
  text: string;
  buttonType: ButtonTypes;

  constructor(text: string, buttonType: ButtonTypes) {
    this.text = text;
    this.buttonType = buttonType;
  }
}
