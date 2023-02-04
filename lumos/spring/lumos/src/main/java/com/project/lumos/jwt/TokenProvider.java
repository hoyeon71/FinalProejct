package com.project.lumos.jwt;

import java.security.Key;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.project.lumos.exception.TokenException;
import com.project.lumos.member.dto.TokenDTO;
import com.project.lumos.member.entity.Member;
import com.project.lumos.member.entity.MemberRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/* 토큰 생성, 토큰 인증(Authentication 객체 반환), 토큰 유효성 검사 */
@Component
public class TokenProvider {
   
   private static final Logger log = LoggerFactory.getLogger(TokenProvider.class);
   private static final String AUTHORITIES_KEY = "auth";
   private static final String BEARER_TYPE = "Bearer";
   private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 120;   // 120분(ms 단위)
   
   private final UserDetailsService userDetailsService;
   
   private final Key key;

   public TokenProvider(@Value("${jwt.secret}")String secretKey, 
                                    UserDetailsService userDetailsService) {
      this.userDetailsService = userDetailsService;
      byte[] keyBytes = Decoders.BASE64.decode(secretKey);
      this.key = Keys.hmacShaKeyFor(keyBytes);
   }
   
   /* 1. 토큰 생성 메소드 */
   public TokenDTO generateTokenDTO(Member member) { // DB에서 해당 아이디에 맞는 멤버의 정보가 넘어옴
      log.info("[TokenProvider] generateTokenDTO Start=================================");
      
      List<String> roles = new ArrayList<>();                     // 멤버의 정보를 쌓음
      for(MemberRole memberRole : member.getMemberRole()) {       // 멤버가 가진 멤버 권한,
         roles.add(memberRole.getAuthority().getAuthorityName()); // 권한 이름까지 넣는다. 
      }
      
      log.info("[TokenProvider] {}", roles); 
      
      /* 1. 회원 아이디를 "sub"이라는 클레임으로 토큰에 추가 */
      Claims claims = Jwts.claims().setSubject(member.getMemberId());
      /* 2. 회원의 권한들을 "auth"라는 클레임으로 토큰에 추가 */
      claims.put(AUTHORITIES_KEY, roles);
      
      long now = System.currentTimeMillis();
      
      Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
      String accessToken = Jwts.builder()
                         .setClaims(claims)                     // 위에서 뽑은 권한 roles, 아이디 sub이 담긴 클레임
                         .setExpiration(accessTokenExpiresIn)       /* 3. 토큰의 만료 기간을 DATE형으로 토큰에 추가("exp"라는 클레임으로 long 형으로 토큰에 추가) */
                         .signWith(key, SignatureAlgorithm.HS512)    //HS512 방식으로 암호화, 비밀키 key는 base64를 통해 생성
                         .compact();                         //토큰 발행 -> accessToken이 된다.

      log.info("[TokenProvider] generateTokenDTO End=================================");
      
      return new TokenDTO(BEARER_TYPE, member.getMemberName(), accessToken,
                     accessTokenExpiresIn.getTime());
   }
   
   /* 2. 토큰의 등록된 클레임의 subject에서 해당 회원의 아이디를 추출 */
   public String getUserId(String token) {
      return Jwts.parserBuilder()
               .setSigningKey(key).build()
               .parseClaimsJws(token)
               .getBody()               // payload의 Claims 추출 
               .getSubject();            // Claim중에 등록 클레임에 해당하는 sub값 추출(회원 아이디)
   }
   
   /* 3. AccessToken으로 인증 객체 추출 */
   public Authentication getAuthentication(String token) {
      
      log.info("[TokenProvider] getAuthentication Start=================================");
      
      /*아래 5번에서 만든 메소드를 통해 토큰에서 claim들 추출(토큰 복호화) */
      Claims claims = parseClaims(token);   
      
      if (claims.get(AUTHORITIES_KEY) == null) {
         throw new RuntimeException("권한 정보가 없는 토큰입니다.");
      }
      
      /* 클레임에서 권한 정보 가져오기 */
      Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(",")) //AUTHORITIES_KEY가 위에서 “auth”라고 했으므로 페이로드의 auth클레임에 담긴 값이 나온다.
                  .map(role -> new SimpleGrantedAuthority(role))             //문자열 배열에 들어있는 권한 문자열 마다 SimpleGrantedAuthority객체로 만든다.         
                  .collect(Collectors.toList());                      //List<SimpleGrantedAuthority>로 만든다.         
      
      log.info("[TokenProvider] authorities {}", authorities);
      
      UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
            
      log.info("[TokenProvider] getAuthentication End=================================");
      return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());   //아이디, 패스워드, 권한   (로그인이 아니라서 패스워드가 필요없다. 인증만 하면 된다)
   }
   
   /* 4. 토큰 유효성 검사 */
   //JwtFilter에서 if로 유효한지 안한지를 알려주므로 boolean으로 반환값을 쓴다. 
   public boolean validateToken(String token) {
      try {
         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
         return true;
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         log.info("[TokenProvider] 잘못된 JWT 서명입니다.");
         throw new TokenException("잘못된 JWT 서명입니다.");
      } catch (ExpiredJwtException e) {
         log.info("[TokenProvider] 만료된 JWT 토큰입니다.");
         throw new TokenException("만료된 JWT 토큰입니다.");
      } catch (UnsupportedJwtException e) {
         log.info("[TokenProvider] 지원되지 않는 JWT 토큰입니다.");
         throw new TokenException("지원되지 않는 JWT 토큰입니다.");
      } catch (IllegalArgumentException e) {
         log.info("[TokenProvider] JWT 토큰이 잘못되었습니다.");
         throw new TokenException("JWT 토큰이 잘못되었습니다.");
      }
      
   }
   
   /* 5. AccessToken에서 클레임 추출하는 메소드 */
   private Claims parseClaims(String token) {                                           //토큰이 넘어오면
      try {
         return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody(); // 페이로드 안의 클레임들이 나오게 된다.
      } catch (ExpiredJwtException e) {
         return e.getClaims(); // 토큰 만료로 예외 발생 시에도 클레임값을 뽑을 수 있게 만들었다.
      }
   }
}