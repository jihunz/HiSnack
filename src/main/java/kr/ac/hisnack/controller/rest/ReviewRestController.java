package kr.ac.hisnack.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.ac.hisnack.model.Image;
import kr.ac.hisnack.model.Review;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ReviewService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

/**
 * 리뷰를 CRUD하는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/review")
public class ReviewRestController {
	@Autowired
	ReviewService service;
	@Autowired
	@Qualifier("ReviewImageService")
	ImageService imageService;
	
/**
 * 리뷰 리스트를 얻는 메서드
 * @param pager : 페이지에 표시할 리뷰의 개수를 정하는 클래스
 * @return 리뷰 리스트를 반환
 */
	@GetMapping
	public List<Review> list(Pager pager){
		return service.list(pager);
	}
	
/**
 * 리뷰의 정보를 얻는 메서드
 * @param code : 리뷰의 기본키
 * @return 리뷰 정보를 반환
 */
	@GetMapping("/{code}")
	public Review item(@PathVariable int code) {
		return service.item(code);
	}
	
/**
 * 리뷰를 등록하는 메서드
 * @param item : 등록하는 리뷰, id, contents, rating이 입력되 있어야 된다
 * @param images : 리뷰 이미지 파일들
 * @return 입력한 리뷰 정보가 반환된다
 */
	@PostMapping
	public Review add(Review item, @RequestParam("image") List<MultipartFile> images) {
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		service.add(item);
		return item;
	}
	
/**
 * 리뷰를 수정하는 메서드
 * @param code : 수정하는 리뷰 기본키
 * @param item : 리뷰의 정보, contents, rating이 입력되있어야 된다
 * @param images : 리뷰 이미지 파일들, 입력이 없으면 기존에 있던 이미지가 삭제된다
 * @return 입력한 리뷰 정보가 반환된다
 */
	@PostMapping("/{code}")
	public Review update(@PathVariable int code, Review item, @RequestParam("image") List<MultipartFile> images) {
		item.setCode(code);
		imageService.delete(item.getCode());
		
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		service.update(item);
		return item;
	}

/**
 * 리뷰를 삭제하는 메서드 
 * @param code : 삭제하려고 하는 리뷰의 기본키
 * @return 기본키를 다시 반환한다
 */
	@DeleteMapping("/{code}")
	public int delete(@PathVariable int code) {
		imageService.delete(code);
		service.delete(code);
		return code;
	}
}
