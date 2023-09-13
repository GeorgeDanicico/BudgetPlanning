package com.budget.planner.manager.service.impl;

import com.budget.planner.manager.service.NotesService;
import io.micrometer.common.util.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class NotesServiceImpl implements NotesService {
    @Override
    public boolean addNote(String title, String description) {
        if (!StringUtils.isBlank(title)) {
            throw new
        }
        return false;
    }

    @Override
    public boolean editNote(Long noteId, String newTitle, String newDescription) {
        return false;
    }

    @Override
    public boolean deleteNote(Long noteId) {
        return false;
    }
}
