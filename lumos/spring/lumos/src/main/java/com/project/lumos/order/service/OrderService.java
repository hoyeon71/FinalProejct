package com.project.lumos.order.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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

import com.project.lumos.common.Criteria;
import com.project.lumos.member.entity.Member;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.order.dto.OrderAndOrderProductAndMemberDTO;
import com.project.lumos.order.dto.OrderDTO;
import com.project.lumos.order.entity.Order;
import com.project.lumos.order.entity.OrderAndOrderProductAndMember;
import com.project.lumos.order.entity.OrderProduct;
import com.project.lumos.order.repository.OrderAndOrderProductAndMemberRepository;
import com.project.lumos.order.repository.OrderProductRepository;
import com.project.lumos.order.repository.OrderRepository;
import com.project.lumos.product.repository.OptionRepository;
import com.project.lumos.product.repository.ProductImageRepository;
import com.project.lumos.product.repository.ProductRepository;
import com.project.lumos.question.dto.QuestionDTO;
import com.project.lumos.question.entity.Question;
import com.project.lumos.question.repository.QuestionRepository;

@Service
public class OrderService {
	
	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final MemberRepository memberRepository;
	private final OrderAndOrderProductAndMemberRepository orderAndOrderProductAndMemberRepository;
	private final OrderProductRepository orderProductRepository;
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final OptionRepository optionRepository;
	private final ProductImageRepository productImageRepository;
	private final QuestionRepository questionRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public OrderService(MemberRepository memberRepository,
			OrderAndOrderProductAndMemberRepository orderAndOrderProductAndMemberRepository,
			OrderProductRepository orderProductRepository, OrderRepository orderRepository,
			ProductRepository productRepository, OptionRepository optionRepository, 
			ProductImageRepository productImageRepository, 
			QuestionRepository questionRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.orderAndOrderProductAndMemberRepository = orderAndOrderProductAndMemberRepository;
		this.orderProductRepository = orderProductRepository;
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.optionRepository = optionRepository;
		this.productImageRepository = productImageRepository;
		this.questionRepository = questionRepository;
		this.modelMapper = modelMapper;
	}
	
    @Value("${image.image-url}")
    private String IMAGE_URL;

    /* [???????????? ????????? ?????? for ????????????] ?????? ?????? ?????? ?????? ??? ??????????????? ?????? */
	public Object selectOrderList() {
		
		log.info("[OrderService] selectOrderListWithPaging Start ===================================");
		
        List<OrderAndOrderProductAndMember> orderList = orderAndOrderProductAndMemberRepository.findByStOrder("Y");
        
//        log.info("[OrderService] No paging orderList ??? {}", orderList);
        
        log.info("[OrderService] selectOrderListWithPaging End ===================================");
        
        return orderList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}
	
	/* [???????????? ????????? ?????? for ????????????] ??????????????? ?????? */
	public Object selectQuestionList() {
		
		log.info("[OrderService] selectQuestionList Start ===================================");
		
        List<Question> questionList = questionRepository.findByQuestionCategoryAndQuestionStatusLikeOrQuestionCategoryAndQuestionStatusLike("????????????", "?????????", "??????", "?????????");
        
//        log.info("[OrderService] No paging questionList ??? {}", questionList);
        
        log.info("[OrderService] selectQuestionList End ===================================");
        
        return questionList.stream().map(question -> modelMapper.map(question, QuestionDTO.class)).collect(Collectors.toList());
        
	}
	
	/* [???????????? ????????? ??????] ?????? ?????? ?????? ?????? | ?????? ?????? ??? ?????? ?????? */
	public int selectOrderListTotal() {
		
        log.info("[OrderService] selectOrderListTotal Start ===================================");
        
        List<OrderAndOrderProductAndMember> orderList = orderAndOrderProductAndMemberRepository.findByStOrder("Y");
        
//        log.info("[OrderService] orderList.size() ??? {}", orderList.size());
        
        log.info("[OrderService] selectOrderListTotal End ===================================");
        
        return orderList.size();
        
	}

