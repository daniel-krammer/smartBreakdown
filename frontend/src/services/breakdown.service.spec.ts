import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakdownService } from './breakdown.service';
import { firstValueFrom } from 'rxjs';

describe('BreakdownService', () => {
    let service: BreakdownService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [BreakdownService]
        });
        service = TestBed.inject(BreakdownService);
    });

    describe('calculateBreakdown', () => {
        it('should return the correct breakdown', async () => {
            const result = await firstValueFrom(service.calculateBreakdown(123));
            expect(result).toEqual([
                { denomination: 100, count: 1 },
                { denomination: 20, count: 1 },
                { denomination: 2, count: 1 },
                { denomination: 1, count: 1 }
            ]);

        });

        it('should handle zero', async () => {
            const result = await firstValueFrom(service.calculateBreakdown(0));
            expect(result).toEqual([]);
        });

        it('should handle decimals correctly', async () => {
            const result = await firstValueFrom(service.calculateBreakdown(0.99));
            expect(result).toEqual([
                { denomination: 0.5, count: 1 },
                { denomination: 0.2, count: 2 },
                { denomination: 0.05, count: 1 },
                { denomination: 0.02, count: 2 }
            ]);
        });

        it('should throw error for negative amounts', async () => {
            try {
                await firstValueFrom(service.calculateBreakdown(-1));
                fail('Expected error to be thrown');
            } catch (error: unknown) {
                expect((error as Error).message).toBe('Amount cannot be negative');
            }
        });
    });
});