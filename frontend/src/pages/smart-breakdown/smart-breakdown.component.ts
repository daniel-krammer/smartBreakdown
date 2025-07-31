import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { firstValueFrom, Observable } from "rxjs";
import { CardComponent } from "src/components/card/card.component";
import { EuroInputComponent } from "src/components/euro-input/euro.input.component";
import { ResultTableComponent } from "src/components/result-table/result-table.component";
import { BreakdownState, BreakdownStateService } from "src/services/breakdown/breakdown-state.service";
import { BreakdownService } from "src/services/breakdown/breakdown.service";

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
    breakdownState$: Observable<BreakdownState> = this.breakdownStateService.state$;

    constructor(private breakdownService: BreakdownService, private readonly breakdownStateService: BreakdownStateService) { }

    async onSubmit($event: Event) {
        let euroAmount = this.formGroup.value.euroAmount;
        if (euroAmount) {
            if (isNaN(euroAmount)) {
                // TODO: the euroInputComponent should handle this with better validation
                const formattedEuroAmount = euroAmount.toString().replace(',', '.');
                euroAmount = Number(formattedEuroAmount);
            }
            const breakdown = await firstValueFrom(this.breakdownService.calculateBreakdown(euroAmount, this.breakdownStateService.getCalculationMode()));
            this.breakdownStateService.updateCurrentBreakdown(breakdown);
            const differences = await firstValueFrom(this.breakdownService.calculateBreakdownDifferences(breakdown, this.breakdownStateService.getPreviousBreakdown(), this.breakdownStateService.getCalculationMode()));
            this.breakdownStateService.updateBreakdownDifferences(differences);
        }
    }
}