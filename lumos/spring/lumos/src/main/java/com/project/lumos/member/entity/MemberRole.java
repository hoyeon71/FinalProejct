package com.project.lumos.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_MEMBER_ROLE")
//복합키 타입인 MemberRolePk.class 파일을 하나 따로 만들어야 그 타입으로 레포지토리를 만들 수가 있다. 
//레포지토리는 하나의 타입만 쓸 수 있기 때문. 복합키는 이 둘을 묶은 하나의 타입이라는 레포지토리를 만들어준다.
@IdClass(MemberRolePk.class) 
public class MemberRole {

   //MemberRole 엔티티는 복합키를 쓰기 때문에 id annotation 두 컬럼에 붙는다. 이에 클래스에 @IdClass로 그에 해당하는 타입을 지정
   @Id
   @Column(name = "MEMBER_CODE")
   private int memberNo;
   
   @Id
   @Column(name = "AUTHORITY_CODE")
   private int authorityCode;
   
   @ManyToOne
   @JoinColumn(name = "AUTHORITY_CODE", insertable = false, updatable = false)
   private Authority authority;

   public MemberRole() {
   }

   //두개만 초기화하는 생성자 생성
   public MemberRole(int memberNo, int authorityCode) {
      super();
      this.memberNo = memberNo;
      this.authorityCode = authorityCode;
   }


   public MemberRole(int memberNo, int authorityCode, Authority authority) {
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

   public Authority getAuthority() {
      return authority;
   }

   public void setAuthority(Authority authority) {
      this.authority = authority;
   }

   @Override
   public String toString() {
      return "MemberRole [memberNo=" + memberNo + ", authorityCode=" + authorityCode + ", authority=" + authority
            + "]";
   }
}