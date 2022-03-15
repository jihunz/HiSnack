package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.hisnack.dao.ReviewImageDao;
import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.util.FileUploader;

@Service("ReviewImageService")
public class ReviewImageService implements ImageService {
	@Autowired
	ReviewImageDao dao;
	
	@Transactional
	@Override
	public void delete(int code) {
		FileUploader uploader = new FileUploader();
		List<Image> list = dao.list(code);
		
		for(Image item : list) {
			uploader.delete(item.getFullfilename());
		}
		
		dao.delete(code);
	}

}
