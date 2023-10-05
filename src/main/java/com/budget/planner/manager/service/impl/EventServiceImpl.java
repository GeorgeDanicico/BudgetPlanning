package com.budget.planner.manager.service.impl;

import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Event;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.EventsRepository;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.EventService;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private static final Logger logger = LoggerFactory.getLogger(EventServiceImpl.class);
    private final EventsRepository eventsRepository;
    private final ProfileRepository profileRepository;

    public EventServiceImpl(EventsRepository eventsRepository, ProfileRepository profileRepository) {
        this.eventsRepository = eventsRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public List<Event> getAllEventsForAuthenticatedUser(Profile authenticatedProfile) {
        return eventsRepository.findByProfile(authenticatedProfile);
    }

    @Override
    public Event addEvent(Profile authenticatedProfile, String title, String description,
                          String start, String end, Boolean allDay, String eventColour) {
        logger.info("Add event with title: {}, description: {}, start: {}, end: {}, allDay: {}", title, description,
                start, end, allDay);

        if (StringUtils.isBlank(title)) {
            logger.error("Error: Invalid data for creating an event.");
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(description)) {
            logger.error("Error: Invalid data for creating an event.");
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(start)) {
            logger.error("Error: Invalid data for creating an event.");
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(end)) {
            logger.error("Error: Invalid data for creating an event.");
            throw new AppException("400", "Invalid Data Received");
        }

        if (allDay == null) {
            logger.error("Error: Invalid data for creating an event.");
            throw new AppException("400", "Invalid Data Received");
        }

        Event newEvent = Event.builder().title(title)
                .description(description)
                .profile(authenticatedProfile)
                .start(start)
                .end(end)
                .allDay(allDay)
                .eventColour(eventColour)
                .build();
        Event addedEvent = eventsRepository.save(newEvent);
        logger.info("Event has been successfully added.");

        return addedEvent;
    }

//    @Override
//    public void editEvent(Profile authenticatedProfile, Long noteId, String newTitle, String newDescription) {
//        if (StringUtils.isBlank(newTitle)) {
//            throw new AppException("400", "Invalid Data Received");
//        }
//
//        if (StringUtils.isBlank(newDescription)) {
//            throw new AppException("400", "Invalid Data Received");
//        }
//
//        Note currentNote = notesRepository.findByIdAndProfile(noteId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid note id"));
//        currentNote.setTitle(newTitle);
//        currentNote.setDescription(newDescription);
//        notesRepository.save(currentNote);
//        logger.info("Note with id {} has been successfully edited with new title: {} and new description: {} by profile with id: {}",
//                noteId, newTitle, newDescription, authenticatedProfile.getId());
//    }

    @Override
    public void deleteEvent(Profile authenticatedProfile, Long eventId) {
        Event currentEvent = eventsRepository.findByIdAndProfile(eventId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid note id"));
        eventsRepository.delete(currentEvent);
        logger.info("Event with id: {} has been successfully delete by profile with id: {}", eventId, authenticatedProfile.getId());
    }
}
