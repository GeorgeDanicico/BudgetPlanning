package com.budget.planner.manager.auth;

import com.budget.planner.manager.dto.responses.MessageResponse;
import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.NotesService;
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
public class NotesController {
    private static final Logger logger = LoggerFactory.getLogger(NotesController.class);
    private final NotesService notesService;
    private final ProfileRepository profileRepository;

    public NotesController(NotesService notesService, ProfileRepository profileRepository) {
        this.notesService = notesService;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/notes")
    ResponseEntity<?> getAllNotesForAuthenticatedUser() {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));
        List<Note> profileNotes = notesService.getAllNotesForAuthenticatedUser(authenticatedProfile);

        return new ResponseEntity<>(profileNotes, HttpStatus.OK);
    }
    @PostMapping("/notes")
    public ResponseEntity<?> addNoteForProfile(@Valid @RequestBody NoteRequest noteRequest) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        Note addedNote = notesService.addNote(authenticatedProfile, noteRequest.title(), noteRequest.description());
        return new ResponseEntity<>(new AddedNoteResponse(201, "Note added successfully", addedNote), HttpStatus.CREATED);
    }

    @PutMapping("/notes/{noteId}")
    public ResponseEntity<?> editNoteForProfile(@PathVariable @NotBlank Long noteId,
                                               @Valid @RequestBody NoteRequest noteRequest) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        notesService.editNote(authenticatedProfile, noteId, noteRequest.title(), noteRequest.description());
        return new ResponseEntity<>(new MessageResponse(200, "Note updated successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<?> deleteNoteFromProfile(@PathVariable @NotBlank Long noteId) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        notesService.deleteNote(authenticatedProfile, noteId);
        return new ResponseEntity<>(new MessageResponse(200, "Note deleted successfully"), HttpStatus.CREATED);
    }

    public record NoteRequest(String title, String description) {
    }

    public record AddedNoteResponse(int status, String message, Note note) {}

}

