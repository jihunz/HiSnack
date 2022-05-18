package kr.ac.hisnack.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.util.Pager;

/**
 * 회원의 CRUD를 AJAX로 할 수 있는 RestController
 * @author 오종택
 *
 */
@RestController
@RequestMapping("/rest/member")
public class MemberRestController {
	@Autowired
	MemberService service;
	
/**
 * 회원 리스트를 반환하는 메서드
 * @param pager
 * @return
 */
	@GetMapping
	public Map<String, Object> list(Pager pager){
		List<Member> list = service.list(pager);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pager", pager);
		if(list == null)
			map.put("msg", String.format("member list : list is null"));
		else
			map.put("msg", String.format("member list : ok"));
		
		return map;
	}
	
/**
 * 회원 1명의 정보를 반환하는 메서드
 * @param id
 * @return
 */
	@GetMapping("/item")
	public Map<String, Object> item(String id) {
		Member item = service.item(id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		
		if(item == null)
			map.put("msg", String.format("member %s item : member is null", id));
		else
			map.put("msg", String.format("member %s item : ok", id));
		
		return map; 
	}
	
/**
 * 회원의 정보를 DB에 추가하는 메서드
 * @param item : id, password, address, name, tel, grade가 입력된 회원 정보
 * @return 입력한 회원정보를 반환
 */
	@PostMapping
	public Member add(Member item) {
		service.add(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member %s add : ok", item.getId()));
		
		return item;
	}
	
/**
 * 회원의 정보를 수정하는 메서드
 * @param id : 회원의 기본키가 되는 id
 * @param item : address, name, tel, grade의 정보가 들어있어야 된다
 * @return 입력한 정보를 다시 반환
 */
	@PostMapping("/update")
	public Map<String, Object> update(Member item) {
		service.update(item);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item", item);
		map.put("msg", String.format("member %s update : ok", item.getId()));
		
		return map;
	}
	
/**
 * 입력한 id로 회원을 삭제
 * @param id : 회원의 id
 * @return id를 다시 반환
 */
	@DeleteMapping("/delete")
	public Map<String, Object> delete(String id) {
		service.delete(id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("msg", String.format("member %s delete : ok", id));
		
		return map;
	}
	
/**
 * 입력한 id가 DB에 있는지 확인하는 메서드
 * @param id : 확인하고 싶은 문자열
 * @return 입력한 id가 사용할 수 있으면 ok, 이미 있으면 no가 반환
 */
	@GetMapping("/confirm")
	public String confirm(String id) {
		if(service.confirm(id)) {
			return "ok";	
		}
		else {
			return "no";
		}
	}
	
/**
 * email의 중복을 확인하는 메서드
 * @param email : 확인하고 싶은 이메일
 * @return email이 사용가능한가 반환 중복이면 no 중복이 없으면 ok
 * */
	@GetMapping("/confirm/email")
	public String confirmEmail(String email) {
//		이메일에 중복이 없으면
		if(service.confirmEmail(email)) {
//			ok 반환
			return "ok";
		}
		else {
//			중복이면 no 반환
			return "no";
		}
	}
	
/**
 * 아이디를 입력하면 그 아이디의 비번을 임시 비번으로 변경하고
 * 그 비번을 반환한다
 *  @param id : 비밀번호를 변경하고 싶은 회원의 아이디
 *  @return 임시 비밀번호
 */
	@PostMapping("/change/temp/password")
	public Map<String, Object> changePassword(String id) {
		Map<String, Object> map = new HashMap<String, Object>();
		Member item = service.item(id);
		
		if(item != null) {
			Random rand = new Random();
			String pw = (rand.nextInt(100000))+"";
			
			service.changePassword(id, pw);
			
			
			map.put("password", pw);
			map.put("msg", String.format("member %s change temp password  : ok", id));	
		}
		else {
			map.put("msg", String.format("member %s change temp password : %s is null", id, id));
		}
		
		
		return map;
	}
	
	/**
	 * 아이디와 비밀번호를 입력하면 그 아이디의 비밀번호를 변경한다
	 *  @param id : 비밀번호를 변경하고 싶은 회원의 아이디
	 *  @param password : 변경될 비밀번호
	 *  @return 결과 메세지
	 */
		@PostMapping("/change/password")
		public Map<String, Object> changePassword(String id, String password) {
			Map<String, Object> map = new HashMap<String, Object>();
			Member item = service.item(id);
			
			if(item != null) {
				service.changePassword(id, password);
				
				map.put("msg", String.format("member %s change password to %s : ok", id, password));	
			}
			else {
				map.put("msg", String.format("member %s change password to %s : %s is null", id, password, id));
			}
			
			
			return map;
		}
}
