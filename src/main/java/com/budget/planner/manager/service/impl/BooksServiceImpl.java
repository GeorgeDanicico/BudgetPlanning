package com.budget.planner.manager.service.impl;

import com.budget.planner.manager.exceptions.AppException;
import com.budget.planner.manager.model.Book;
import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import com.budget.planner.manager.repository.BooksRepository;
import com.budget.planner.manager.repository.NotesRepository;
import com.budget.planner.manager.repository.ProfileRepository;
import com.budget.planner.manager.service.BooksService;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BooksServiceImpl implements BooksService {
    private static final Logger logger = LoggerFactory.getLogger(BooksServiceImpl.class);
    private final BooksRepository booksRepository;
    private final ProfileRepository profileRepository;

    public BooksServiceImpl(BooksRepository booksRepository, ProfileRepository profileRepository) {
        this.booksRepository = booksRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public Book addBook(Profile authenticatedProfile, String title, String author, String status) {
        logger.info("Add book with title: {}, author: {} and status: {}", title, author, status);
        if (StringUtils.isBlank(title)) {
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(author)) {
            throw new AppException("400", "Invalid Data Received");
        }

        if (StringUtils.isBlank(status)) {
            throw new AppException("400", "Invalid Data Received");
        }

        Book newBook = Book.builder().title(title)
                .author(author)
                .status(status)
                .profile(authenticatedProfile)
                .build();
        Book addedBook = booksRepository.save(newBook);
        logger.info("Book has been successfully added with title: {}, author: {}, status: {} by profile with id: {}",
                title, author, status, authenticatedProfile.getId());

        return addedBook;
    }

    @Override
    public void editBook(Profile authenticatedProfile, Long bookId, String status) {
        if (StringUtils.isBlank(status)) {
            throw new AppException("400", "Invalid Data Received");
        }

        Book currentBook = booksRepository.findByIdAndProfile(bookId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid book id"));
        currentBook.setStatus(status);
        booksRepository.save(currentBook);
        logger.info("Book with id {} has been successfully edited with new status: {} by profile with id: {}",
                bookId, status, authenticatedProfile.getId());
    }

    @Override
    public void deleteBook(Profile authenticatedProfile, Long noteId) {
        Book currentBook = booksRepository.findByIdAndProfile(noteId, authenticatedProfile).orElseThrow(() -> new AppException("400", "Invalid book id"));
        booksRepository.delete(currentBook);
        logger.info("Note with id: {} has been successfully delete by profile with id: {}", noteId, authenticatedProfile.getId());
    }

    @Override
    public List<Book> getAllBooksForAuthenticatedUser(Profile authenticatedProfile) {
        return booksRepository.findByProfile(authenticatedProfile);
    }
}
