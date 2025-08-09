package examples.ex06_packages.p2;

public class DemoP2 {
    public static void main(String[] args) {
        System.out.println("=== Package p2 Demo ===");
        Protection2 obj1 = new Protection2();
        System.out.println();
        
        OtherPackage obj2 = new OtherPackage();
    }
}