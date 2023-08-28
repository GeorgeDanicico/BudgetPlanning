package com.budget.planner.manager.dto.responses;

import lombok.Data;
import lombok.Getter;

@Getter
public class MessageResponse {
    private final String message;

    public MessageResponse(String msg) {
        this.message = msg;
    }

}
