package io.smartbreakdown.resources;

import io.smartbreakdown.services.BreakdownService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/breakdown")
public class BreakdownResource {

    @Inject
    private BreakdownService service;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response sayHello() {
        String response = service.hello();
        return Response.ok(response).build();
    }
}
