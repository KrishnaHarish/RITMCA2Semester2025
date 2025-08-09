package examples.ex06_packages.p2;

import examples.ex06_packages.p1.Protection;

public class Protection2 extends Protection {
    public Protection2() {
        System.out.println("Derived other package constructor");
        // System.out.println("n = " + n); // not accessible
        // System.out.println("n_pri = " + n_pri); // not accessible
        System.out.println("n_pro = " + n_pro);
        System.out.println("n_pub = " + n_pub);
    }
}