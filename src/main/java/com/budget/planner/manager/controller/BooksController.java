package com.budget.planner.manager.controller;

import com.budget.planner.manager.dto.responses.MessageResponse;
import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Book;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.BooksService;
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
public class BooksController {
    private static final Logger logger = LoggerFactory.getLogger(BooksController.class);
    private final BooksService booksService;
    private final ProfileRepository profileRepository;

    public BooksController(BooksService booksService, ProfileRepository profileRepository) {
        this.booksService = booksService;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/books")
    ResponseEntity<?> getAllBooksForAuthenticatedUser() {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));
        List<Book> profileBooks = booksService.getAllBooksForAuthenticatedUser(authenticatedProfile);

        return new ResponseEntity<>(profileBooks, HttpStatus.OK);
    }
    @PostMapping("/books")
    public ResponseEntity<?> addBookForProfile(@Valid @RequestBody BookRequest bookRequest) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        Book addedBook = booksService.addBook(authenticatedProfile, bookRequest.title(), bookRequest.author(), bookRequest.status());
        return new ResponseEntity<>(new AddedBookResponse(201, "Book added successfully", addedBook), HttpStatus.CREATED);
    }

    @PutMapping("/books/{bookId}/{status}")
    public ResponseEntity<?> editBookForProfile(@PathVariable @NotBlank Long bookId,
                                                @PathVariable @NotBlank String status) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        booksService.editBook(authenticatedProfile, bookId, status);
        return new ResponseEntity<>(new MessageResponse(200, "Book status updated successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/books/{bookId}")
    public ResponseEntity<?> deleteBookFromProfile(@PathVariable @NotBlank Long bookId) {
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Profile authenticatedProfile = profileRepository.findByUsername(authenticatedUsername).orElseThrow(() -> new AppException("400", "Invalid Authentication"));

        booksService.deleteBook(authenticatedProfile, bookId);
        return new ResponseEntity<>(new MessageResponse(200, "Book deleted successfully"), HttpStatus.CREATED);
    }

    public record BookRequest(String title, String author, String status) {
    }

    public record AddedBookResponse(int status, String message, Book book) {}

}

