package com.project.lumos.common;

import org.springframework.http.HttpStatus;
//응답 body에 담길 객체이다(json문자열이 될 객체)
//응답이 예외가 발생하지않고 발생하면 react가 status, message, data속성을 가진 json문자열을 받게 됨. 
//그 안에 객체에 접근해서 data를 뽑고싶으면 리액트에서 .data로 해서 뽑는다.
public class ResponseDTO {

   private int status;      //상태코드값
   private String message; //응답 메세지
   private Object data;   //응답 데이터
   
   public ResponseDTO() {
   }
   //이 때 매개변수 생성자에서 status는 HttpStatus.OK를 받을 때 int 가 아니라, HttpStatus로 받아야 함
   public ResponseDTO(HttpStatus status, String message, Object data) { 
      this.status = status.value(); // HttpStatus enum 타입에서 value라는 int형 상태 코드 값만 추출
      this.message = message;
      this.data = data;
   }
   
   public int getStatus() {
      return status;
   }
   
   public void setStatus(int status) {
      this.status = status;
   }
   
   public String getMessage() {
      return message;
   }
   
   public void setMessage(String message) {
      this.message = message;
   }
   
   public Object getData() {
      return data;
   }
   
   public void setData(Object data) {
      this.data = data;
   }
   
   @Override
   public String toString() {
      return "ResponseDTO [status=" + status + ", message=" + message + ", data=" + data + "]";
   }
   
}