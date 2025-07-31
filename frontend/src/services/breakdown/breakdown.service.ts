import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { EURO_DENOMINATIONS } from 'src/constants/denominations';
import { BreakdownItem } from 'src/models/breakdown.model';
import { BreakdownHttpService } from './breakdown-http.service';

export enum CalculationMode {
    FRONTEND,
    BACKEND
}

@Injectable({
    providedIn: 'root'
})
export class BreakdownService {

    constructor(private breakdownHttpService: BreakdownHttpService) { }

    calculateBreakdown(amount: number, calculationMode: CalculationMode = CalculationMode.FRONTEND): Observable<BreakdownItem[]> {
        validateAmount(amount);

        if (calculationMode === CalculationMode.BACKEND) {
            return this.calculateBreakdownBackend(amount);
        } else {
            return this.calculateBreakdownFrontend(amount);
        }
    }

    calculateBreakdownBackend(amount: number): Observable<BreakdownItem[]> {
        return this.breakdownHttpService.calculateBreakdown(amount);
    }

    calculateBreakdownFrontend(amount: number): Observable<BreakdownItem[]> {
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

    calculateBreakdownDifferences(currentBreakdown: BreakdownItem[], previousBreakdown: BreakdownItem[], calculationMode: CalculationMode = CalculationMode.FRONTEND): Observable<BreakdownItem[]> {
        if (calculationMode === CalculationMode.BACKEND) {
            return this.calculateBreakdownDifferencesBackend(currentBreakdown, previousBreakdown);
        } else {
            return this.calculateBreakdownDifferencesFrontend(currentBreakdown, previousBreakdown);
        }
    }
    calculateBreakdownDifferencesBackend(currentBreakdown: BreakdownItem[], previousBreakdown: BreakdownItem[]): Observable<BreakdownItem[]> {
        return this.breakdownHttpService.calculateBreakdownDifferences(currentBreakdown, previousBreakdown);
    }
    calculateBreakdownDifferencesFrontend(currentBreakdown: BreakdownItem[], previousBreakdown: BreakdownItem[]): Observable<BreakdownItem[]> {
        const differences: BreakdownItem[] = [];
        const currentBreakdownMap: Map<number, number> = this.createDenominationMap(currentBreakdown);
        const previousBreakdownMap: Map<number, number> = this.createDenominationMap(previousBreakdown);
        const combinedAffectedDenominations: Set<number> = new Set([...currentBreakdown.map(item => item.denomination), ...previousBreakdown.map(item => item.denomination)]);
        for (const currentDenomination of combinedAffectedDenominations) {
            const previousCount = previousBreakdownMap.get(currentDenomination) || 0;
            const currentCount = currentBreakdownMap.get(currentDenomination) || 0;

            const difference = currentCount - previousCount;
            differences.push({ denomination: currentDenomination, count: difference });
        }
        const sortedDifferences = this.sortByDenomination(differences);
        return of(sortedDifferences);
    }


    private sortByDenomination(items: BreakdownItem[]): BreakdownItem[] {
        return items.sort((a, b) => b.denomination - a.denomination);
    }

    private createDenominationMap(breakdown: BreakdownItem[]): Map<number, number> {
        return new Map<number, number>(breakdown.map(({ denomination, count }) => [denomination, count]));
    }
}

function validateAmount(amount: number) {
    if (amount < 0) {
        throw new Error('Amount cannot be negative');
    }
}
