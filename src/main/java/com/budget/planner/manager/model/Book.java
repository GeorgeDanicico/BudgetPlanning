package com.budget.planner.manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "books")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Book {
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
            name = "atuhor",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String author;

    @Column(
            name = "status",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="profile_id", nullable=false)
    private Profile profile;
}

