package lab09;

class Pair<T, U> {
    private final T first;
    private final U second;
    Pair(T first, U second) { this.first = first; this.second = second; }
    public T getFirst() { return first; }
    public U getSecond() { return second; }
    @Override public String toString() { return "Pair[" + first + ", " + second + "]"; }
}

public class GenericsDemo {
    public static <T, U> Pair<U, T> swap(Pair<T, U> p) {
        return new Pair<>(p.getSecond(), p.getFirst());
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Age", 25);
        System.out.println(p);
        Pair<Integer, String> q = swap(p);
        System.out.println(q);
        System.out.println("End of Lab 9");
    }
}