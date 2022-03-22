package kr.ac.hisnack.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ObjectConverter<T> {
	public List<T> list(Object item, Class<T> c){
		if(item == null || !(item instanceof Collection)) return null;
		
		List<?> list = new ArrayList<>((Collection<?>)item);
		
		List<T> result = list.stream()
		.filter(elem -> c.isInstance(elem))
		.map(elem -> c.cast(elem))
		.collect(Collectors.toList());
		
		return result;
	}
}
