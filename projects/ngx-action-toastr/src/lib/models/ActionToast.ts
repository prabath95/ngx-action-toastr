import { Button } from './Button';
import { SimpleToast } from './SimpleToast';

export class ActionToast extends SimpleToast {
  buttons?: Array<Button>;
  clickedButton?: Button;
}
