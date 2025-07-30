package io.smartbreakdown;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.SortedSet;
import java.util.TreeSet;

import org.junit.jupiter.api.Test;

import comparators.BreakdownItemComparator;
import io.smartbreakdown.models.BreakdownItem;
import io.smartbreakdown.services.BreakdownService;

public class BreakdownServiceTest {

    private final BreakdownService service = new BreakdownService();
    private final BreakdownItemComparator comparator = new BreakdownItemComparator();

    @Test
    public void testCalculateBreakdown_ShouldReturnCorrectBreakdown() {
        SortedSet<BreakdownItem> expectedBreakdown = createBreakdownSet(
                new BreakdownItem(100.0, 1),
                new BreakdownItem(20.0, 1),
                new BreakdownItem(2.0, 1),
                new BreakdownItem(1.0, 1));

        SortedSet<BreakdownItem> result = service.calculateBreakdown(123.0);
        assertEquals(expectedBreakdown, result);
    }

    @Test
    public void testCalculateBreakdown_ShouldHandleZero() {
        SortedSet<BreakdownItem> result = service.calculateBreakdown(0.0);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testCalculateBreakdown_ShouldHandleDecimalsCorrectly() {
        SortedSet<BreakdownItem> expectedBreakdown = createBreakdownSet(
                new BreakdownItem(0.5, 1),
                new BreakdownItem(0.2, 2),
                new BreakdownItem(0.05, 1),
                new BreakdownItem(0.02, 2));

        SortedSet<BreakdownItem> result = service.calculateBreakdown(0.99);
        assertEquals(expectedBreakdown, result);
    }

    @Test
    public void testCalculateBreakdown_ShouldThrowErrorForNegativeAmounts() {
        assertThrows(
                IllegalArgumentException.class,
                () -> service.calculateBreakdown(-1.0));
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldCalculateDifferencesWhenBothArraysHaveItems() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1),
                new BreakdownItem(5.0, 1));

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(100.0, 1),
                new BreakdownItem(20.0, 2),
                new BreakdownItem(10.0, 1));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, 1),
                new BreakdownItem(20.0, -1),
                new BreakdownItem(10.0, -1),
                new BreakdownItem(5.0, 1));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleEmptyPreviousBreakdown() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1));

        SortedSet<BreakdownItem> previous = createBreakdownSet();

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleEmptyCurrentBreakdown() {
        SortedSet<BreakdownItem> current = createBreakdownSet();

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, -2),
                new BreakdownItem(20.0, -1));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);

        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleBothEmptySets() {
        SortedSet<BreakdownItem> current = createBreakdownSet();

        SortedSet<BreakdownItem> previous = createBreakdownSet();

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleNoDifferences() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1));

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, 1));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, 0),
                new BreakdownItem(20.0, 0));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandlePartialOverlapOfDenominations() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(100.0, 1),
                new BreakdownItem(50.0, 2),
                new BreakdownItem(10.0, 1));

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(50.0, 1),
                new BreakdownItem(20.0, 2),
                new BreakdownItem(5.0, 1));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, 1),
                new BreakdownItem(50.0, 1),
                new BreakdownItem(20.0, -2),
                new BreakdownItem(10.0, 1),
                new BreakdownItem(5.0, -1));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleDecimalDenominations() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(0.5, 2),
                new BreakdownItem(0.2, 1),
                new BreakdownItem(0.05, 1));

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(0.5, 1),
                new BreakdownItem(0.1, 2));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(0.5, 1),
                new BreakdownItem(0.2, 1),
                new BreakdownItem(0.1, -2),
                new BreakdownItem(0.05, 1));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    @Test
    public void testCalculateBreakdownDifferences_ShouldHandleMixedPositiveAndNegativeDifferences() {
        SortedSet<BreakdownItem> current = createBreakdownSet(
                new BreakdownItem(100.0, 5),
                new BreakdownItem(20.0, 0),
                new BreakdownItem(10.0, 2));

        SortedSet<BreakdownItem> previous = createBreakdownSet(
                new BreakdownItem(100.0, 3),
                new BreakdownItem(20.0, 2),
                new BreakdownItem(10.0, 2));

        SortedSet<BreakdownItem> expectedDifference = createBreakdownSet(
                new BreakdownItem(100.0, 2),
                new BreakdownItem(20.0, -2),
                new BreakdownItem(10.0, 0));

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(current, previous);
        assertEquals(expectedDifference, result);
    }

    private SortedSet<BreakdownItem> createBreakdownSet(final BreakdownItem... items) {
        SortedSet<BreakdownItem> set = new TreeSet<>(comparator);
        set.addAll(Arrays.asList(items));
        return set;
    }
}