package io.smartbreakdown.resources;

import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import comparators.BreakdownItemComparator;
import io.smartbreakdown.models.BreakdownCalculationRequest;
import io.smartbreakdown.models.BreakdownDifferenceRequest;
import io.smartbreakdown.models.BreakdownItem;
import io.smartbreakdown.services.BreakdownService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/breakdown")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BreakdownResource {

    @Inject
    private BreakdownService service;

    @POST
    @Path("/calculate")
    public List<BreakdownItem> calculateBreakdown(BreakdownCalculationRequest request) {
        SortedSet<BreakdownItem> result = service.calculateBreakdown(request.getAmount());
        return result.stream().toList();
    }

    @POST
    @Path("/calculate-difference")
    public List<BreakdownItem> calculateBreakdownDifference(BreakdownDifferenceRequest request) {
        SortedSet<BreakdownItem> currentBreakdownSet = new TreeSet<>(new BreakdownItemComparator());
        currentBreakdownSet.addAll(request.getCurrentBreakdown()    );

        SortedSet<BreakdownItem> previousBreakdownSet = new TreeSet<>(new BreakdownItemComparator());
        previousBreakdownSet.addAll(request.getPreviousBreakdown());

        SortedSet<BreakdownItem> result = service.calculateBreakdownDifferences(currentBreakdownSet, previousBreakdownSet);

        return result.stream().toList();
    }
}
