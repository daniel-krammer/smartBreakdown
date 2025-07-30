package io.smartbreakdown.models;

import java.util.List;

public class BreakdownDifferenceRequest {
    private List<BreakdownItem> currentBreakdown;
    private List<BreakdownItem> previousBreakdown;

    public BreakdownDifferenceRequest() {
    }

    public BreakdownDifferenceRequest(List<BreakdownItem> currentBreakdown, List<BreakdownItem> previousBreakdown) {
        this.currentBreakdown = currentBreakdown;
        this.previousBreakdown = previousBreakdown;
    }

    public List<BreakdownItem> getCurrentBreakdown() {
        return currentBreakdown;
    }

    public void setCurrentBreakdown(List<BreakdownItem> currentBreakdown) {
        this.currentBreakdown = currentBreakdown;
    }

    public List<BreakdownItem> getPreviousBreakdown() {
        return previousBreakdown;
    }

    public void setPreviousBreakdown(List<BreakdownItem> previousBreakdown) {
        this.previousBreakdown = previousBreakdown;
    }
}
