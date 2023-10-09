package com.budget.planner.manager.service;

import com.budget.planner.manager.model.Book;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;

import java.util.List;

public interface BooksService {
    Book addBook(Profile authenticatedProfile, String title, String description, String status);
    void editBook(Profile authenticatedProfile, Long bookId, String status);
    void deleteBook(Profile authenticatedProfile, Long bookId);
    List<Book> getAllBooksForAuthenticatedUser(Profile authenticatedProfile);
}
