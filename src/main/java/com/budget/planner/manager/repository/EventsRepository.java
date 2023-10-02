package com.budget.planner.manager.repository;

import com.budget.planner.manager.model.Event;
import com.budget.planner.manager.model.Profile;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventsRepository extends JpaRepository<Event, Long> {
    List<Event> findByProfile(Profile profile);
    Optional<Event> findByIdAndProfile(Long id, Profile profile);
    @Transactional
    void deleteById(long id);
}