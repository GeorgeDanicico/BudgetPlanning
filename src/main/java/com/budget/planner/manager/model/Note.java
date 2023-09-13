package com.budget.planner.manager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "notes")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name="profile_id", nullable=false)
    private Profile profile;
}
