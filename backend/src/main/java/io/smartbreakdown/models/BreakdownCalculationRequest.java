package io.smartbreakdown.models;

public class BreakdownCalculationRequest {
    private double amount;

    public BreakdownCalculationRequest() {}

    public BreakdownCalculationRequest(double amount) {
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}