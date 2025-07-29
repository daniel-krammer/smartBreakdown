package io.smartbreakdown.services;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BreakdownService {

    public String hello() {
        return "Hello Dedalus :)";
    }
}