package com.budget.planner.manager.dto.responses;

import lombok.Data;
import lombok.Getter;

@Getter
public class MessageResponse {
    private final String message;
    private final Integer status;

    public MessageResponse(Integer status, String msg) {
        this.status = status;
        this.message = msg;
    }
}
