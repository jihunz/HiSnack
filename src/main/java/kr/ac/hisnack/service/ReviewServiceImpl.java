package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.ReviewDao;
import kr.ac.hisnack.dao.ReviewImageDao;
import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.util.Pager;

@Service
public class ReviewServiceImpl implements ReviewService {
	@Autowired
	ReviewDao dao;
	@Autowired
	ReviewImageDao imageDao;
	
	@Transactional
	@Override
	public void add(Review item) {
		dao.add(item);
		List<Image> images = item.getImages();
		
		if(images == null) return;
		
		for(Image image : images) {
			image.setTarget(item.getCode());
			imageDao.add(image);
		}
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}
	
	@Transactional
	@Override
	public void update(Review item) {
		dao.update(item);
		List<Image> images = item.getImages();
		
		if(images == null) return;
		
		for(Image image : images) {
			image.setTarget(item.getCode());
			imageDao.add(image);
		}
	}

	@Override
	public Review item(int code) {
		return dao.item(code);
	}

	@Override
	public List<Review> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

}
