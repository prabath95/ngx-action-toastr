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
import { SimpleToast } from '../models/SimpleToast';
import { ActionToast } from '../models/ActionToast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ComponentRef<ToastComponent>;
  toasts: Array<Toast> = [];
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

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

  public createSimpleToast(simpleToast: SimpleToast) {
    this.createOrCatchToastContainerElement();

    this.toasts.push(simpleToast);
    this.toastComponent.instance.close.subscribe(() =>
      this.destroy(this.toastComponent)
    );
  }

  public createCustomToast(actionToast: ActionToast): Observable<Toast> {
    this.createOrCatchToastContainerElement();
    const subject = new Subject<Toast>();
    const toast: Toast = actionToast;
    this.toasts.push(toast);
    toast.subject = subject;
    return subject.asObservable();
  }

  private destroy(toastComponent: ComponentRef<ToastComponent>) {
    toastComponent.destroy();
  }

}
