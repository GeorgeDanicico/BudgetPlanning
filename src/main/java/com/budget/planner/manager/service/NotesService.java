package com.budget.planner.manager.service;

import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;

import java.util.List;

public interface NotesService {
    Note addNote(Profile authenticatedProfile, String title, String description);
    void editNote(Profile authenticatedProfile, Long noteId, String newTitle, String newDescription);
    void deleteNote(Profile authenticatedProfile, Long noteId);
    List<Note> getAllNotesForAuthenticatedUser(Profile authenticatedProfile);
}
