package com.budget.planner.manager.controller;

import com.budget.planner.manager.dto.responses.MessageResponse;
import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Event;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.EventService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class EventsController {
    private static final Logger logger = LoggerFactory.getLogger(NotesController.class);
    private final EventService eventService;
    private final ProfileRepository profileRepository;

    public EventsController(EventService eventService, ProfileRepository profileRepository) {
        this.eventService = eventService;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/events")
    ResponseEntity<?> getAllEventsForAuthenticatedUser() {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));
        List<Event> profileEvents = eventService.getAllEventsForAuthenticatedUser(authenticatedProfile);

        return new ResponseEntity<>(profileEvents, HttpStatus.OK);
    }

    @PostMapping("/events")
    public ResponseEntity<?> addEventForProfile(@Valid @RequestBody EventRequest eventRequest) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        Event addedEvent = eventService.addEvent(authenticatedProfile, eventRequest.title(), eventRequest.description(),
                eventRequest.start(), eventRequest.end(), eventRequest.allDay(), eventRequest.eventColour());
        return new ResponseEntity<>(new AddedEventResponse(201, "Event created successfully", addedEvent), HttpStatus.CREATED);
    }

    @DeleteMapping("/events/{eventId}")
    public ResponseEntity<?> deleteEventFromProfile(@PathVariable @NotBlank Long eventId) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        eventService.deleteEvent(authenticatedProfile, eventId);
        return new ResponseEntity<>(new MessageResponse(200, "Event deleted successfully"), HttpStatus.CREATED);
    }

    private record EventRequest(String title, String description, String start, String end, Boolean allDay, String eventColour) {}

    private record AddedEventResponse(int status, String message, Event event) {}
}
