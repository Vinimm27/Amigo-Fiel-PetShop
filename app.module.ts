import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: ``,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}