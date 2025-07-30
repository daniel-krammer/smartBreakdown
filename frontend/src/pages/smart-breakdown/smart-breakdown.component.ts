import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardComponent } from "src/components/card/card.component";
import { EuroInputComponent } from "src/components/euro-input/euro.input.component";
import { ResultTableComponent } from "src/components/result-table/result-table.component";
import { BreakdownItem } from "src/models/breakdown.model";
import { BreakdownService } from "src/services/breakdown.service";

@Component({
    selector: 'app-smart-breakdown',
    standalone: true,
    imports: [CommonModule, CardComponent, EuroInputComponent, ReactiveFormsModule, ResultTableComponent],
    templateUrl: './smart-breakdown.component.html',
    styleUrls: ['./smart-breakdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownComponent {
    formGroup = new FormGroup({
        euroAmount: new FormControl(0, [Validators.required])
    });
    breakdownItems: BreakdownItem[] = [];

    constructor(private breakdownService: BreakdownService) { }

    onSubmit($event: Event) {
        let euroAmount = this.formGroup.value.euroAmount;
        if (euroAmount) {
            if (isNaN(euroAmount)) {
                // format euroAmount to number
                // TODO: the euroInputComponent should handle this
                const formattedEuroAmount = euroAmount.toString().replace(',', '.');
                euroAmount = Number(formattedEuroAmount);
            }
            this.breakdownService.calculateBreakdown(euroAmount).subscribe((breakdownItems) => {
                this.breakdownItems = breakdownItems;
            });
        }
    }
}