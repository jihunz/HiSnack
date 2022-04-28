package kr.ac.hisnack.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.ProductDao;
import kr.ac.hisnack.dao.ProductImageDao;
import kr.ac.hisnack.dao.ProductTagDao;
import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.ProductTag;
import kr.ac.hisnack.util.Pager;
import kr.ac.hisnack.util.ProductRecommender;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDao dao;
	@Autowired
	ProductImageDao imageDao;
	@Autowired
	ProductTagDao tagDao;
	@Autowired
	MemberTagService mts;
	
/**
 * 상품 추가
 * 상품의 태그와 이미지를 등록한다
 */
	@Transactional
	@Override
	public void add(Product item) {
		dao.add(item);
		
		List<Image> images = item.getImages();
		List<ProductTag> tags = item.getTags();
		
		if(images != null) {
//			DB에 이미지 등록하는 코드
			for(Image image : images) {
				image.setTarget(item.getCode());
				imageDao.add(image);
			}	
		}
		
		
		if(tags != null) {
//			제품의 태그 등록
			for(ProductTag tag : tags) {
				tag.setPcode(item.getCode());
				tagDao.add(tag);
			}	
		}
	}
	
/**
 * 상품 삭제
 * 상품의 태그와 상품을 삭제
 * 이미지는 Controller가 다른 service에게 시키고 있다
 */
	@Transactional
	@Override
	public void delete(int code) {
		tagDao.delete(code);
		dao.delete(code);
	}
	
/**
 * 상품 수정
 * 기존의 태그와 이미지는 삭제하고 입력된 값으로 다시 등록
 */
	@Transactional
	@Override
	public void update(Product item) {
		dao.update(item);
		
		List<Image> images = item.getImages();
		List<ProductTag> tags = item.getTags();
				
		if(images != null) {
//			DB에 이미지 등록하는 코드
			for(Image image : images) {
				image.setTarget(item.getCode());
				imageDao.add(image);
			}	
		}
		
		tagDao.delete(item.getCode());
		
		if(tags != null) {
			for(ProductTag tag : tags) {
				tag.setPcode(item.getCode());
				tagDao.add(tag);
			}
		}
		
	}

/**
 * 상품 1개 정보
 */
	@Override
	public Product item(int code) {
		return dao.item(code);
	}

/**
 * 상품 리스트
 */
	@Transactional
	@Override
	public List<Product> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		
		List<Product> list = dao.list(pager); 
		
//		for(Product item : list) {
//			item.setImages(imageDao.list(item.getCode()));
//			item.setTags(tagDao.list(item.getCode()));
//		}
		
		return list;
	}

/**
 * 입력된 주문된 상품들의 총 가격을 구한다
 */
	@Transactional
	@Override
	public int priceTotal(List<OrderedProduct> products) {
		int total = 0;
		for(OrderedProduct product : products) {
			if(product.isChecked()) {
				Product item = dao.item(product.getPcode());
				total += item.getPrice() * product.getAmount();	
			}
		}
		return total;
	}
	
/**
 * 입력된 주문된 상품들을 상품 리스트를 구한다
 */
	@Transactional
	@Override
	public List<Product> list(List<OrderedProduct> products) {
		List<Product> list = new ArrayList<>();
		for(OrderedProduct product : products) {
			Product item = dao.item(product.getPcode());
			item.setAmount(product.getAmount());
			item.setChecked(product.isChecked());
			list.add(item);
		}
		return list;
	}
/**
 * 입력된 파라미터를 사용해서 회원에게 추천하는 상품 리스트를 반환
 * @param id : 회원의 id
 * @param randomRange : 추천 순으로 정렬된 상품 리스트에서 어느정도 범위에서 상품을 선택할지 설정. 10 -> 상위 10%
 * @param basePrice : 기준이 되는 금액으로 상품들의 총 가격이 적어도 이 금액 보다 크게 된다.
 * @param weightPrice 가격의 가중치로 basePrice에서 weightPrice를 더 한 금액이 기준이 된다.
 */
	@Transactional
	@Override
	public List<OrderedProduct> recommend(String id, int randomRange, int basePrice, int weightPrice) {
		ProductRecommender recommender = new ProductRecommender(randomRange);
		
		Pager pager = new Pager();
		int total = dao.total(pager);
		pager.setTotal(total);
		pager.setPerPage(total);
		
		List<Product> productList = list(pager);
		List<MemberTag> tagList =  mts.list(id);
		
		System.out.println("상품 리스트 크기 : "+productList.size());
		System.out.println("total : " + total);
		
		return recommender.recommend(productList, tagList, basePrice + weightPrice);
	}

}
