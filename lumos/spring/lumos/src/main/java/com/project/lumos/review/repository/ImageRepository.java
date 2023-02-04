package com.project.lumos.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.review.dto.ImageDTO;
import com.project.lumos.review.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer>{

	Image findByNewNm(int reviewCode);

	Image findByReviewCode(int reviewCode);



}
