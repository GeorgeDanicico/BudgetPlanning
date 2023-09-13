package com.budget.planner.manager.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "Profile")
@Table(
        name = "profile",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_profile_email",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "uk_profile_username",
                        columnNames = "username"
                )
        }
)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Profile implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    @Column(
            name = "username",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String username;

    @Column(
            name = "email",
            columnDefinition = "varchar(50)",
            nullable = false
    )
    private String email;

    @Column(
            name = "password",
            columnDefinition = "varchar(200)",
            nullable = false
    )
    private String password;

    @ManyToOne
    @JoinColumn(name="role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "profile")
    private Set<Note> notes;

    public Profile(
            String username,
            String email,
            String password,
            Role role
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName().name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
