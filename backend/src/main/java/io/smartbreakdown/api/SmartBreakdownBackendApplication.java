package io.smartbreakdown.api;

import io.smartbreakdown.resources.BreakdownResource;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("")
public class SmartBreakdownBackendApplication extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(BreakdownResource.class);
        return classes;
    }
}
