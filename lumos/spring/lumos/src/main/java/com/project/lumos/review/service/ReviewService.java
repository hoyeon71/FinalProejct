package com.project.lumos.review.service;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.lumos.common.Criteria;
import com.project.lumos.member.entity.Member;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.review.dto.ImageDTO;
import com.project.lumos.review.dto.ReviewAndMemberDTO;
import com.project.lumos.review.dto.ReviewDTO;
import com.project.lumos.review.dto.ReviewImageMemberDTO;
import com.project.lumos.review.entity.Image;
import com.project.lumos.review.entity.Review;
import com.project.lumos.review.entity.ReviewAndMember;
import com.project.lumos.review.entity.ReviewImageMember;
import com.project.lumos.review.repository.ImageRepository;
import com.project.lumos.review.repository.ReviewAndImageRepository;
import com.project.lumos.review.repository.ReviewAndMemberRepository;
import com.project.lumos.review.repository.ReviewImageMemberRepository;
import com.project.lumos.review.repository.ReviewRepository;
import com.project.lumos.util.FileUploadUtils;

@Service
public class ReviewService {
	
	private static final Logger log = LoggerFactory.getLogger(ReviewService.class);
	private final ModelMapper modelMapper;
	private final ReviewRepository reviewRepository;
	private final ReviewAndMemberRepository reviewAndMemberRepository;
	private final ReviewAndImageRepository reviewAndImageRepository;
	private final ImageRepository imageRepository;
	private final MemberRepository memberRepository;
	private final ReviewImageMemberRepository reviewImageMemberRepository;
	
	@Value("${image.image-dir-review}")
	private String IMAGE_DIR;
	@Value("${image.image-url-review}")
	private String IMAGE_URL;
	
	@Autowired
	public ReviewService(ModelMapper modelMapper, ReviewRepository reviewRepository, ReviewAndMemberRepository reviewAndMemberRepository, ReviewAndImageRepository reviewAndImageRepository, ImageRepository imageRepository, MemberRepository memberRepository, ReviewImageMemberRepository reviewImageMemberRepository) {
		this.modelMapper = modelMapper;
		this.reviewRepository = reviewRepository;
		this.reviewAndMemberRepository = reviewAndMemberRepository;
		this.reviewAndImageRepository = reviewAndImageRepository;
		this.imageRepository = imageRepository;
		this.memberRepository = memberRepository;
		this.reviewImageMemberRepository = reviewImageMemberRepository;
		
	}
	
	@Transactional
	public Object insertProductReview(int memberCode, ReviewDTO reviewDTO, ImageDTO imageDTO, MultipartFile reviewImage) {
		log.info("[ReviewService] insertProductReview Start ====================");
		log.info("[ReviewService] ImageDTO: " + imageDTO);
		log.info("[ReviewService] MultipartFile: " + reviewImage);
		
		String imageName = UUID.randomUUID().toString().replace("-", "");
		String replaceFileName = null;
		int result = 0;
		
		int maxReviewCode = reviewRepository.findMaxReviewCode();
		
		java.util.Date now = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
		String uploadDate = sdf.format(now);
		reviewDTO.setUploadDate(uploadDate);
//		reviewDTO.setPdCode(pdCode);
		reviewDTO.setMemberCode(memberCode);
		
		log.info("[ProductService] insert Image Name: ", imageName);
		
		try {
			log.info("[ProductService] insert Image Name: ", imageDTO);
			
			Review review = modelMapper.map(reviewDTO, Review.class);
			
			log.info("[ProductService] review: ", review);
			
			reviewRepository.save(review);
			
			int reviewCode = maxReviewCode + 1;
			
			if(reviewImage != null) {
				replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, reviewImage);
				
				imageDTO.setNewNm(replaceFileName);
				imageDTO.setOriginNm((reviewImage).getResource().getFilename());
				imageDTO.setReviewCode(reviewCode);
				Image image = modelMapper.map(imageDTO, Image.class);
				imageRepository.save(image);
			
				log.info("[ProductService] image: ", reviewImage);
				log.info("[ProductService] image: ", replaceFileName);
				
			}
			
			log.info("[ReviewService] insertProductReview End =======================");
			
			result = 1;
		} catch (Exception e) {
			FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
			throw new RuntimeException(e);
//			log.info("[review insert] Exception!!");
		}
		
