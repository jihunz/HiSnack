package kr.ac.hisnack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.hisnack.dao.ProductImageDao;
import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.util.FileUploader;

@Service
public class ProductImageServiceImpl implements ProductImageService {
	@Autowired
	ProductImageDao dao;
	
	@Override
	public void delete(int code) {
		FileUploader uploader = new FileUploader();
		
		List<Image> list = dao.list(code);
		
		for(Image image : list) {
			uploader.delete(image.getFullfilename());
		}
	}

}
