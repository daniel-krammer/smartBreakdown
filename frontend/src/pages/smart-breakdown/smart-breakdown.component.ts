import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CardComponent } from "src/components/card/card.component";

@Component({
    selector: 'app-smart-breakdown',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './smart-breakdown.component.html',
    styleUrls: ['./smart-breakdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownComponent {

}