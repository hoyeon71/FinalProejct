package com.project.lumos.member.dto;

public class MemberRoleDTO {
   private int memberNo;
   private int authorityCode;   
   //복합키를 쓰기 때문에 int로도 authorityCode를 가지고 있고, 객체로도 하나를 더 만든다
   private AuthorityDTO authority; //다 대 일 관계기 때문에 List가 아닌 DTO : AuthorityDTO에 담긴 정보가 들어온 이 DTO 가 MeberDTO에 모두 담겨서 하나가 된다.

   public MemberRoleDTO() {
   }
   public MemberRoleDTO(int memberNo, int authorityCode, AuthorityDTO authority) {
      this.memberNo = memberNo;
      this.authorityCode = authorityCode;
      this.authority = authority;
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

   public AuthorityDTO getAuthority() {
      return authority;
   }

   public void setAuthority(AuthorityDTO authority) {
      this.authority = authority;
   }

   @Override
   public String toString() {
      return "MemberRoleDTO [memberNo=" + memberNo + ", authorityCode=" + authorityCode + ", authority=" + authority
            + "]";
   }
}
