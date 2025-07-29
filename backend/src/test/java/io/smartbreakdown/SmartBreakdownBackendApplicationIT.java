package io.smartbreakdown;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.net.URL;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.Response;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit5.ArquillianExtension;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.smartbreakdown.api.SmartBreakdownBackendApplication;
import io.smartbreakdown.resources.BreakdownResource;
import io.smartbreakdown.services.BreakdownService;

/**
 * Run integration tests against the server and the deployed application.
 */
@RunAsClient
@ExtendWith(ArquillianExtension.class)
public class SmartBreakdownBackendApplicationIT {

    @Deployment
    public static WebArchive createTestArchive() {
        return ShrinkWrap.create(WebArchive.class, "BreakdownServiceIT.war")
                .addClass(SmartBreakdownBackendApplication.class)
                .addClass(BreakdownService.class)
                .addClass(BreakdownResource.class);
    }

    @ArquillianResource
    private URL deploymentUrl;

    @Test
    public void testHelloEndpoint() {
        try (Client client = ClientBuilder.newClient()) {
            Response response = client
                    .target(URI.create(deploymentUrl.toString()))
                    .path("/api/breakdown/")
                    .request()
                    .get();

            assertEquals(200, response.getStatus());
            assertEquals("Hello Dedalus :)", response.readEntity(String.class));
        }
    }
}
