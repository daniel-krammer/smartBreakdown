import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakdownItem } from 'src/models/breakdown.model';
import { CalculationMode } from './breakdown.service';
import { BackendError } from 'src/models/backend-error.model';

export interface BreakdownState {
    currentEuroAmount: number;
    previousEuroAmount: number | null;
    currentBreakdown: BreakdownItem[];
    previousBreakdown: BreakdownItem[];
    breakdownDifferences: BreakdownItem[];
    initialState: boolean;
    calculationMode: CalculationMode;
    loading: boolean;
    backendError: BackendError | null;
}

@Injectable({
    providedIn: 'root'
})
export class BreakdownStateService {
    private state = new BehaviorSubject<BreakdownState>({
        currentEuroAmount: 0,
        previousEuroAmount: null,
        currentBreakdown: [],
        previousBreakdown: [],
        breakdownDifferences: [],
        initialState: true,
        calculationMode: CalculationMode.FRONTEND,
        loading: false,
        backendError: null
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

    updateLoading(loading: boolean): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            loading: loading
        });
    }

    updateBackendError(error: BackendError | null): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            backendError: error
        });
    }

    updateCurrentEuroAmount(euroAmount: number): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            currentEuroAmount: euroAmount
        });
    }

    updatePreviousEuroAmount(euroAmount: number): void {
        const currentState = this.state.value;
        this.state.next({
            ...currentState,
            previousEuroAmount: euroAmount
        });
    }

    getCurrentEuroAmount(): number {
        return this.state.value.currentEuroAmount;
    }

    getPreviousEuroAmount(): number | null {
        return this.state.value.previousEuroAmount;
    }
}