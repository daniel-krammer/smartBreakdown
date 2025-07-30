import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { BreakdownItem } from 'src/models/breakdown.model';
import { BreakdownService } from './breakdown.service';

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
            const expectedBreakdown: BreakdownItem[] = [
                { denomination: 100, count: 1 },
                { denomination: 20, count: 1 },
                { denomination: 2, count: 1 },
                { denomination: 1, count: 1 }
            ];
            const result = await firstValueFrom(service.calculateBreakdown(123));
            expect(result).toEqual(expectedBreakdown);
        });

        it('should handle zero', async () => {
            const result = await firstValueFrom(service.calculateBreakdown(0));
            expect(result).toEqual([]);
        });

        it('should handle decimals correctly', async () => {
            const expectedBreakdown: BreakdownItem[] = [
                { denomination: 0.5, count: 1 },
                { denomination: 0.2, count: 2 },
                { denomination: 0.05, count: 1 },
                { denomination: 0.02, count: 2 }
            ];
            const result = await firstValueFrom(service.calculateBreakdown(0.99));
            expect(result).toEqual(expectedBreakdown);
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

    describe('calculateBreakdownDifferences', () => {
        it('should calculate differences when both arrays have items', () => {
            const current: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 },
                { denomination: 5, count: 1 }
            ];

            const previous: BreakdownItem[] = [
                { denomination: 100, count: 1 },
                { denomination: 20, count: 2 },
                { denomination: 10, count: 1 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: 1 },
                { denomination: 20, count: -1 },
                { denomination: 10, count: -1 },
                { denomination: 5, count: 1 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle empty previous breakdown', () => {
            const current: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 }
            ];

            const previous: BreakdownItem[] = [];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle empty current breakdown', () => {
            const current: BreakdownItem[] = [];

            const previous: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: -2 },
                { denomination: 20, count: -1 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle both empty arrays', () => {
            const current: BreakdownItem[] = [];
            const previous: BreakdownItem[] = [];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual([]);
        });

        it('should handle no differences (same values)', () => {
            const current: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 }
            ];

            const previous: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: 1 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: 0 },
                { denomination: 20, count: 0 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle partial overlap of denominations', () => {
            const current: BreakdownItem[] = [
                { denomination: 100, count: 1 },
                { denomination: 50, count: 2 },
                { denomination: 10, count: 1 }
            ];

            const previous: BreakdownItem[] = [
                { denomination: 50, count: 1 },
                { denomination: 20, count: 2 },
                { denomination: 5, count: 1 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: 1 },
                { denomination: 50, count: 1 },
                { denomination: 20, count: -2 },
                { denomination: 10, count: 1 },
                { denomination: 5, count: -1 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle decimal denominations', () => {
            const current: BreakdownItem[] = [
                { denomination: 0.5, count: 2 },
                { denomination: 0.2, count: 1 },
                { denomination: 0.05, count: 1 }
            ];

            const previous: BreakdownItem[] = [
                { denomination: 0.5, count: 1 },
                { denomination: 0.1, count: 2 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 0.5, count: 1 },
                { denomination: 0.2, count: 1 },
                { denomination: 0.1, count: -2 },
                { denomination: 0.05, count: 1 }
            ];
            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });

        it('should handle mixed positive and negative differences', () => {
            const current: BreakdownItem[] = [
                { denomination: 100, count: 5 },
                { denomination: 20, count: 0 },
                { denomination: 10, count: 2 }
            ];

            const previous: BreakdownItem[] = [
                { denomination: 100, count: 3 },
                { denomination: 20, count: 2 },
                { denomination: 10, count: 2 }
            ];

            const expectedDifference: BreakdownItem[] = [
                { denomination: 100, count: 2 },
                { denomination: 20, count: -2 },
                { denomination: 10, count: 0 }
            ];

            const result = service.calculateBreakdownDifferences(current, previous);

            expect(result).toEqual(expectedDifference);
        });
    });
});