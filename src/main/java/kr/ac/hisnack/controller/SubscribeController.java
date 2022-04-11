package kr.ac.hisnack.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.ac.hisnack.model.MailHtmlTemplate;
import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.model.Tag;
import kr.ac.hisnack.service.MemberService;
import kr.ac.hisnack.service.MemberTagService;
import kr.ac.hisnack.service.OrdersService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.service.TagService;
import kr.ac.hisnack.util.EmailSender;
import kr.ac.hisnack.util.Pager;

/**
 * 구독과 관련된 일을 하는 컨트롤러
 * @author 오종택
*/
@Controller
@RequestMapping("/sub")
public class SubscribeController {
	final String PATH = "sub/";
	@Autowired
	TagService ts;
	@Autowired
	OrdersService os;
	@Autowired
	ProductService ps;
	@Autowired
	MemberTagService mts;
	@Autowired
	MemberService ms;
	@Autowired
	EmailSender mailSender;
	
/**
 * 구독 상세 페이지로 이동시키는 메서드
 * */
	@GetMapping("/detail")
	public String detail() {
		return PATH+"detail";
	}
	
/**
 * 구독 상세 페이지에서 구독의 가격을 입력하면 실행되는 메서드
 * 입력 받은 total을 Orders에 넣고 구독이라는 표시로 subscribe를 y로 입력한다,
 * 그 후 session에 넣어 보관한다,
 * tag를 고르는 페이지로 redirect한다 
 *  
 * @param total : Orders의 total 구독의 가격이 저장된다
 * @param session : Orders를 저장할 session
 * */
	@PostMapping("/detail")
	public String detail(int total, HttpSession session) {
		Orders item = new Orders();
		item.setTotal(total);
		session.setAttribute("sub", item);
		return "redirect:tag";
	}
	
/**
 * 구독한 회원이 선호하는 태그를 선택하는 페이지로 이동시키는 메서드
 * 현재 DB에 있는 태그 리스트를 Model에 넣어서 jsp로 보내준다
 * /sub/detail의 post를 입력해 redirect되야지만 올 수 있다
 * */
	@GetMapping("/tag")
	public String tag(Model model) {
		Pager pager = new Pager();
		List<Tag> list = ts.list(pager);
		model.addAttribute("list", list);
		return PATH+"tag";
	}
	
/**
 * 회원이 선호하는 태그 리스트를 저장했던 Orders에 저장하고 결제 페이지로 이동시킨다
 *  
 * @param list : 회원이 선택한 태그의 기본키인 code, Tag List로 변환하고 detail 페이지에서 만든 Orders에 저장한다
 * @param session : Orders를 저장하기 위한 session
 * */
	@PostMapping("/tag")
	public String tag(@RequestParam("code") List<Integer> list, HttpSession session) {
		Orders item = (Orders) session.getAttribute("sub");
		List<Tag> tags = new ArrayList<>();
		for(Integer tcode : list) {
			Tag tag = new Tag();
			tag.setCode(tcode);
			tags.add(tag);
		}
		item.setTags(tags);
		session.setAttribute("sub", item);
		return "redirect:payment";
	}
	
/**
 * 유저의 정보를 jsp로 넘겨주고 결제 페이지로 이동한다
 */
	@GetMapping("/payment")
	public String payment(Model model, HttpSession session) {
		Member user = (Member) session.getAttribute("user");
		Orders sub = (Orders) session.getAttribute("sub");
		 
		model.addAttribute("user", user);
		model.addAttribute("sub", sub);
		
		return PATH+"payment";
	}
	
/**
 * 결제 페이지에서 입력한 구독의 정보와 detail, tag에서 입력한 정보를 합쳐서 Service에게 넘긴다.
 * 추천 알고리즘으로 선정한 상품들을 주문한다
 * @param item : 회원이 입력한 정보가 들어있는 변수, 아이디, 주소, 이름, 전화번호가 입력되어 있어야한다
 */
	@PostMapping("/payment")
	public String payment(Orders item, HttpSession session, HttpServletRequest request) {
		Orders sub = (Orders) session.getAttribute("sub");
		item.setTotal(sub.getTotal()); 
		item.setTags(sub.getTags());
		item.setSubscribe('y');
		
		mts.add(item.getTags(), item.getId());
		
//		여기서 추천 범위를 설정할 수 있다
		List<OrderedProduct> list = ps.recommend(item.getId(), 30, item.getTotal(), (int)(item.getTotal() * 0.2));
		item.setProducts(list);
		
		os.add(item);
		session.removeAttribute("sub");
		
		Member user = ms.item(item.getId());
		
//		구독을 하면 이메일을 보낸다
		if(user.getEmail() != null && !user.getEmail().equals("")) {
//			이메일을 위한 html 인스턴스를 사용
	        MailHtmlTemplate html = new MailHtmlTemplate("html/subscribe_mail_template.html");
//	        내용 입력
	        html.setContents("안녕하세요. Hi Snack입니다",
	        				"구독해 주셔서 감사합니다!");
//	        이미지로 들어갈 상품 설정
	        html.setOrderedProduct(os.item(item.getCode()).getProducts());
//	        이미지가 포함된 html로 메일 보내기
	        mailSender.sendHtmlWithImageEmail(user.getEmail(), user.getName(), "Hi Snack 구독하셨습니다", html);
		}
		
		return "redirect:/orders/confirm";
	}
}
