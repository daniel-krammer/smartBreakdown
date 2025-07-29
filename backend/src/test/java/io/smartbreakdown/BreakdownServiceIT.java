package io.smartbreakdown;

import static org.junit.jupiter.api.Assertions.assertEquals;

import jakarta.inject.Inject;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit5.ArquillianExtension;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.smartbreakdown.services.BreakdownService;

/**
 * Run integration tests with Arquillian to be able to test CDI beans
 */
@ExtendWith(ArquillianExtension.class)
public class  BreakdownServiceIT {

    @Deployment
    public static WebArchive createTestArchive() {
        return ShrinkWrap.create(WebArchive.class, "BreakdownServiceIT.war")
                .addClass(BreakdownService.class);
    }

    @Inject
    BreakdownService service;

    @Test
    public void testService() {
        String result = service.hello();
        assertEquals("Hello Dedalus :)", result);
    }
}