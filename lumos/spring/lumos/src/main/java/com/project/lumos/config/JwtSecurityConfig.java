package com.project.lumos.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.lumos.jwt.JwtFilter;
import com.project.lumos.jwt.TokenProvider;

//SecurityConfig에서 jwt토큰 방식을 쓰겠다는 설정을 했는데, 그 때 필요한 config파일이다.
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
   
   private final TokenProvider tokenProvider;
   
   @Autowired
   public JwtSecurityConfig(TokenProvider tokenProvider) {
      this.tokenProvider = tokenProvider;
   }
   
   @Override
   public void configure(HttpSecurity http) {
      JwtFilter customFilter = new JwtFilter(tokenProvider);                     // JwtFilter를 jwt패키지에 추가해야함            
      http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class); // JwtFilter를 Filterchain상에 추가
   }
   
}