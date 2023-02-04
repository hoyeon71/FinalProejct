package com.project.lumos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.lumos.exception.dto.ApiExceptionDTO;

@RestControllerAdvice
public class ApiExceptionAdvice {
	
	//=================================로그인=================================//
	/* AuthService에서 비밀번호 불일치 시 발생하는 예외 상황 처리 */
	@ExceptionHandler(LoginFailedException.class)
	public ResponseEntity<ApiExceptionDTO> exceptionHandler(LoginFailedException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ApiExceptionDTO(HttpStatus.BAD_REQUEST, e.getMessage()));
	}
	
	// TokenProvider에서 토큰 유효성 검사용 메소드 정의 시 사용된다. 유효성 검사 메소드는 JwtFilter에서  토큰 유효성 검사 시 발생하는 예외 상황을 처리한다.
	@ExceptionHandler(TokenException.class)
	public ResponseEntity<ApiExceptionDTO> exceptionHandler(TokenException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiExceptionDTO(HttpStatus.UNAUTHORIZED, e.getMessage())); //reponseBody에 담아 응답을 보낸다.
				
	}
	
	//=================================회원가입===================================//
	/* 아이디 중복 시 발생하는 예외 사항 처리 */
	@ExceptionHandler(DuplicatedMemberIdException.class)
	public ResponseEntity<ApiExceptionDTO> exceptionHandler(DuplicatedMemberIdException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ApiExceptionDTO(HttpStatus.BAD_REQUEST, e.getMessage()));
				
	}
	
	/* 이메일 중복 시 발생하는 예외 사항 처리 */
	@ExceptionHandler(DuplicatedMemberEmailException.class)
	public ResponseEntity<ApiExceptionDTO> exceptionHandler(DuplicatedMemberEmailException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ApiExceptionDTO(HttpStatus.BAD_REQUEST, e.getMessage()));
				
	}
}