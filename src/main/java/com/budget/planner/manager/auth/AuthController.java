package com.budget.planner.manager.auth;

import com.budget.planner.manager.dto.requests.LoginRequest;
import com.budget.planner.manager.dto.requests.RegisterRequest;
import com.budget.planner.manager.dto.responses.MessageResponse;
import com.budget.planner.manager.dto.responses.UserResponse;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.model.Role;
import com.budget.planner.manager.model.enums.ERole;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.repository.RoleRepository;
import com.budget.planner.manager.security.SessionService;
import com.budget.planner.manager.security.Token;
import jakarta.validation.Valid;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final ProfileRepository profileRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final SessionService sessionService;
    private final AuthenticationManager authenticationManager;

    public AuthController(ProfileRepository profileRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, SessionService sessionService, AuthenticationManager authenticationManager) {
        this.profileRepository = profileRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.sessionService = sessionService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Entered login method from the AuthController.");

        Profile profile = profileRepository.findByUsername(loginRequest.getUsername()).orElse(null);
        if (profile == null) {
            throw new RuntimeException("Error...");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        final SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        Token sessionToken = sessionService.createSession(authentication);
        // SecurityContextHolder.getContext().getAuthentication();
        try {
            UserResponse userResponse = new UserResponse(profile.getUsername(),
                    profile.getEmail(), sessionToken.getId());
            return ResponseEntity.ok(userResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if(profileRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken."));
        }

        if(profileRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken."));
        }

        Role userRole = roleRepository.findByName(ERole.USER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Profile profile = new Profile(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                userRole
        );
        profileRepository.save(profile);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}
