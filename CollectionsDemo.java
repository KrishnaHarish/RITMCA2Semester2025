// 10. Collections: ArrayList and LinkedList

import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        arr.add("One"); arr.add("Two");
        System.out.println("ArrayList: " + arr);

        LinkedList<Integer> list = new LinkedList<>();
        list.add(1); list.add(2); list.add(3);
        list.removeFirst();
        System.out.println("LinkedList: " + list);
    }
}