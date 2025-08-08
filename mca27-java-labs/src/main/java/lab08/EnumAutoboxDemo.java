package lab08;

enum Day {
    MON(1), TUE(2), WED(3), THU(4), FRI(5), SAT(6), SUN(7);
    private final int order;
    Day(int order) { this.order = order; }
    public int order() { return order; }
}

public class EnumAutoboxDemo {
    public static void main(String[] args) {
        Day d = Day.FRI;
        System.out.println("Day: " + d + ", ordinal=" + d.ordinal() + ", order=" + d.order());

        // Autoboxing/unboxing with wrappers
        Integer boxed = 10; // autoboxing
        int sum = boxed + 5; // unboxing + math
        System.out.println("boxed=" + boxed + ", sum=" + sum);

        // Autoboxing in collections
        java.util.ArrayList<Integer> list = new java.util.ArrayList<>();
        list.add(1); list.add(2); list.add(3);
        int total = 0;
        for (Integer i : list) total += i; // unboxing
        System.out.println("Total=" + total);
        System.out.println("End of Lab 8");
    }
}