package com.budget.planner.manager.service.impl;

import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.NotesRepository;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.NotesService;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotesServiceImpl implements NotesService {
    private static final Logger logger = LoggerFactory.getLogger(NotesServiceImpl.class);
    private final NotesRepository notesRepository;
    private final ProfileRepository profileRepository;

    public NotesServiceImpl(NotesRepository notesRepository, ProfileRepository profileRepository) {
        this.notesRepository = notesRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public Note addNote(Profile authenticatedProfile, String title, String description) {
        logger.info("Add note with title: {} and description: {}", title, description);
        if (StringUtils.isBlank(title)) {
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(description)) {
            throw new AppException("400", "Invalid Data Received");
        }
       Note newNote = Note.builder().title(title)
                .description(description)
                .profile(authenticatedProfile)
                .build();
        Note addedNote = notesRepository.save(newNote);
        logger.info("Note has been successfully added with title: {} and description: {} by profile with id: {}",
                title, description, authenticatedProfile.getId());

        return addedNote;
    }

    @Override
    public void editNote(Profile authenticatedProfile, Long noteId, String newTitle, String newDescription) {
        if (StringUtils.isBlank(newTitle)) {
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(newDescription)) {
            throw new AppException("400", "Invalid Data Received");
        }

        Note currentNote = notesRepository.findByIdAndProfile(noteId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid note id"));
        currentNote.setTitle(newTitle);
        currentNote.setDescription(newDescription);
        notesRepository.save(currentNote);
        logger.info("Note with id {} has been successfully edited with new title: {} and new description: {} by profile with id: {}",
                noteId, newTitle, newDescription, authenticatedProfile.getId());
    }

    @Override
    public void deleteNote(Profile authenticatedProfile, Long noteId) {
        Note currentNote = notesRepository.findByIdAndProfile(noteId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid note id"));
        notesRepository.delete(currentNote);
        logger.info("Note with id: {} has been successfully delete by profile with id: {}", noteId, authenticatedProfile.getId());
    }

    @Override
    public List<Note> getAllNotesForAuthenticatedUser(Profile authenticatedProfile) {
        return notesRepository.findByProfile(authenticatedProfile);
    }
}
