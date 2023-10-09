package com.budget.planner.manager.repository;

import com.budget.planner.manager.model.Book;
import com.budget.planner.manager.model.Profile;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BooksRepository extends JpaRepository<Book, Long> {
    List<Book> findByProfile(Profile profile);
    Optional<Book> findByIdAndProfile(Long id, Profile profile);
    @Transactional
    void deleteById(long id);
}
