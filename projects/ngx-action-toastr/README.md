<div align="center">
  <img src="https://prabath95.github.io/simple-toast.png" width="300" alt="Action Toastr">
  <br>
  <img src="https://prabath95.github.io/detail-toast.png" width="300" alt="Action Toastr">
  <br>
  <img src="https://prabath95.github.io/action-toast.png" width="300" alt="Action Toastr">
  <br>
  <h1>ngx-action-toastr</h1>
  <br>
  <br>
</div>

DEMO: https://prabath95.github.io/

## Features

- Tost dynamic component creation.
- Simple usage with out huge line of codes.
- AoT compilation and lazy loading compatible.
- Return observable to handle toast actions.

## Install

```bash
npm install ngx-action-toastr --save
```

`@fortawesome/free-solid-svg-icons` required for icons 

```bash
npm install @fortawesome/free-solid-svg-icons --save
```

## Use

```typescript
import { ToastService, SimpleToast, ToastTypes, ToastPosition, ActionToast, Button, ButtonTypes } from 'ngx-action-toastr';

@Component({...})
export class YourComponent {
  constructor(private toast: ToastService) {}

  simpleToast() {
     const options = new SimpleToast(
      ToastPosition.RIGHT_TOP,
      'Hey! its me Action Toaster.',
      ToastTypes.SUCCESS
    );
    this.toast.createSimpleToast(options);
  }

  actionToast() {
    const options = new ActionToast(
      ToastPosition.RIGHT_TOP,
      'Hey! its me Action Toaster.',
      ToastTypes.SUCCESS
    );
    // for enable close button
    option.closeButtonActive = true;
    // close on click
    option.isTapToClose = true;
    // auto disappear in 5 sec
    option.timeToDisplay = 5000;
    // toast description
    option.longMessage = 'This is a long text that describes more about the toast.'
    options.buttons = [];
    options.buttons.push(new Button('Confirm',ButtonTypes.SUCCESS))
    options.buttons.push(new Button('Cancel',ButtonTypes.DANGER))
    this.toast.createCustomToast(options).subscribe((toast) => {
        console.log('Handle tost click events here')
    });
  }

  openSuccessToast() {
    this.toastService.success('Hey! its me Action Toaster.');
  }

  openInfoToast() {
    this.toastService.info('Hey! its me Action Toaster.');
  }

  openWarningToast() {
    this.toastService.warning('Hey! its me Action Toaster.');
  }

  openDangerToast() {
    this.toastService.danger('Hey! its me Action Toaster.');
  }

  openDefaultToast() {
    this.toastService.default('Hey! its me Action Toaster.');
  }
}
```
