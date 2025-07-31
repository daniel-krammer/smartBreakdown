import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakdownItem } from 'src/models/breakdown.model';

export interface BreakdownCalculationRequest {
    amount: number;
}

export interface BreakdownDifferenceRequest {
    currentBreakdown: BreakdownItem[];
    previousBreakdown: BreakdownItem[];
}

@Injectable({ providedIn: 'root' })
export class BreakdownHttpService {
    private readonly baseUrl = 'http://localhost:8080/api/breakdown';

    constructor(private http: HttpClient) {}

    calculateBreakdown(amount: number): Observable<BreakdownItem[]> {
        const request: BreakdownCalculationRequest = { amount };
        return this.http.post<BreakdownItem[]>(`${this.baseUrl}/calculate`, request);
    }

    calculateBreakdownDifferences(
        currentBreakdown: BreakdownItem[], 
        previousBreakdown: BreakdownItem[]
    ): Observable<BreakdownItem[]> {
        const request: BreakdownDifferenceRequest = {
            currentBreakdown,
            previousBreakdown
        };
        return this.http.post<BreakdownItem[]>(`${this.baseUrl}/calculate-difference`, request);
    }
}