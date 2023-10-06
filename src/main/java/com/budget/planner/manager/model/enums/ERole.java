package com.budget.planner.manager.model.enums;

public enum ERole {
    USER("USER"),
    ADMIN("ADMIN");

    public final String label;

    private ERole(String label) {
        this.label = label;
    }
}