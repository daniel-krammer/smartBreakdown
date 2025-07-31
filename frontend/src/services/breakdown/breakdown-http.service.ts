import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    private readonly timeoutMs = 4000;

    constructor(private http: HttpClient) {}

    calculateBreakdown(amount: number): Observable<BreakdownItem[]> {
        const request: BreakdownCalculationRequest = { amount };
        return this.http.post<BreakdownItem[]>(`${this.baseUrl}/calculate`, request)
            .pipe(
                timeout(this.timeoutMs),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        return throwError(() => new Error('Request timeout: Server nicht erreichbar innerhalb von 4 Sekunden'));
                    }
                    return throwError(() => error);
                })
            );
    }

    calculateBreakdownDifferences(
        currentBreakdown: BreakdownItem[], 
        previousBreakdown: BreakdownItem[]
    ): Observable<BreakdownItem[]> {
        const request: BreakdownDifferenceRequest = {
            currentBreakdown,
            previousBreakdown
        };
        return this.http.post<BreakdownItem[]>(`${this.baseUrl}/calculate-difference`, request)
            .pipe(
                timeout(this.timeoutMs),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        return throwError(() => new Error('Request timeout: Server nicht erreichbar innerhalb von 4 Sekunden'));
                    }
                    return throwError(() => error);
                })
            );
    }
}