package lab04;

import lab04.api.MyInterface;
import lab04.impl.InterfaceImpl;

// Demonstrates packages, imports, interfaces, default methods, and access protection
public class PackageInterfaceDemo {
    public static void main(String[] args) {
        MyInterface obj = new InterfaceImpl("User");
        obj.greet();   // default method
        obj.perform(); // implemented method
        System.out.println("End of Lab 4");
    }
}