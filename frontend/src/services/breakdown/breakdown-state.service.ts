import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakdownItem } from 'src/models/breakdown.model';
import { CalculationMode } from './breakdown.service';

export interface BreakdownState {
    currentBreakdown: BreakdownItem[];
    previousBreakdown: BreakdownItem[];
    breakdownDifferences: BreakdownItem[];
    initialState: boolean;
    calculationMode: CalculationMode;
}

@Injectable({
    providedIn: 'root'
})
export class BreakdownStateService {
    private state = new BehaviorSubject<BreakdownState>({
        currentBreakdown: [],
        previousBreakdown: [],
        breakdownDifferences: [],
        initialState: true,
        calculationMode: CalculationMode.FRONTEND
    });

    public state$ = this.state.asObservable();

    updateCurrentBreakdown(breakdown: BreakdownItem[]): void {
        const currentState = this.state.value;
        const previousBreakdown = currentState.currentBreakdown;

        this.state.next({
            ...currentState,
            currentBreakdown: breakdown,
            previousBreakdown: previousBreakdown,
            initialState: false,
        });
    }

    updateBreakdownDifferences(differences: BreakdownItem[]): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            breakdownDifferences: differences,
            initialState: false
        });
    }

    updateCalculationMode(mode: CalculationMode): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            calculationMode: mode
        });
    }

    getCurrentBreakdown(): BreakdownItem[] {
        return this.state.value.currentBreakdown;
    }

    getPreviousBreakdown(): BreakdownItem[] {
        return this.state.value.previousBreakdown;
    }

    getDifferences(): BreakdownItem[] {
        return this.state.value.breakdownDifferences;
    }

    getCalculationMode(): CalculationMode {
        return this.state.value.calculationMode;
    }
}