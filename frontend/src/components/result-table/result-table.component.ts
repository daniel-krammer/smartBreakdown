import { Input } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BreakdownItem } from "src/models/breakdown.model";

@Component({
    selector: 'app-result-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ResultTableComponent {
    @Input() title = "";
    @Input() breakdownItems: BreakdownItem[] = [];
    @Input() amountToShow: number | null = null;
    @Input() amountLabel: string = "Betrag:";
    @Input() variant: "breakdown" | "difference" = "breakdown";
  } 