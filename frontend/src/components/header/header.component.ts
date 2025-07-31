import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Input() title = 'Smart Breakdown';
    @Input() frontendEnabled = true;

    @Output() frontendToggle = new EventEmitter<boolean>();

    onFrontendToggle(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.frontendToggle.emit(target.checked);
    }
} 