package com.budget.planner.manager.repository;

import com.budget.planner.manager.model.Note;
import com.budget.planner.manager.model.Profile;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Note, Long> {
    List<Note> findByProfile(Profile profile);
    @Transactional
    void deleteById(long id);
}

