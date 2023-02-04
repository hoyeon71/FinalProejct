package com.project.lumos.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.ResponseDTO;
import com.project.lumos.member.dto.MemberDTO;
import com.project.lumos.member.service.AuthService;
import com.project.lumos.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;


@RestController
@RequestMapping("/auth")

public class AuthController {
   private final AuthService authService;
   private final MemberService memberService;
   
   @Autowired
   public AuthController(AuthService authService, MemberService memberService) {
      this.authService = authService;
      this.memberService = memberService;
   }
   
   //=================================로그인[전진이]=========================================//
   @Operation(summary ="로그인 요청", description = "로그인 및 인증이 진행됩니다.", tags = {"AuthController"})
   @PostMapping("/login") //head가 아닌 body에 담겨오는 것은 post요청이다.
   //RequestBody 를 통해 RequestBody로 넘어온 Json 문자열을 파싱해서 MemberDTO속성으로 매핑해 객체로 받아내는 구문. (회원아이디, 비번)
   public ResponseEntity<ResponseDTO> login(@RequestBody MemberDTO memberDTO){ //.body()의 내용이 담긴 ResponseDTO를 ResponseEntity로 반환. .body에 담긴 것은 내장된 메세지 컨버터를 통해 json문자열로 바뀌어서 리액트도 알아들을 수 있게 간다.
      System.out.println("넘어온 회원가입 데이터: " + memberDTO);
      return ResponseEntity
            .ok()
            .body(new ResponseDTO(HttpStatus.OK, "˗ˋˏ 로그인 성공 ˎˊ˗", authService.login(memberDTO))); //status: 성공?실패?   body: 어떤데이터?
   }
   
   //=================================회원가입[전진이]=========================================//
   @Operation(summary ="회원가입 요청", description = "회원 가입이 진행됩니다.", tags = {"AuthController"})
   @PostMapping("/signup")
   public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO){//json으로 받으려고 RequestBody를 사용(내보낼 때도 이 객체 ResponseEntity<ResponseDTO>안의 body를 json문자열로 리액트에 보내줬지만, react도 백단에 json문자열 형태로 보내온다. 현재 로그인기능이므로 사용자가 입력한 로그인 정보가 json문자열로 넘어오게 된다.)
      System.out.println("넘어온 회원가입 데이터: " + memberDTO);
      return ResponseEntity
            .ok()
            .body(new ResponseDTO(HttpStatus.CREATED, "˗ˋˏ 회원가입 성공 ˎˊ˗", authService.signup(memberDTO)));
   }
   
   //=========================회원가입시 아이디 중복 체크[전진이]==============================//
   @Operation(summary = "아이디 중복 확인을 위한 회원 아이디 조회", description = "아이디가 조회됩니다.", tags = { "AuthController" })
   @GetMapping("/check")
   ////ResponseEntity라는 걸 컨트롤러에서 반환하면 화면단 리액트로 가는데 리액트에서 받는 정보는 body, header, status이다. 즉 ResponseEntity는 단순히 데이터만 보내는 것이 아니라 다른 정보와 상태값을 가진 객체이다. 
   public ResponseEntity<ResponseDTO> selectMemberId(@RequestParam String memberId) { //응답으로 변환 될 정보를 모두 담은 요소들을 객체로 만들어서 반환 (body, header, status)
      System.out.println("넘어온 회원: " + memberId);
      return ResponseEntity
            .ok()
            .body(new ResponseDTO(HttpStatus.OK, "조회 성공", authService.selectMyInfo(memberId)));
   }

}