import { OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

export class BaseComponent implements OnDestroy {

  protected subs: Subscription = new Subscription()

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
