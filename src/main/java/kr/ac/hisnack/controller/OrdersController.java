package kr.ac.hisnack.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.ac.hisnack.model.Member;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Orders;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.service.MemberTagService;
import kr.ac.hisnack.service.OrdersService;
import kr.ac.hisnack.service.ProductService;
import kr.ac.hisnack.util.ObjectConverter;

/**
 * 주문과 관련된 일을 하는 Controller
 * @author 오종택
 *
 */
@Controller
@RequestMapping("/orders")
public class OrdersController {
	final String PATH = "orders/";
	
	@Autowired
	OrdersService service;
	@Autowired
	MemberTagService mts;
	@Autowired
	ProductService ps;
	@Autowired
	ObjectConverter<OrderedProduct> converter;
	
/**
 * 상품을 결제하기 위한 페이지,
 * 장바구니에 있는 상품을 결제하거나 
 * 상품을 바로 결제한다
 * 회원이 로그인하고 있으면 회원의 정보를 jsp에 넘겨준다
 * 
 * pcode, amount 파라미터가 있으면 바로 결재로 간주한다
 * 
 * @param model : 장바구니에 있는 상품리스트와 회원의 정보를 전달하는데 사용
 * @param session : 장바구니와 회원의 정보를 얻는데 사용
 * @param converter : object 변수를 list로 변환해줌
 * @return 결재 페이지의 경로를 반환
 */
	@GetMapping("/payment")
	public String payment(@RequestParam(value="pcode", required = false) Integer pcode, 
			@RequestParam(value="amount", required = false) Integer amount,
			Model model, HttpSession session, RedirectAttributes ra) {
//		로그인한 회원을 찾아서
		Member user = (Member) session.getAttribute("user");
		
		if(user != null) {
//			jsp에 전달
//			orders에 id 넣을 때 사용
			model.addAttribute("user", user);
		}
		
//		장바구니에 담은걸 결제할 경우
		if(pcode == null || amount == null ||
			amount < 1) {
//			카트를 찾아서
			Object cart = session.getAttribute("cart");
			List<OrderedProduct> products = converter.list(cart, OrderedProduct.class);
			
//			장바구니가 없을 경우
			if(products == null) {
				ra.addFlashAttribute("err_msg", "구매할 상품이 없습니다");
				return "redirect:cart";
			}
			
//			내가 구매를 결정한 것만 걸러내서
			products = products.stream()
					.filter(item -> item.isChecked())
					.collect(Collectors.toList());
			
			if(products.size() > 0) {
//				session에 저장하고 post페이지에서 사용함
				session.setAttribute("payment", products);
//				jsp에서 보여주기 위해 설정한다
				int total = ps.priceTotal(products);
				List<Product> productList = ps.list(products);
				
				int total_amount = 0;
				
				for(Product p : productList) {
					total_amount += p.getAmount();
				}
				
				model.addAttribute("amount", total_amount);
				model.addAttribute("list", productList);
				model.addAttribute("total", total);
			}
			else {
//				결제할 상품이 없을 경우
				ra.addFlashAttribute("err_msg", "구매할 상품이 없습니다");
				return "redirect:cart";
			}
		}
		else {
//			직접 주문한 경우
			List<OrderedProduct> products = new ArrayList<>();
			OrderedProduct orderedProduct = new OrderedProduct();
			
			orderedProduct.setPcode(pcode);
			orderedProduct.setAmount(amount);
			orderedProduct.setChecked(true);
			
			products.add(orderedProduct);
			
//			결제할 상품을 저장한다
			session.setAttribute("payment", products);
			
//			payment 페이지에서 사용할 상품 리스트를 인위적으로 만든다
			List<Product> productList = new ArrayList<>();
			Product product = ps.item(pcode);
			product.setAmount(amount);
			
			productList.add(product);
			
//			payment에서 표시할 정보를 보낸다
			model.addAttribute("amount", amount);
			model.addAttribute("list", productList);
			model.addAttribute("total", product.getAmount()*product.getPrice());
		}
		
		return PATH+"payment";
	}
	
/**
 * 입력한 주문 정보를 저장하고 결제 확인 페이지로 이동시키는 메서드,
 * 장바구니에서 상품들을 꺼내와 주문에 넣어준다.
 * 장바구니에 상품을 넣은 상태로 와야 제대로 작동한다.
 * @param item : 회원이 입력한 주문 정보, 아이디, 주소, 이름, 전화번호가 입력 되있어야 된다
 * @param session : 장바구니에 있는 상품을 꺼낼 때 사용
 * @param converter : object 변수를 list로 변환해줌
 * @return 결제 확인 페이지의 경로
 */
	@PostMapping("/payment")
	public String payment(Orders item, HttpSession session, RedirectAttributes ra) {
//		주문한 상품을 꺼내와서
		Object payment = session.getAttribute("payment");
//		orders에 넣는다
		List<OrderedProduct> products = converter.list(payment, OrderedProduct.class);
		item.setProducts(products);
		
		if(products == null) {
//			장바구니에 상품이 없으면 결제페이지에 오늘 걸 막는다
//			intercepter에 이 기능을 추가할 가능성 있음
			ra.addFlashAttribute("err_msg", "구매할 상품이 없습니다");
			return "redirect:cart";
		}
//		주문이라고 설정
		item.setSubscribe('n');
//		DB에 저장
		service.add(item);
		List<Product> productList = ps.list(products);
//		회원이 좋아하는 태그 저장
		for(Product p : productList) {
			mts.add(p.getTags(), item.getId());
		}
//		주문한 상품 삭제
		session.removeAttribute("payment");
		
//		카트를 찾는다
		Object cart = session.getAttribute("cart");
		
		if(cart != null) {
//			products 변수 재사용
			products = converter.list(cart, OrderedProduct.class);
//			이미 주문한 제품은 걸러낸다
			products = products.stream()
					.filter(p -> !p.isChecked())
					.collect(Collectors.toList());
//			session에 다시 저장
			session.setAttribute("cart", products);
			
		}

		return "redirect:confirm";
	}
	
/**
 * 회원이 주문하고 싶은 상품을 저장한 장바구니의 내용물을 확인하는 페이지로 이동시키는 메서드
 * @param model : 상품을 전달하는데 사용하는 Model
 * @param session : 저장한 장바구니를 얻을 때 사용하는 Session
 * @param converter : object 변수를 list로 변환해줌
 * @return 장바구니 페이지의 경로를 반환
 */
	@GetMapping("/cart")
	public String cart(Model model, HttpSession session) {
		Object cart = session.getAttribute("cart");
		
		List<OrderedProduct> products = converter.list(cart, OrderedProduct.class);
		
		int total = 0;
		int count = 0;
		
		if(products != null) {
			total = ps.priceTotal(products);
			List<Product> productList = ps.list(products);
			
			for(OrderedProduct op : products) {
				if(op.isChecked()) {
					count += op.getAmount();
				}
			}
			
			model.addAttribute("list", productList);
		}
		
		model.addAttribute("total", total);
		model.addAttribute("count", count);
		
		return PATH+"cart";
	}
	
/**
 * 결제가 완료됐다고 알려주는 페이지
 * @return 확인 페이지의 경로 반환
 */
	@GetMapping("/confirm")
	public String confirm() {
		return PATH+"confirm";
	}
}
