import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'smart-breakdown-app',
  templateUrl: './smart-breakdown-app.component.html',
  styleUrls: ['./smart-breakdown-app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownAppComponent {
}
