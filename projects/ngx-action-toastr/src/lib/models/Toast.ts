import { Button } from './Button';

export enum ToastTypes {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export class Toast {
  messageBoldFront?: string;
  messageBoldEnd?: string;
  message: string;
  closeButtonActive?: boolean;
  toastType: ToastTypes;
  toastData?: any;
  buttons?: Array<Button>;
  clickedButton?: Button;
  // in milliseconds
  timeToDisplay?: number;
  isExpanded?: boolean;
  longMessage?: string;

  constructor(
    message: string,
    toastType: ToastTypes,
    toastTimeOut: number = 4000
  ) {
    this.toastType = toastType;
    this.message = message;
    this.timeToDisplay = toastTimeOut;
  }
}
