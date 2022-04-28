package kr.ac.hisnack.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {
	private List<OrderedProduct> list;
	private int total;
	
	public Cart() {
		list = new ArrayList<>();
	}
	public int getTotal() {
		return total;
	}
	public List<OrderedProduct> getList(){
		return list;
	}
	
	
	public void add(OrderedProduct item, int amount) {
		list.add(item);
		total += item.getPrice() * amount;
	}
	
}
