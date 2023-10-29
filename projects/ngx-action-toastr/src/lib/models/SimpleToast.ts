export enum ToastTypes {
  DEFAULT = 'DEFAULT',
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

export enum Theme {
  DEFAULT = 'DEFAULT',
  CLASSIC = 'CLASSIC',
}

export enum ToastPosition {
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
  CENTER = 'CENTER',
  CENTER_BOTTOM = 'CENTER_BOTTOM',
  CENTER_TOP = 'CENTER_TOP',
}

export class SimpleToast {
  theme: Theme;
  toastId?: string;
  toastPosition: ToastPosition;
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
    toastType: ToastTypes,
    theme: Theme = Theme.DEFAULT
  ) {
    this.toastPosition = toastPosition;
    this.message = message;
    this.toastType = toastType;
    this.theme = theme;
  }
}
