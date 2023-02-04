package com.project.lumos.member.entity;

import java.io.Serializable;

// 복합키용 타입.  복합키용 타입을 만들 땐 직렬화 필수
public class MemberRolePk implements Serializable {

   private int memberNo;
   private int authorityCode;
   
   public MemberRolePk() {
   }
   public MemberRolePk(int memberNo, int authorityCode) {
      this.memberNo = memberNo;
      this.authorityCode = authorityCode;
   }
   
   public int getMemberNo() {
      return memberNo;
   }
   public void setMemberNo(int memberNo) {
      this.memberNo = memberNo;
   }
   public int getAuthorityCode() {
      return authorityCode;
   }
   public void setAuthorityCode(int authorityCode) {
      this.authorityCode = authorityCode;
   }
   
   @Override
   public String toString() {
      return "MemberRolePk [memberNo=" + memberNo + ", authorityCode=" + authorityCode + "]";
   }
}
   
