package com.budget.planner.manager.security.services;

import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.ProfileRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService{
    private final ProfileRepository profileRepository;

    public UserService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }


    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return profileRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }
}