	/* [???????????? ????????? ??????] ?????? ?????? ?????? ?????? | ????????? ????????? ???????????? ????????? ?????? */
	public Object selectOrderListWithPaging(Criteria cri) {
		
		log.info("[OrderService] selectOrderListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("orderCode").descending());
	        
        Page<OrderAndOrderProductAndMember> result = orderAndOrderProductAndMemberRepository.findByStOrder("Y", paging);
        List<OrderAndOrderProductAndMember> orderList = (List<OrderAndOrderProductAndMember>)result.getContent();
        
//        log.info("[OrderService] orderList ??? {}", orderList);
        
        log.info("[OrderService] selectOrderListWithPaging End ===================================");
        
        return orderList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}

	/* [???????????? ?????? ??????] */
	public Object selectOrderByOrderCode(String orderCode) {
		
		log.info("[OrderService] selectOrderByOrderCode Start ===================================");
		
		log.info("[OrderService] orderCode ??? {}" + orderCode);
		
        OrderAndOrderProductAndMember orderDetail = orderAndOrderProductAndMemberRepository.findByOrderCode(orderCode);
        
		// ????????? ?????? ??????
		List<OrderProduct> orderProductList = orderProductRepository.findAllByOrderNumLike(orderDetail.getOrderNum());
		for(OrderProduct orderProduct : orderProductList) {
			orderProduct.setMainImgPath(IMAGE_URL + orderProduct.getMainImgPath());
		}
        
        log.info("[OrderService] orderDetail ??? {}", orderDetail);
        
        log.info("[OrderService] selectOrderByOrderCode End ===================================");
        
        return modelMapper.map(orderDetail, OrderAndOrderProductAndMemberDTO.class);
        
	}

	/* [???????????? ????????? ??????] ?????? ?????? ?????? ?????? */
	public Object searchOrderList(String searchDate, String searchTitle, String searchValue) {
		
		log.info("[OrderService] searchOrderList Start ===================================");
		
		log.info("[OrderService] @RequestParam ??? " + searchDate + " & " + searchTitle + " & " + searchValue);
		
		List<OrderAndOrderProductAndMember> searchList = new ArrayList<>();
		
		// 2023-01-29T20:54:38.770798900+09:00 ????????? ??????
		DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
		OffsetDateTime offsetSearchDate = OffsetDateTime.parse(searchDate + "T00:00:00+09:00", formatter).plusDays(1);
		java.sql.Timestamp sqlTimeStamp = java.sql.Timestamp.valueOf(offsetSearchDate.toLocalDateTime());
		
		if(searchTitle.equals("non") && searchValue.equals("non")) {
			searchList = orderAndOrderProductAndMemberRepository.findAllByOrderDateGreaterThanEqualAndStOrderLike(sqlTimeStamp, "Y", Sort.by("orderCode").descending());
		} else {
			switch(searchTitle) {
			case "????????????" :
				searchList = orderAndOrderProductAndMemberRepository.findAllByOrderDateGreaterThanEqualAndOrderCodeContainingAndStOrderLike(sqlTimeStamp, searchValue, "Y", Sort.by("orderCode").descending());
				break;
			case "????????????" :
				List<Member> memberList1 = memberRepository.findByMemberNameContaining(searchValue);
				for(Member member : memberList1) {
					searchList = orderAndOrderProductAndMemberRepository.findByOrderDateGreaterThanEqualAndMemberCodeLikeAndStOrderLike(sqlTimeStamp, member, "Y", Sort.by("orderCode").descending());
				}
				break;
			case "?????????ID" :
				List<Member> memberList2 = memberRepository.findByMemberIdContaining(searchValue);
				for(Member member : memberList2) {
					searchList = orderAndOrderProductAndMemberRepository.findByOrderDateGreaterThanEqualAndMemberCodeLikeAndStOrderLike(sqlTimeStamp, member, "Y", Sort.by("orderCode").descending());
				}
				break;
			case "????????????" :
				searchList = orderAndOrderProductAndMemberRepository.findAllByOrderDateGreaterThanEqualAndCgNmContainingAndStOrderLike(sqlTimeStamp, searchValue, "Y", Sort.by("orderCode").descending());
				break;
			case "????????????" :
				searchList = orderAndOrderProductAndMemberRepository.findAllByOrderDateGreaterThanEqualAndPaymentMtContainingAndStOrderLike(sqlTimeStamp, searchValue, "Y", Sort.by("orderCode").descending());
				break;
			case "????????????" :
				searchList = orderAndOrderProductAndMemberRepository.findAllByOrderDateGreaterThanEqualAndDeliveryMtContainingAndStOrderLike(sqlTimeStamp, searchValue, "Y", Sort.by("orderCode").descending());
				break;
			}
		}
        
        log.info("[OrderService] searchOrderList End ===================================");
        
        return searchList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}

	/* [???????????? ?????? ??????] ?????? ?????? ?????? ?????? ?????? ?????? */
	/*
	 * ?????? 1 : ??????????????? ??????????????? ???????????? ???????????? DTO??? ?????? ????????????
	 * ?????? 2 : ?????? ??????????????? ??????????????? ???????????? ????????????????????? ?????? ??????
	 */
	@Transactional
	public Object updateOrderDelivery(String orderCode, OrderDTO orderDTO) {
		
		log.info("[OrderService] updateOrderDelivery Start ===================================");
		
		log.info("[OrderService] update ??? " + orderDTO);
		log.info("[OrderService] update ??? " + orderDTO.getDeliveryEnd());
		
		int result = 0;
		
		try {
			Order originOrder = orderRepository.findByOrderCode(orderCode);
			originOrder.setDeliveryCp(orderDTO.getDeliveryCp());
			originOrder.setDeliveryNum(orderDTO.getDeliveryNum());
			
			orderRepository.save(originOrder);
			result = 1;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
        log.info("[OrderService] updateOrderDelivery End ===================================");
        
        return (result > 0) ? "?????? ?????? ?????? ??????" : "?????? ?????? ?????? ??????";
        
	}
	
	/* [???????????? ?????? ??????] ?????? ?????? ????????? ?????? ?????? ?????? ?????? */
	@Transactional
	public Object updateHistory(String orderCode, String updateKind) {
		
		log.info("[OrderService] updateHistory Start ===================================");
		log.info("[OrderService] updateKind", updateKind);
		
		int result = 0;
		
		try {
			Order originOrder = orderRepository.findByOrderCode(orderCode);
			
			log.info("[OrderService] order.getDeliveryEnd()  ??? " + originOrder.getDeliveryEnd());
			
			/* util date ?????? ??? ?????? (????????? 9?????? => OffsetDateTime ?????? ?????????) */
			OffsetDateTime now = OffsetDateTime.now();
			ZoneOffset offset = now.getOffset();
			int seconds = offset.getTotalSeconds();
			OffsetDateTime offsetDateTime = null;
			offsetDateTime = now.plusSeconds(seconds);
			
			java.sql.Timestamp sqlTimeStamp = java.sql.Timestamp.valueOf(offsetDateTime.toLocalDateTime());
			
			log.info("[OrderService] offsetDateTime ??? " + offsetDateTime);
			log.info("[OrderService] sqlTimeStamp ??? " + sqlTimeStamp);
			
			switch(updateKind) {
				case "????????????" :
					log.info("[OrderService] ????????????");
					originOrder.setOrderConf(sqlTimeStamp);
					orderRepository.save(originOrder);
					break;
//				????????? ???????????? ?????? ?????? ??????
//				case "??????????????????" : break;
				case "??????????????????" :
					log.info("[OrderService] ??????????????????");
					originOrder.setDeliveryStart(sqlTimeStamp);
					orderRepository.save(originOrder);
					break;
				case "??????????????????" : 
					log.info("[OrderService] ??????????????????");
					originOrder.setDeliveryEnd(sqlTimeStamp);
					orderRepository.save(originOrder);
					break;
				case "??????????????????" : 
					log.info("[OrderService] ??????????????????");
					originOrder.setStClaim("????????????");
					orderRepository.save(originOrder);
					break;
				case "????????????" :
					log.info("[OrderService] ????????????");
					originOrder.setStClaim("????????????");
					orderRepository.save(originOrder);
					break;
				case "??????????????????" :
					log.info("[OrderService] ??????????????????");
					originOrder.setStClaim("????????????");
					orderRepository.save(originOrder);
					break;
			}
			
			result = 1;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

        log.info("[OrderService] updateHistory End ===================================");
        
        return (result > 0) ? "?????? ??????(??????) ??????" : "?????? ??????(??????) ??????";
        
	}

	/* [???????????? ??????] */
	public Object selectMyOrder(String memberId) {
		
		log.info("[OrderService] selectMyOrder Start ===================================");
		
		Member memberCode = memberRepository.findMemberByMemberId(memberId);
		
		List<OrderAndOrderProductAndMember> orderList = orderAndOrderProductAndMemberRepository.findByStOrderAndMemberCodeLike("Y", memberCode, Sort.by("orderCode").descending());
        
        log.info("[OrderService] selectMyOrder End ===================================");
        
        return orderList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}

}