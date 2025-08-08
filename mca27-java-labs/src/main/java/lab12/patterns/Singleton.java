package lab12.patterns;

// Thread-safe lazy-loaded Singleton using holder idiom
public class Singleton {
    private Singleton() {}
    private static class Holder { static final Singleton INSTANCE = new Singleton(); }
    public static Singleton getInstance() { return Holder.INSTANCE; }

    public void doWork() {
        System.out.println("Singleton working: " + this);
    }
}