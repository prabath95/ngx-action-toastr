import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
} from '@angular/core';
import { Toast } from '../models/Toast';
import { ToastComponent } from '../toast/toast.component';
import { Observable, Subject } from 'rxjs';
import { SimpleToast, ToastPosition, ToastTypes } from '../models/SimpleToast';
import { ActionToast } from '../models/ActionToast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ComponentRef<ToastComponent> | null;
  toasts: Array<Toast> = [];
  private defaultToastSettings!: SimpleToast;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {
    this.setDefaultConfig();
  }

  private setDefaultConfig() {
    const simpleToast = new SimpleToast(
      ToastPosition.RIGHT_TOP,
      '',
      ToastTypes.DANGER,
    );
    simpleToast.timeToDisplay = 6000;
    simpleToast.closeButtonActive = true;
    this.defaultConfig(simpleToast);
  }

  public defaultConfig(toast: SimpleToast) {
    this.defaultToastSettings = toast;
  }

  private createOrCatchToastContainerElement() {
    if (!this.toastComponent) {
      this.toastComponent = createComponent(ToastComponent, {
        environmentInjector: this.injector,
      });
      this.toastComponent.instance.close.subscribe(() =>
        this.destroy(this.toastComponent)
      );
      document.body.appendChild(this.toastComponent.location.nativeElement);
      this.appRef.attachView(this.toastComponent.hostView);
    }
  }

  public success(message: string, detailMessage?: string) {
    const simpleToast: SimpleToast = JSON.parse(
      JSON.stringify(this.defaultToastSettings)
    );
    simpleToast.toastId = this.generateId();
    simpleToast.message = message;
    simpleToast.longMessage = detailMessage;
    simpleToast.toastType = ToastTypes.SUCCESS;
    this.createSimpleToast(simpleToast);
  }

  public warning(message: string, detailMessage?: string) {
    const simpleToast: SimpleToast = JSON.parse(
      JSON.stringify(this.defaultToastSettings)
    );
    simpleToast.toastId = this.generateId();
    simpleToast.message = message;
    simpleToast.longMessage = detailMessage;
    simpleToast.toastType = ToastTypes.WARNING;
    this.createSimpleToast(simpleToast);
  }

  public danger(message: string, detailMessage?: string) {
    const simpleToast: SimpleToast = JSON.parse(
      JSON.stringify(this.defaultToastSettings)
    );
    simpleToast.toastId = this.generateId();
    simpleToast.message = message;
    simpleToast.longMessage = detailMessage;
    simpleToast.toastType = ToastTypes.DANGER;
    this.createSimpleToast(simpleToast);
  }

  public info(message: string, detailMessage?: string) {
    const simpleToast: SimpleToast = JSON.parse(
      JSON.stringify(this.defaultToastSettings)
    );
    simpleToast.toastId = this.generateId();
    simpleToast.message = message;
    simpleToast.longMessage = detailMessage;
    simpleToast.toastType = ToastTypes.INFO;
    this.createSimpleToast(simpleToast);
  }

  public default(message: string, detailMessage?: string) {
    const simpleToast: SimpleToast = JSON.parse(
      JSON.stringify(this.defaultToastSettings)
    );
    simpleToast.toastId = this.generateId();
    simpleToast.message = message;
    simpleToast.longMessage = detailMessage;
    simpleToast.toastType = ToastTypes.DEFAULT;
    this.createSimpleToast(simpleToast);
  }

  public createSimpleToast(simpleToast: SimpleToast) {
    this.createOrCatchToastContainerElement();
    simpleToast.toastId = this.generateId();
    if (this.toastComponent) {
      this.toastComponent!.instance!.toastPosition = simpleToast.toastPosition;
    }
    this.toasts.push(simpleToast);
    if (simpleToast.timeToDisplay && simpleToast.timeToDisplay > 0) {
      this.toastComponent?.instance.setTimeOutForAutoDisappear(simpleToast);
    }
  }

  public createCustomToast(actionToast: ActionToast): Observable<Toast> {
    this.createOrCatchToastContainerElement();
    const subject = new Subject<Toast>();
    const toast: Toast = actionToast;
    actionToast.toastId = this.generateId();
    if (this.toastComponent) {
      this.toastComponent!.instance!.toastPosition = actionToast.toastPosition;
    }
    this.toasts.push(toast);
    toast.subject = subject;
    if (actionToast.timeToDisplay && actionToast.timeToDisplay > 0) {
      this.toastComponent?.instance.setTimeOutForAutoDisappear(actionToast);
    }
    return subject.asObservable();
  }

  private destroy(toastComponent: ComponentRef<ToastComponent> | null) {
    toastComponent?.destroy();
    this.toastComponent = null;
  }

  public removeAll() {
    if (this.toastComponent) {
      this.toasts = [];
      this.destroy(this.toastComponent);
    }
  }

  private generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
