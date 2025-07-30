import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { EURO_DENOMINATIONS } from 'shared/constants/denominations';
import { BreakdownItem } from 'src/models/breakdown.model';

@Injectable({
    providedIn: 'root'
})
export class BreakdownService {

    calculateBreakdown(amount: number): Observable<BreakdownItem[]> {
        if (amount < 0) {
            return throwError(() => new Error('Amount cannot be negative'));
        }
        
        // Working with cents to avoid floating point precision issues
        const breakdown: BreakdownItem[] = [];
        let remainingAmountInCents = Math.round(amount * 100);

        for (const denomination of EURO_DENOMINATIONS) {
            const denominationInCents = Math.round(denomination * 100);
            const count = Math.floor(remainingAmountInCents / denominationInCents);
            if (count > 0) {
                breakdown.push({
                    denomination,
                    count
                });
                remainingAmountInCents = remainingAmountInCents - (count * denominationInCents);
            }
        }

        return of(breakdown);
    }
} 