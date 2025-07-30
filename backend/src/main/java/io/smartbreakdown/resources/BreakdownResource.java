package io.smartbreakdown.resources;

import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import comparators.BreakdownItemComparator;
import io.smartbreakdown.models.BreakdownItem;
import io.smartbreakdown.services.BreakdownService;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Path("/breakdown")
public class BreakdownResource {

    @Inject
    private BreakdownService service;

    @POST
    @Path("/calculate")
    public SortedSet<BreakdownItem> calculateBreakdown(final double amount) {
        return service.calculateBreakdown(amount);
    }

    @POST
    @Path("/calculate-difference")
    public SortedSet<BreakdownItem> calculateBreakdownDifference(final List<BreakdownItem> currentBreakdown,
            List<BreakdownItem> previousBreakdown) {
        SortedSet<BreakdownItem> currentBreakdownSet = new TreeSet<>(new BreakdownItemComparator());
        currentBreakdownSet.addAll(currentBreakdown);

        SortedSet<BreakdownItem> previousBreakdownSet = new TreeSet<>(new BreakdownItemComparator());
        previousBreakdownSet.addAll(previousBreakdown);

        return service.calculateBreakdownDifferences(currentBreakdownSet, previousBreakdownSet);
    }
}
