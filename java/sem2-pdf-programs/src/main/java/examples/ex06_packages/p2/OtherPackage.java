package examples.ex06_packages.p2;

import examples.ex06_packages.p1.Protection;

public class OtherPackage {
    public OtherPackage() {
        Protection p = new Protection();
        System.out.println("Other package constructor");
        // System.out.println("n = " + p.n); // not accessible
        // System.out.println("n_pri = " + p.n_pri); // not accessible
        // System.out.println("n_pro = " + p.n_pro); // not accessible
        System.out.println("n_pub = " + p.n_pub);
    }
}