		return (result > 0) ? "리뷰 입력 성공" : "리뷰 입력 실패";
		
	}
	
	public long selectReviewTotal(int pdCode) {
		log.info("[ReviewService] selectReviewTotal Start =====================");
		
		long result = reviewRepository.countByPdCode(pdCode);
		log.info("[ReviewService] result: {} ", result);
		
		log.info("[ReviewService] selectReviewTotal End=========================");
		
		return result;
	}
	
	/* 상품 리뷰 리스트 */
	public Object selectReviewListWithPaging(Criteria cri) {
		log.info("[ReviewService] selectReviewListWithPaging Start ====================");
		
		int index = cri.getPageNum() - 1;
		int count = cri.getAmount();
		Pageable paging = PageRequest.of(index, count, Sort.by("reviewCode"));
		
		Page<ReviewAndMember> result = reviewAndMemberRepository.findByPdCode(Integer.valueOf(cri.getSearchValue()), paging);
		List<ReviewAndMember> reviewList = (List<ReviewAndMember>)result.getContent();
		Member member = (result.getContent()).get(0).getMember();
		
		for ( ReviewAndMember test : reviewList) {
			log.info("test: {}", test.getMember());
			
		}
		
		log.info("member: {}", member);
		log.info("[ReviewService] reviewList: " + reviewList);
		log.info("[ReviewService] selectReviewListWithPaging End ======================");
		
		return reviewList.stream().map(review -> modelMapper.map(review, ReviewAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	/* 내 리뷰 리스트 */
	public Object selecMytReviewListWithPaging(Criteria cri) {
		log.info("[ReviewService] selecMytReviewListWithPaging Start ====================");
		
		int index = cri.getPageNum() -1;
		int count = cri.getAmount();
		Pageable paging = PageRequest.of(index, count, Sort.by("reviewCode"));
		
		Page<Review> result = reviewRepository.findByMemberCode(Integer.valueOf(cri.getSearchValue()), paging);
		List<Review> reviewList = (List<Review>)result.getContent();
//		Member member = (result.getContent()).get(1).getMember();
		
//		for ( ReviewAndMember test : reviewList) {
//			log.info("test: {}", test.getMember());
//			
//		}
		
//		log.info("member: {}", member);
		log.info("[ReviewService] reviewList: " + reviewList);
		log.info("[ReviewService] selectReviewListWithPaging End ======================");
		
		return reviewList.stream().map(review -> modelMapper.map(review, ReviewDTO.class)).collect(Collectors.toList());
	}
	
	public Object selectReviewDetail(int reviewCode) {
		log.info("[ReviewService] geteReviewDetail Start ==========================");
		
//		Review review = reviewRepository.findById(reviewCode).get();
//		
//		log.info("[ReviewService] review: " + review);
//		
//		String image = imageRepository.findByReviewCode(reviewCode).getNewNm();
//		
//		log.info("[ReviewService] image: " + image);
		
		ReviewImageMember reviewImageMember = reviewImageMemberRepository.findById(reviewCode).get();
		log.info("[ReviewService] reviewImageMember: " + reviewImageMember);
		
		ReviewImageMemberDTO reviewImageMemberDTO = modelMapper.map(reviewImageMember, ReviewImageMemberDTO.class);
		log.info("[ReviewService] reviewImageMemberDTO: " + reviewImageMemberDTO);
		
		Image reviewImage = imageRepository.findByReviewCode(reviewCode); 
		log.info("[ReviewService] reviewImage: " + reviewImage);
		
		
//		if(reviewImage != null) {
		
//		reviewImage.setNewNm(IMAGE_URL + image); 
		
//		log.info("[ReviewService] reviewImageMember: " + reviewImageMember);
//		ReviewAndMember review = reviewAndMemberRepository.findById(reviewCode).get();
//		
//		log.info("[ReviewService] review: " + review);
//		
//		Image image = imageRepository.findByReviewCode(reviewCode);
//		
//		log.info("[ReviewService] image: " + image);
//		
//		reviewAndImage.setNewNm(IMAGE_URL + reviewAndImage.getNewNm());
//		image.setNewNm(IMAGE_URL + image.getNewNm()); 
//		review.setReviewCode(image.getReviewCode());
//		review.setReviewCode = image.setReviewCode(reviewCode);
//		
//		log.info("[ReviewService] image: " + image);
//		log.info("[ReviewService] review: " + review);
		Map<String, Object> reviewMap = new HashMap<>();
		
		if(reviewImage != null) {
		ImageDTO imageDTO = modelMapper.map(reviewImage, ImageDTO.class);
		imageDTO.setNewNm(IMAGE_URL + reviewImage.getNewNm());
		log.info("[ReviewService] imageDTO: " + imageDTO);
		reviewMap.put("imageDTO", imageDTO);
		log.info("[ReviewService] imageDTOreviewMap: " + reviewMap);
		}
		
//		reviewImageMemberDTO.setImage(imageDTO);
		
//		}
		reviewMap.put("reviewImageMemberDTO", reviewImageMemberDTO);
		log.info("[ReviewService] reviewImageMemberDTOreviewMap: " + reviewMap);
		
		log.info("[ReviewService] getReviewDetail End ==============================");
		return reviewMap;
	}

	@Transactional
	public Object updateProductReview(ReviewDTO reviewDTO, MultipartFile reviewImage, ImageDTO imageDTO) {
		
		log.info("[ReviewService] reviewUpdate start ====================================");
		log.info("[ReviewService] reviewDTO:" + reviewDTO);
		log.info("[ReviewService] reviewImage:" + reviewImage);
		Review review = reviewRepository.findByReviewCode(reviewDTO.getReviewCode());
		log.info("[ReviewService] review : {}", review);
		
		log.info("[ReviewService] imageDTO:" + imageDTO);
		Image image = imageRepository.findByReviewCode(imageDTO.getReviewCode());
		log.info("[ReviewService] image : {}", image);
		
		reviewDTO.setPdCode(review.getPdCode());
		reviewDTO.setUploadDate(review.getUploadDate());
		reviewDTO.setReviewComment(review.getReviewComment());
		reviewDTO.setMemberCode(review.getMemberCode());
		
		
		
		String oriImage = "";
		if( image != null) { 
			oriImage = image.getNewNm();
		}
		log.info("[ReviewService] oriImage: " + oriImage);
		log.info("[ReviewService] updateReview Start ===============================");
		log.info("[ReviewService] reviewDTO: " + reviewDTO);
		
		String replaceFileName = null;
		int result = 0;
		
		try {
			
			Review updateReview = modelMapper.map(reviewDTO, Review.class);
			
			reviewRepository.save(updateReview);
			
			
			review.setReviewTitle(reviewDTO.getReviewTitle());
			review.setPdGrade(reviewDTO.getPdGrade());
			review.setReviewContent(reviewDTO.getReviewContent());
			log.info("ReviewService] update review: " + review);
			
			if(reviewImage != null) {
				
				
				String imageName = UUID.randomUUID().toString().replace("-", "");
				replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, reviewImage);
				log.info("[updateReview] InsertFileName : " + replaceFileName);
				
				imageDTO.setNewNm(replaceFileName);
				imageDTO.setOriginNm((reviewImage).getResource().getFilename());
				imageDTO.setReviewCode(review.getReviewCode());
				
				
				Image updateImage = modelMapper.map(imageDTO, Image.class);
				
				if ( image == null) {
				imageRepository.save(updateImage);
				}
				
				if( image != null) { 
				image.setNewNm(replaceFileName);
				log.info("[update] image:" + image);
				log.info("[updateReview] deleteImage : " + oriImage);
				
				boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
				log.info("[update] isDelete : " + isDelete);

				}
				
			} else if(image != null) {
				image.setNewNm(oriImage);
			}
			
			result = 1;
		} catch (IOException e) {
			log.info("[review update] Exception");
			FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
			throw new RuntimeException(e);
		}		
		log.info("{ReviewService] updateProductReview End ======================");
		
		return (result > 0) ? "리뷰 수정 성공" : "리뷰 수정 실패";
	}

	/* memberCode 찾기 */
	public int findMemberCode(String memberId) {
		int memberCode = memberRepository.findMemberCodeByMemberId(memberId);
		return memberCode;
	}

	/* 리뷰 삭제 */
	@Transactional
	public Object deleteReview(int reviewCode) {
		log.info("ReviewService] deleteReview Start =======================");
		
		int result = 0;
		
		try {
			if(imageRepository.findByReviewCode(reviewCode).getClass() != null) {
				String replaceFileName = imageRepository.findByReviewCode(reviewCode).getNewNm();
				FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
			}
			reviewRepository.deleteById(reviewCode);
			result = 1;
		} catch (Exception e) {
			log.info("[review delete] Exception");
		}
		
		log.info("ReviewService] deleteReview End =======================");
		
		return (result > 0) ? "리뷰 삭제 성공" : "리뷰 삭제 실패";
	}

	public long selectMyReviewTotal(int memberCode) {
		log.info("[ReviewService] selectReviewTotal Start =====================");
		
		long result = reviewRepository.countByPdCode(memberCode);
		log.info("[ReviewService] result: {} ", result);
		
		log.info("[ReviewService] selectReviewTotal End=========================");
		
		return result;
	}

//	public ReviewDTO findByPdCode(int pdCode) {
//		
//		return null;
//	}

	

	
	
}
