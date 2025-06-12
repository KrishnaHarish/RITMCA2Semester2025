// 8. Enumerations and autoboxing

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

public class EnumAutoboxingDemo {
    public static void main(String[] args) {
        Day today = Day.WED;
        System.out.println("Today is: " + today);

        Integer x = 10; // Autoboxing
        int y = x;      // Unboxing
        System.out.println("x: " + x + ", y: " + y);
    }
}