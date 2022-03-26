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
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.ProductTag;
import kr.ac.hisnack.util.Pager;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDao dao;
	@Autowired
	ProductImageDao imageDao;
	@Autowired
	ProductTagDao tagDao;
	
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
		return dao.list(pager);
	}

/**
 * 입력된 주문된 상품들의 총 가격을 구한다
 */
	@Transactional
	@Override
	public int priceTotal(List<OrderedProduct> products) {
		int total = 0;
		for(OrderedProduct product : products) {
			Product item = dao.item(product.getPcode());
			total += item.getPrice() * product.getAmount();
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
			list.add(item);
		}
		return list;
	}

}
