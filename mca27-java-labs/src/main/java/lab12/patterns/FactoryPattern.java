package lab12.patterns;

interface Product {
    String name();
}

class ConcreteA implements Product {
    public String name() { return "ConcreteA"; }
}

class ConcreteB implements Product {
    public String name() { return "ConcreteB"; }
}

class ProductFactory {
    public static Product create(String kind) {
        switch (kind) {
            case "A": return new ConcreteA();
            case "B": return new ConcreteB();
            default: throw new IllegalArgumentException("Unknown kind: " + kind);
        }
    }
}