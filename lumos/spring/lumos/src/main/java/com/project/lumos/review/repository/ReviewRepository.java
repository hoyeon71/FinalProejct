package com.project.lumos.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.lumos.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	long countByPdCode(int pdCode);
	
	@Query(value = "SELECT MAX(REVIEW_CODE) FROM TBL_REVIEW", nativeQuery = true)
	int findMaxReviewCode();
	
	Review findByReviewCode(int reviewCode);

	long countByMemberCode(int memberCode);

	Page<Review> findByMemberCode(Integer valueOf, Pageable paging);

}
