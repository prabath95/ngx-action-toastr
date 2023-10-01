import { Subject } from 'rxjs';
import { ActionToast } from './ActionToast';

export class Toast extends ActionToast {
  subject?: Subject<Toast>;
}
