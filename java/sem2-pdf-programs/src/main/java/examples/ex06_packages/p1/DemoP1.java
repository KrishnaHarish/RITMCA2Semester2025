package examples.ex06_packages.p1;

public class DemoP1 {
    public static void main(String[] args) {
        System.out.println("=== Package p1 Demo ===");
        Protection obj1 = new Protection();
        System.out.println();
        
        Derived obj2 = new Derived();
        System.out.println();
        
        SamePackage obj3 = new SamePackage();
    }
}