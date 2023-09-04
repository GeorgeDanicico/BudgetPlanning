package com.budget.planner.manager.security;

import com.budget.planner.manager.model.enums.ERole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.vavr.control.Try;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class SessionService {
    private static final Logger logger = LoggerFactory.getLogger(SessionService.class);

    @Value("${token.signing.key}")
    private String jwtSigningKey;
    @Value("${token.expiration.time}")
    private Long sessionTtl;

    private final TokenRepository tokenRepository;

    public SessionService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Optional<Token> retrieveSessionToken(String sessionId) {
        return tokenRepository.findById(sessionId);
    }

    public Token createSession(Authentication authentication) {
        if (!authentication.isAuthenticated()) {
            throw new RuntimeException("Spring Security authentication failed.");
        }

        final var sessionId = UUID.randomUUID().toString();
        final var jwt = this.generateToken(authentication.getName(), sessionId);

        Token token = Token.builder()
                .id(sessionId)
                .jwtToken(jwt)
                .sessionTtl(sessionTtl)
                .build();
        tokenRepository.save(token);

        return token;
    }

    public Optional<Authentication> getAuthenticationForSession(Token sessionToken) {
        Claims claims = this.extractAllClaims(sessionToken.getJwtToken());
        List<SimpleGrantedAuthority> role = Collections.singletonList(new SimpleGrantedAuthority(claims.get("USER").toString()));
        return Optional.of(new UsernamePasswordAuthenticationToken(claims.getSubject(), null, role));
    }

    public void deleteSession(String sessionId) {
        tokenRepository.deleteById(sessionId);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(
            String username,
            String sessionId) {
        var claims = Jwts.claims().setSubject(username).setId(sessionId);
        claims.put("USER", "USER");

        return Jwts
                .builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 36000000))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}