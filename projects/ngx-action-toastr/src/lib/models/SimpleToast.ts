export enum ToastTypes {
  SUCCESS = 'SUCCESS',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum ButtonTypes {
  SUCCESS = 'SUCCESS',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum ToastPosition {
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
}

export class SimpleToast {
  toastPosition: ToastPosition;
  messageBoldFront?: string;
  messageBoldEnd?: string;
  message: string;
  isTapToClose?: boolean;
  closeButtonActive?: boolean;
  toastType: ToastTypes;
  toastData?: any;
  icon: any;
  // in milliseconds
  timeToDisplay?: number;
  longMessage?: string;

  constructor(
    toastPosition: ToastPosition,
    message: string,
    toastType: ToastTypes
  ) {
    this.toastPosition = toastPosition;
    this.message = message;
    this.toastType = toastType;
  }
}
