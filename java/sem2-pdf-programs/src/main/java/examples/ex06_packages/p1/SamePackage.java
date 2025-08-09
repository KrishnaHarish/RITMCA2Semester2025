package examples.ex06_packages.p1;

public class SamePackage {
    public SamePackage() {
        Protection p = new Protection();
        System.out.println("Same package constructor");
        System.out.println("n = " + p.n);
        // System.out.println("n_pri = " + p.n_pri); // not accessible
        System.out.println("n_pro = " + p.n_pro);
        System.out.println("n_pub = " + p.n_pub);
    }
}