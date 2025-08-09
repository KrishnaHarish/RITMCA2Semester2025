package examples.ex08_enum_autobox;

public class AutoBox {
    public static void main(String[] args) {
        // Autobox an int
        Integer iOb = 100; // autobox an int
        
        // Auto-unbox
        int i = iOb; // auto-unbox
        
        System.out.println("Original value: " + i);
        System.out.println("Boxed value: " + iOb);
        
        // Auto-unboxing when value is used
        System.out.println("Value doubled: " + (iOb * 2));
        
        // Boxing and unboxing in expressions
        Integer a = 10;
        Integer b = 20;
        Integer c = a + b; // Auto-unbox a and b, then autobox result
        
        System.out.println("Sum (boxed): " + c);
    }
}