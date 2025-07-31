import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { firstValueFrom, Observable } from "rxjs";
import { CardComponent } from "src/components/card/card.component";
import { EuroInputComponent } from "src/components/euro-input/euro.input.component";
import { ResultTableComponent } from "src/components/result-table/result-table.component";
import { BreakdownState, BreakdownStateService } from "src/services/breakdown/breakdown-state.service";
import { BreakdownService, CalculationMode } from "src/services/breakdown/breakdown.service";
import { BackendErrorComponent } from "src/components/backend-error/backend-error.component";
import { HeaderComponent } from "src/components/header/header.component";

@Component({
    selector: 'app-smart-breakdown',
    standalone: true,
    imports: [CommonModule, CardComponent, EuroInputComponent, ReactiveFormsModule, ResultTableComponent, BackendErrorComponent, HeaderComponent],
    templateUrl: './smart-breakdown.component.html',
    styleUrls: ['./smart-breakdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownComponent {
    formGroup = new FormGroup({
        euroAmount: new FormControl(0, [Validators.required])
    });
    breakdownState$: Observable<BreakdownState> = this.breakdownStateService.state$;
    CalculationMode = CalculationMode;

    onSwitchToFrontend = () => {
        this.breakdownStateService.updateBackendError(null);
        this.breakdownStateService.updateCalculationMode(CalculationMode.FRONTEND);
    };

    onRetry = () => {
        this.breakdownStateService.updateBackendError(null);
        this.breakdownStateService.updateLoading(true);
        this.onSubmit(null);
    };

    constructor(private breakdownService: BreakdownService, private readonly breakdownStateService: BreakdownStateService) { }

    async onSubmit($event: Event | null) {
        this.breakdownStateService.updateLoading(true);
        let euroAmount = this.formGroup.value.euroAmount;
        if (euroAmount) {
            if (isNaN(euroAmount)) {
                // TODO: the euroInputComponent should handle this with better validation
                const formattedEuroAmount = euroAmount.toString().replace(',', '.');
                euroAmount = Number(formattedEuroAmount);
            }
            try {
                this.breakdownStateService.updatePreviousEuroAmount(this.breakdownStateService.getCurrentEuroAmount());
                this.breakdownStateService.updateCurrentEuroAmount(euroAmount);
                const breakdown = await firstValueFrom(this.breakdownService.calculateBreakdown(euroAmount, this.breakdownStateService.getCalculationMode()));
                this.breakdownStateService.updateCurrentBreakdown(breakdown);
                const differences = await firstValueFrom(this.breakdownService.calculateBreakdownDifferences(breakdown, this.breakdownStateService.getPreviousBreakdown(), this.breakdownStateService.getCalculationMode()));
                this.breakdownStateService.updateBreakdownDifferences(differences);
            } catch (error: any) {
                if (this.breakdownStateService.getCalculationMode() === CalculationMode.BACKEND) {
                    this.breakdownStateService.updateBackendError({ message: error.message ? error.message : 'Fehler beim Berechnen der Stückelung im Backend' });
                }
            }
        }
        this.breakdownStateService.updateLoading(false);
    }

    onFrontendToggle(useFrontend: boolean) {
        this.breakdownStateService.updateCalculationMode(useFrontend ? CalculationMode.FRONTEND : CalculationMode.BACKEND);
    }
}