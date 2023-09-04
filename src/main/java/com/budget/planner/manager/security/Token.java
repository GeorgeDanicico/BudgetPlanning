package com.budget.planner.manager.security;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity(name = "Token")
@Table(
        name = "token"
)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Token {

    @Id
    @Column(name = "id")
    private String id; // its the session Id

    @NotNull
    private String jwtToken;

    @NotNull
    private Long sessionTtl;
}
