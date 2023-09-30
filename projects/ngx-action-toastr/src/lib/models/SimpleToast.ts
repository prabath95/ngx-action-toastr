export enum ToastTypes {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
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
  closeButtonActive?: boolean;
  toastType: ToastTypes;
  toastData?: any;
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
