package kr.ac.hisnack.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import kr.ac.hisnack.model.MemberTag;
import kr.ac.hisnack.model.OrderedProduct;
import kr.ac.hisnack.model.Product;
import kr.ac.hisnack.model.ProductTag;

public class ProductRecommender {
	private int randomRangePercent;
	private int minRange;
	private Map<Integer, MemberTag> tagMap;
	private int total;
	
	/**
	 * 객체 생성 시 선택하는 범위를 같이 설정한다, 예를 들어 상위 몇%인지를 설정한다
	 * @param randomRangePercent : 알고리즘이 선정하는 상품의 범위를 설정하는 변수, 1% ~ 100%까지
	 */
	public ProductRecommender(int randomRangePercent, int minRange) {
		if(randomRangePercent < 1) {
			randomRangePercent = 1;
		}
		else if(randomRangePercent > 100) {
			randomRangePercent = 100;
		}
		this.randomRangePercent = randomRangePercent;
		this.minRange = minRange;
		
		tagMap = new HashMap<>();
	}
	
	/**
	 * 입력한 태그리스트를 사용해 회원이 좋아할 만한 상품 리스트를 반환한다
	 * @param productList : 현재 DB에 있는 모든 상품 리스트
	 * @param tagList : 사용자가 선택한 태그 리스트
	 * @param basePrice : 기준이 되는 가격, 반환하는 상품들의 총 가격이 적어도 넘어야하는 기준
	 * @return 알고리즘에 따라 선정된 상품 리스트를 반환한다
	 */
	public List<OrderedProduct> recommend(List<Product> productList, List<MemberTag> tagList, int basePrice){
//		태그 map을 생성
		createTagMap(tagList);
//		태그 선호도 순으로 정렬
		sortTagList(tagList);
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "태그", "선호도");
//		태그의 선호도를 출력
		for(MemberTag item : tagList) {
			System.out.printf("%8s : %8d\n", item.getContent(), item.getRecomVal());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
//		태그 map에 태그가 주는 점수를 설정함
		settingTagMap(tagList);
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "태그", "주는 점수");
//		태그가 주는 점수를 출력
		for(Integer key : tagMap.keySet()) {
			System.out.printf("%8s : %8d\n", tagMap.get(key).getContent(), tagMap.get(key).getScore());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		
//		상품에게 점수를 줌
		settingScoreOfProducts(productList);
		
//		상품 리스트를 점수의 내림차순으로 정렬
		Collections.sort(productList, Collections.reverseOrder());
		
		System.out.println("\n\n----------------------------------------------\n");
		System.out.printf("%8s : %8s\n", "상품명", "받은 점수");
//		상품의 점수 출력
		for(Product item : productList) {
			System.out.printf("%8s : %8d\n", item.getName(), item.getScore());
		}
		
		System.out.println("\n\n----------------------------------------------\n");
		
		List<OrderedProduct> list = createRecommandList(basePrice, productList);
		
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

	private List<OrderedProduct> createRecommandList(int basePrice, List<Product> productList) {

//		상품을 선택해서 리스트로 만듦
		int total = 0;
//		선택된 상품이 들어갈 map
		Map<Integer, OrderedProduct> productMap = new HashMap<Integer, OrderedProduct>();
		Random rand = new Random();
		
		System.out.println("기준 가격 : " + basePrice);
		
		int range = (int)(productList.size() * (randomRangePercent / 100.0f));
		
//		상품을 선택하는 범위가 최소 범위보다 작으면서 상품 리스트의 개수가 최소 범위 보다 클 경우
		if(range < minRange && productList.size() >= minRange) {
//			선택 범위를 최소범위로 설정
			range = minRange;
		}
		else if(productList.size() < minRange) {
//			상품 리스트의 개수가 최소 범위 보다 작을 경우
//			선택 범위를 상품 리스트의 크기로 정함 
			range = productList.size();
		}
		
//		지정 가격이 될 때까지 상품을 선택한다
		while(total < basePrice) {
			int idx = rand.nextInt(range);
			
			if(productMap.containsKey(productList.get(idx).getCode())) {
//				선택된 상품이 이미 있으면 개수만 늘린다
				OrderedProduct op = productMap.get(productList.get(idx).getCode());
				op.setAmount(op.getAmount()+1);
			}
			else {
//				없으면 새로 등록한다
				OrderedProduct item = new OrderedProduct();
				item.setPcode(productList.get(idx).getCode());
				item.setAmount(1);
				item.setPrice(productList.get(idx).getPrice());
				item.setName(productList.get(idx).getName());
				
				productMap.put(item.getPcode(), item);
			}
//			선택된 상품 만큼 돈값을 더한다
			total += productList.get(idx).getPrice();
			System.out.println("선택됨 : " + productList.get(idx).getName() + ", total : " + total);
		}
		
		this.total = total;
		
		return new ArrayList<>(productMap.values());
	}

	private void settingScoreOfProducts(List<Product> productList) {
//		상품에게 점수를 줌
		for(Product product : productList) {
			List<ProductTag> ptList = product.getTags();
			
			for(ProductTag ptItem : ptList) {
				if(tagMap.containsKey(ptItem.getTcode())) {
					product.setScore(product.getScore() + tagMap.get(ptItem.getTcode()).getScore());
				}
			}
		}
	}

	private void settingTagMap(List<MemberTag> tagList) {
//		태그가 주는 점수를 설정함
//		현재 태그에게 주는 태그가 상품에게 주는 점수
		int rankScore = 0;
//		현재 태그의 추천도
		int recomScore = -10000;

		for(MemberTag item : tagList) {
			if(recomScore < item.getRecomVal()) {
				recomScore = item.getRecomVal();
				rankScore += 1;
			}
//			태그의 점수를 저장
			tagMap.get(item.getTcode()).setScore(rankScore);
		}
	}

	private void sortTagList(List<MemberTag> tagList) {
//		태그를 선호도 순으로 정렬
		Collections.sort(tagList, new Comparator<MemberTag>() {

			@Override
			public int compare(MemberTag o1, MemberTag o2) {
				if(o1.getRecomVal() > o2.getRecomVal()) {
					return 1;
				}
				else if(o1.getRecomVal() < o2.getRecomVal()) {
					return -1;
				}
				
				return 0;
			}
			
		});
	}

	private void createTagMap(List<MemberTag> tagList) {
//		태그를 태그 맵에 담음
//		태그를 찾을 때 사용
		for(MemberTag mt : tagList) {
			tagMap.put(mt.getTcode(), mt);
		}
	}
}
