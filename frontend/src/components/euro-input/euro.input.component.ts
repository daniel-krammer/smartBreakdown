import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-euro-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './euro-input.component.html',
    styleUrls: ['./euro-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuroInputComponent {

    @Input() label!: string;
    @Input() control!: FormControl;
    type: string = 'text';
    // a maximal amount of 9.999.999.999 seemed enough for now
    // the regex currently does allow a separator without numbers before or after
    // e.g. ",23" | "12," | "," --> we catch this in the onBlur event and when the user tries to submit with enter
    // TODO: work with better validation than regex
    allowedInputPattern: RegExp = new RegExp('^([0-9]{0,10}([.,][0-9]{0,2})?)?$');
    private previousValue: string = '0,00';
    private cd = inject(ChangeDetectorRef);
    ngOnInit() {
        this.control.valueChanges.subscribe(value => {
            this.onEuroInputChanged(value);
        });
    }

    onEuroInputChanged(newValue: string) {
        if (this.allowedInputPattern.test(newValue)) {
            this.previousValue = this.control.value;
        } else {
            this.control.setValue(this.previousValue, { emitEvent: false });
        }
    }

    onBlur($event: FocusEvent) {
        this.updateControlWithFormattedValue();
        this.cd.detectChanges();
    }

    onEnter($event: Event) {
        this.updateControlWithFormattedValue();
        this.cd.detectChanges();
    }

    private updateControlWithFormattedValue() {
        let formattedValue = this.formatValue(this.control.value);
        if (formattedValue !== this.control.value) {
            this.control.setValue(formattedValue);
        }
    }

    private formatValue(value: string) {
        // If the value starts with a separator, add a 0 in front
        if (/^[.,]/.test(value)) {
            value = '0' + value;
        }
        // If the value ends with a separator, add two 0s
        if (/[.,]$/.test(value)) {
            value = value + "00";
        }
        return value;
    }
}