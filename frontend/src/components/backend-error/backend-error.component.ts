import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-backend-error',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './backend-error.component.html',
  styleUrls: ['./backend-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorComponent {
  @Input() message = '';
  @Input() onRetry: () => void = () => {};
  @Input() onSwitchToFrontend: () => void = () => {};
} 