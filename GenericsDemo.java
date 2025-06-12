// 9. Generic class with multiple type parameters

class Pair<X, Y> {
    X first;
    Y second;
    Pair(X first, Y second) {
        this.first = first; this.second = second;
    }
    void show() {
        System.out.println("First: " + first + ", Second: " + second);
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Age", 21);
        p.show();
    }
}