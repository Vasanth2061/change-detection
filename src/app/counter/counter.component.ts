import { ChangeDetectionStrategy, Component, inject, NgZone, OnChanges, signal } from '@angular/core';

import { OnInit } from '@angular/core';
import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  count = signal(0);

  private zone = inject(NgZone);

  ngOnInit() {
    setInterval(()=> {
      this.count.set(0);
    }, 4000);

    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        console.log('Timer expired');
      }, 5000);
    });

  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
