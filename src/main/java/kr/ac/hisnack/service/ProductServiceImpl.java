package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.ProductDao;
import kr.ac.hisnack.dao.ProductImageDao;
import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.util.Pager;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDao dao;
	@Autowired
	ProductImageDao imageDao;
	
	@Transactional
	@Override
	public void add(Product item) {
		dao.add(item);
		
		List<Image> images = item.getImages();
		
		if(images == null) return;
		
		for(Image image : images) {
			image.setTarget(item.getCode());
			imageDao.add(image);
		}
	}
	
	@Transactional
	@Override
	public void delete(int code) {
		imageDao.delete(code);
		dao.delete(code);
	}
	
	@Transactional
	@Override
	public void update(Product item) {
		dao.update(item);
		imageDao.delete(item.getCode());
		
		List<Image> images = item.getImages();
				
		if(images == null) return;
		
		for(Image image : images) {
			image.setTarget(item.getCode());
			imageDao.add(image);
		}
	}

	@Override
	public Product item(int code) {
		return dao.item(code);
	}

	@Override
	public List<Product> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

}
