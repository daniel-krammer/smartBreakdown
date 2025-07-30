import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardComponent } from "src/components/card/card.component";
import { EuroInputComponent } from "src/components/euro-input/euro.input.component";

@Component({
    selector: 'app-smart-breakdown',
    standalone: true,
    imports: [CommonModule, CardComponent, EuroInputComponent, ReactiveFormsModule],
    templateUrl: './smart-breakdown.component.html',
    styleUrls: ['./smart-breakdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBreakdownComponent {
    formGroup = new FormGroup({
        euroAmount: new FormControl(0, [Validators.required])
      });

    onSubmit($event: Event) {
        console.log("submitting...");
    }
}