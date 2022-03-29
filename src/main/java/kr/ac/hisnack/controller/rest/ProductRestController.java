package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.ImageService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.FileUploader;
import kr.ac.hisnack.util.Pager;

/**
 * 상품을 CRUD 하는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
	@Autowired
	ProductService service;
	@Autowired
	@Qualifier("ProductImageService")
	ImageService imageService;
	
/**
 * 상품 리스트를 얻는 메서드 
 * @param pager : 페이지에 표시할 상품의 개수를 설정하는 클래스 
 * @return 상품 리스트를 반환
 */
	@GetMapping
	public Map<String, Object> list(Pager pager){
		Map<String, Object> map = new HashMap<String, Object>();
		List<Product> list = service.list(pager);
		
		map.put("list", list);
		map.put("pager", pager);
		
		if(list == null)
			map.put("msg", "product list : list is null");
		else
			map.put("msg", "product list : ok");
		
		return map; 
	}
	
/**
 * 상품 정보를 얻는 메서드
 * @param code : 상품의 기본키
 * @return 상품 정보를 반환
 */
	@GetMapping("/{code}")
	public Map<String, Object> item(@PathVariable int code) {
		Map<String, Object> map = new HashMap<String, Object>();
		Product item = service.item(code);
		
		map.put("item",item);
		if(item == null)
			map.put("msg", String.format("product %d item : item is null", code));
		else
			map.put("msg", String.format("product %d item : ok", code));
		
		return map;
	}
	
/**
 * 상품을 등록하는 메서드
 * @param item : 상품의 정보, name, price, manufacture, info가 입력되있어야 된다
 * @param tcodes : 상품에 입력하고 싶은 태그의 기본키
 * @param images : 상품 이미지 파일들
 * @return 입력한 상품 정보를 반환
 */
	@PostMapping
	public Map<String, Object> add(Product item, @RequestParam("tcode") List<Integer> tcodes, 
			@RequestParam("image") List<MultipartFile> images) {
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		item.setTagsWithTcode(tcodes);
		
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", "product add : ok");
		
		return map;
	}
	
/**
 * 상품을 수정하는 메서드
 * @param code : 수정하려는 상품의 기본키
 * @param item : 상품의 정보, name, price, manufacture, info가 입력되어야 한다
 * @param tcodes : 대체되는 태그의 기본키, 입력하지 않으면 원래 있던 태그들이 다 사라진다  
 * @param images : 대체되는 상품의 이미지 파일, 입력하지 않으면 원래 있던 이미지가 다 삭제된다
 * @return 입력한 상품의 정보가 반환된다
 */
	@PostMapping("/{code}")
	public Map<String, Object> update(@PathVariable int code, Product item, @RequestParam("tcode") List<Integer> tcodes,
			@RequestParam("image") List<MultipartFile> images) {
		item.setCode(code);
		imageService.delete(item.getCode());
		
		FileUploader uploader = new FileUploader();
		List<Image> imageList = uploader.upload(images);
		item.setImages(imageList);
		
		item.setTagsWithTcode(tcodes);
		
		service.update(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("product %d update : ok", code));
		
		return map;
	}
	
	/**
	 * 상품을 삭제하는 메서드
	 * @param code : 삭제하고 싶은 상품의 기본키
	 * @return 기본키를 다시 반환
	 */
	@DeleteMapping("/{code}")
	public Map<String, Object> delete(@PathVariable int code) {
		imageService.delete(code);
		service.delete(code);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", String.format("product %d delete : ok", code));
		return map;
	}
}
