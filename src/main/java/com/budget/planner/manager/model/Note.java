package com.budget.planner.manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "notes")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long id;

    @Column(
            name = "title",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String title;

    @Column(
            name = "description",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="profile_id", nullable=false)
    private Profile profile;
}
