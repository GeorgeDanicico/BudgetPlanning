package com.budget.planner.manager.service;

import com.budget.planner.manager.model.Event;
import com.budget.planner.manager.model.Profile;

import java.util.List;

public interface EventService {
    List<Event> getAllEventsForAuthenticatedUser(Profile authenticatedProfile);
    Event addEvent(Profile authenticatedProfile, String title, String description,
                   String start, String end, Boolean allDay, String eventColour);
    void deleteEvent(Profile authenticatedProfile, Long id);

}
