package com.budget.planner.manager.service.impl;

import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Long getLoggedUserId() {
        return null;
    }

    @Override
    public Profile getLoggedProfile() {
        return null;
    }

    @Override
    public String updateProfilePassword() {
        return null;
    }
}
