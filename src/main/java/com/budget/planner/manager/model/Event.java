package com.budget.planner.manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "events")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
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

    @Column(
            name = "startTime",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String start;

    @Column(
            name = "endTime",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String end;

    @Column(
            name = "allDay",
            columnDefinition = "boolean",
            nullable = false
    )
    private Boolean allDay;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="profile_id", nullable=false)
    private Profile profile;
}
