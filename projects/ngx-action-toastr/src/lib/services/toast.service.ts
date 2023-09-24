import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
} from '@angular/core';
import { Toast, ToastTypes } from '../models/Toast';
import { ToastComponent } from '../toast/toast.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  public createSimpleToast(
    message: string,
    toastType: ToastTypes,
    toastTimeOut?: number
  ) {
    const toast = new Toast(message, toastType, toastTimeOut);
    const toastComponent = createComponent(ToastComponent, {
      environmentInjector: this.injector,
    });
    toastComponent.instance.toast = toast;
    toastComponent.instance.timeOut.subscribe(() =>
      this.destroy(toastComponent)
    );
    document.body.appendChild(toastComponent.location.nativeElement);
    this.appRef.attachView(toastComponent.hostView);
  }

  public createCustomToast(toast: Toast): Observable<Toast> {
    const subject = new Subject<Toast>();
    const toastComponent = createComponent(ToastComponent, {
      environmentInjector: this.injector,
    });
    toastComponent.instance.toast = toast;
    toastComponent.changeDetectorRef.detectChanges();
    toastComponent.instance.timeOut.subscribe(() =>
      this.destroy(toastComponent)
    );
    if (toast.buttons && toast.buttons.length > 0) {
      toastComponent.instance.buttonClick.subscribe((toastData) =>
        this.buttonClicked(toastData, toastComponent, subject)
      );
    }
    if (toast.closeButtonActive) {
      toastComponent.instance.close.subscribe((toastData) =>
        this.closeToast(toastData, toastComponent, subject)
      );
    }
    document.body.appendChild(toastComponent.location.nativeElement);
    this.appRef.attachView(toastComponent.hostView);
    return subject.asObservable();
  }

  private destroy(toastComponent: ComponentRef<ToastComponent>) {
    toastComponent.destroy();
  }

  private closeToast(
    toast: Toast,
    toastComponent: ComponentRef<ToastComponent>,
    subject: Subject<Toast>
  ) {
    subject.next(toast);
    toastComponent.destroy();
  }

  private buttonClicked(
    toast: Toast,
    toastComponent: ComponentRef<ToastComponent>,
    subject: Subject<Toast>
  ) {
    subject.next(toast);
    toastComponent.destroy();
  }
}
