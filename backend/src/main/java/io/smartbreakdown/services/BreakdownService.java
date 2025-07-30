package io.smartbreakdown.services;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import comparators.BreakdownItemComparator;
import io.smartbreakdown.models.BreakdownItem;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BreakdownService {

    private static final List<Double> DENOMINATIONS = Arrays.asList(200.0, 100.0, 50.0, 20.0, 10.0, 5.0, 2.0, 1.0, 0.5,
            0.2, 0.1,
            0.05, 0.02, 0.01);

    private static final BreakdownItemComparator COMPARATOR = new BreakdownItemComparator();
    private static final int CENTS_MULTIPLIER = 100;

    public List<Double> getDenominations() {
        return DENOMINATIONS;
    }

    public BreakdownService() {
    }

    public SortedSet<BreakdownItem> calculateBreakdown(final double amount) {
        validateAmount(amount);

        SortedSet<BreakdownItem> breakdown = new TreeSet<>(COMPARATOR);
        long remainingAmountInCents = convertToCents(amount);

        for (Double denomination : DENOMINATIONS) {
            long denominationInCents = convertToCents(denomination);
            long count = remainingAmountInCents / denominationInCents;

            if (count > 0) {
                breakdown.add(new BreakdownItem(denomination, count));
                remainingAmountInCents = remainingAmountInCents - (count * denominationInCents);
            }
        }

        return breakdown;
    }

    public SortedSet<BreakdownItem> calculateBreakdownDifferences(final SortedSet<BreakdownItem> currentBreakdown,
            final SortedSet<BreakdownItem> previousBreakdown) {
        Map<Double, Long> currentMap = createDenominationMap(currentBreakdown);
        Map<Double, Long> previousMap = createDenominationMap(previousBreakdown);
        Set<Double> affectedDenominations = new HashSet<>();
        affectedDenominations.addAll(currentMap.keySet());
        affectedDenominations.addAll(previousMap.keySet());

        return createDifferencesSet(currentMap, previousMap, affectedDenominations);
    }

    private Map<Double, Long> createDenominationMap(final SortedSet<BreakdownItem> breakdown) {
        return breakdown.stream()
                .collect(Collectors.toMap(
                        BreakdownItem::getDenomination,
                        BreakdownItem::getCount));
    }

    private void validateAmount(final double amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
    }

    private long convertToCents(final double amount) {
        return Math.round(amount * CENTS_MULTIPLIER);
    }

    private SortedSet<BreakdownItem> createDifferencesSet(
            Map<Double, Long> currentMap,
            Map<Double, Long> previousMap,
            Set<Double> allDenominations) {

        SortedSet<BreakdownItem> differences = new TreeSet<>(COMPARATOR);

        for (Double denomination : allDenominations) {
            long currentCount = currentMap.getOrDefault(denomination, 0L);
            long previousCount = previousMap.getOrDefault(denomination, 0L);
            long difference = currentCount - previousCount;

            differences.add(new BreakdownItem(denomination, difference));
        }

        return differences;
    }
}