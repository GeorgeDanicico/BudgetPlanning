package com.budget.planner.manager.service;

import com.budget.planner.manager.model.Profile;

public interface ProfileService {
    Long getLoggedUserId();
    Profile getLoggedProfile();
    String updateProfilePassword();
}
