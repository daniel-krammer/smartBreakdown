import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-smart-breakdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './smart-breakdown.component.html',
    styleUrls: ['./smart-breakdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownComponent {

}