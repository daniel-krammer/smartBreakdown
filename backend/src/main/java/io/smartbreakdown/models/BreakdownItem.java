package io.smartbreakdown.models;

import java.util.Objects;

public class BreakdownItem {
    private double denomination;
    private long count;

    public BreakdownItem() {
    }

    public BreakdownItem(double denomination, long count) {
        this.denomination = denomination;
        this.count = count;
    }

    public double getDenomination() {
        return denomination;
    }

    public void setDenomination(double denomination) {
        this.denomination = denomination;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "BreakdownItem {" +
                "denomination=" + denomination +
                ", count=" + count +
                '}';
    }

    @Override
    public boolean equals(Object objectToCompare) {
        if (this == objectToCompare) {
            return true;
        }
        BreakdownItem breakdownItemToCompare = (BreakdownItem) objectToCompare;
        return Double.compare(breakdownItemToCompare.denomination, denomination) == 0
                && count == breakdownItemToCompare.count;
    }

    @Override
    public int hashCode() {
        return Objects.hash(denomination, count);
    }
}