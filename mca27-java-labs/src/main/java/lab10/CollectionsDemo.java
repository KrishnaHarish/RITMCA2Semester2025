package lab10;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class CollectionsDemo {
    public static void main(String[] args) {
        // ArrayList
        List<String> arr = new ArrayList<>();
        arr.add("A"); arr.add("B"); arr.add(1, "X");
        System.out.println("ArrayList: " + arr);
        arr.remove("X");
        System.out.println("ArrayList after remove: " + arr);

        // LinkedList
        LinkedList<Integer> list = new LinkedList<>();
        list.add(10); list.addFirst(5); list.addLast(15);
        System.out.println("LinkedList: " + list);
        list.removeFirst();
        System.out.println("LinkedList after removeFirst: " + list);

        // Common operations
        System.out.println("Contains 15? " + list.contains(15));
        for (int x : list) System.out.println("Item: " + x);
        System.out.println("End of Lab 10");
    }
}