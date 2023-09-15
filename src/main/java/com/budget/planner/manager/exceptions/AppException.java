package com.budget.planner.manager.exceptions;

public class AppException extends RuntimeException {
    private final String errorCode;
    private final String errorMessage;

    public AppException(String errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public AppException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.errorCode = "UNEXPECTED ERROR";
    }
}
