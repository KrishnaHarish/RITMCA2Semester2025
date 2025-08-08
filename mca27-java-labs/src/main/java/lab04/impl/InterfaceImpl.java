package lab04.impl;

import lab04.api.MyInterface;

public class InterfaceImpl implements MyInterface {
    // access protection demo: public class exposes only intended API
    private final String name;

    public InterfaceImpl(String name) {
        this.name = name;
    }

    @Override
    public void perform() {
        System.out.println("Performing task for " + name);
    }
}