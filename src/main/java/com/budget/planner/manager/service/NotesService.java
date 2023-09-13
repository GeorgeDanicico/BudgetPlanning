package com.budget.planner.manager.service;

public interface NotesService {
    boolean addNote(String title, String description);
    boolean editNote(Long noteId, String newTitle, String newDescription);
    boolean deleteNote(Long noteId);
}
