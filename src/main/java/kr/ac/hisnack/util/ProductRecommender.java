package kr.ac.hisnack.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.ProductTag;

public class ProductRecommender {
	private int randomRange;
	
	/**
	 * 객체 생성 시 선택하는 범위를 같이 설정한다, 예를 들어 상위 몇%인지를 설정한다
	 * @param randomRange : 알고리즘이 선정하는 상품의 범위를 설정하는 변수, 1% ~ 100%까지
	 */
	public ProductRecommender(int randomRange) {
		this.randomRange = randomRange;
	}
	
	/**
	 * 입력한 태그리스트를 사용해 회원이 좋아할 만한 상품 리스트를 반환한다
	 * @param productList : 현재 DB에 있는 모든 상품 리스트
	 * @param tagList : 사용자가 선택한 태그 리스트
	 * @param basePrice : 기준이 되는 가격, 반환하는 상품들의 총 가격이 적어도 넘어야하는 기준
	 * @return 알고리즘에 따라 선정된 상품 리스트를 반환한다
	 */
	public List<OrderedProduct> recommend(List<Product> productList, List<MemberTag> tagList, int basePrice){
		Map<Integer, MemberTag> tagMap = new HashMap<>();
		
//		(태그 번호 : 태그)로 맵을 만든다
		for(MemberTag tag : tagList) {
//			중복되는 태그가 있으면 추천도를 재설정 한다
			if(tagMap.containsKey(tag.getTcode())) {
//				태그가 호감이면 추천도를 +1하고 불호면 -1한다
				MemberTag mt = tagMap.get(tag.getTcode());
				if(tag.getRecom() == 'y') {
					mt.setRecomVal(mt.getRecomVal()+1);
				}
				else {
					mt.setRecomVal(mt.getRecomVal()-1);
				}
			}
			else {
				tag.setRecomVal(tag.getRecom() == 'y' ? 1 : -1);
				tagMap.put(tag.getTcode(), tag);
			}
		}
		
//		tagMap의 내용을 추천도의 크기에 따라 정렬함
//		tagMap을 리스트로 만들고
		List<Entry<Integer, MemberTag>> tagRankList = new ArrayList<Entry<Integer, MemberTag>>(tagMap.entrySet());
//		오름차순으로 정렬함
		Collections.sort(tagRankList, new Comparator<Entry<Integer, MemberTag>>() {
			@Override
			public int compare(Entry<Integer, MemberTag> o1, Entry<Integer, MemberTag> o2) {
				if(o1.getValue().getRecomVal() > o2.getValue().getRecomVal()) {
					return 1;
				}
				else if(o1.getValue().getRecomVal() < o2.getValue().getRecomVal()) {
					return -1;
				}
				
				return 0;
			}
		});
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "태그", "추천도");
//		태그의 추천도를 출력
		for(Entry<Integer, MemberTag> item : tagRankList) {
			System.out.printf("%8s : %8d\n", item.getValue().getContent(), item.getValue().getRecomVal());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		
//		태그가 주는 점수를 설정함
//		현재 태그에게 주는 태그가 상품에게 주는 점수
		int rankScore = 0;
//		현재 태그의 추천도
		int recomScore = -10000;

		for(Entry<Integer, MemberTag> item : tagRankList) {
			if(recomScore < item.getValue().getRecomVal()) {
				recomScore = item.getValue().getRecomVal();
				rankScore += 1;
			}
			
			tagMap.get(item.getValue().getTcode()).setScore(rankScore);
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "태그", "주는 점수");
//		태그가 주는 점수를 출력
		for(Integer key : tagMap.keySet()) {
			System.out.printf("%8s : %8d\n", tagMap.get(key).getContent(), tagMap.get(key).getScore());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		
		
//		상품에게 점수를 줌
		for(Product product : productList) {
			List<ProductTag> ptList = product.getTags();
			
			for(ProductTag ptItem : ptList) {
				if(tagMap.containsKey(ptItem.getTcode())) {
					product.setScore(product.getScore() + tagMap.get(ptItem.getTcode()).getScore());
				}
			}
		}
		
//		상품 리스트를 점수의 내림차순으로 정렬
		Collections.sort(productList, Collections.reverseOrder());
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "상품명", "받은 점수");
//		상품의 점수 출력
		for(Product item : productList) {
			System.out.printf("%8s : %8d\n", item.getName(), item.getScore());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		
//		상품을 선택해서 리스트로 만듦
		int total = 0;
		Map<Integer, OrderedProduct> productMap = new HashMap<Integer, OrderedProduct>();
		Random rand = new Random();
		
		System.out.println("기준 가격 : " + basePrice);
		
		while(total < basePrice) {
			int range = (int)(productList.size() * (randomRange / 100.0f));
			int idx = rand.nextInt(range < 1 ? 1 : range);
			OrderedProduct item = new OrderedProduct();
			item.setPcode(productList.get(idx).getCode());
			item.setAmount(1);
			item.setPrice(productList.get(idx).getPrice());
			item.setName(productList.get(idx).getName());
			
			if(productMap.containsKey(item.getPcode())) {
				OrderedProduct op = productMap.get(item.getPcode());
				op.setAmount(op.getAmount()+1);
			}
			else {
				productMap.put(item.getPcode(), item);
			}
			
			total += productList.get(idx).getPrice();
			System.out.println("선택됨 : " + item.getName() + ", total : " + total);
		}
		
		List<OrderedProduct> list = new ArrayList<OrderedProduct>(productMap.values());
		
		System.out.println("list size : " + list.size());
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s : %8s\n", "선택된 상품", "수량", "가격");
//		선택된 상품 출력
		for(OrderedProduct item : list) {
			System.out.printf("%8s : %8d : %8d\n", item.getName(),item.getAmount(), item.getPrice()*item.getAmount());
		}
		
		System.out.println("상품들의 총 가격 : " + total);
		System.out.println("\n\n----------------------------------------------\n");
		
		return list;
	}
}
