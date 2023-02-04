package com.project.lumos.review.dto;

public class ReviewAndImageDTO {

	private int imageCode;
	private String originNm;
	private String newNm;
	private int reviewCode;
	private ReviewDTO review;
	
	public ReviewAndImageDTO() {
		super();
	}

	public ReviewAndImageDTO(int imageCode, String originNm, String newNm, int reviewCode, ReviewDTO review) {
		this.imageCode = imageCode;
		this.originNm = originNm;
		this.newNm = newNm;
		this.reviewCode = reviewCode;
		this.review = review;
	}

	public int getImageCode() {
		return imageCode;
	}

	public void setImageCode(int imageCode) {
		this.imageCode = imageCode;
	}

	public String getOriginNm() {
		return originNm;
	}

	public void setOriginNm(String originNm) {
		this.originNm = originNm;
	}

	public String getNewNm() {
		return newNm;
	}

	public void setNewNm(String newNm) {
		this.newNm = newNm;
	}

	public int getReviewCode() {
		return reviewCode;
	}

	public void setReviewCode(int reviewCode) {
		this.reviewCode = reviewCode;
	}

	public ReviewDTO getReview() {
		return review;
	}

	public void setReview(ReviewDTO review) {
		this.review = review;
	}

	@Override
	public String toString() {
		return "ReviewAndImageDTO [imageCode=" + imageCode + ", originNm=" + originNm + ", newNm=" + newNm
				+ ", reviewCode=" + reviewCode + ", review=" + review + "]";
	}

	
	
	
}
