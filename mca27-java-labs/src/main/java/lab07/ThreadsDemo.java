package lab07;

class Counter {
    private int value = 0;

    public synchronized void inc() {
        value++;
        notifyAll();
    }

    public synchronized int get() {
        return value;
    }

    public synchronized void waitUntilAtLeast(int target) throws InterruptedException {
        while (value < target) {
            wait();
        }
    }
}

class Worker extends Thread {
    private final Counter counter;
    private final int times;
    Worker(String name, Counter counter, int times, int priority) {
        super(name);
        this.counter = counter;
        this.times = times;
        setPriority(priority);
    }

    @Override
    public void run() {
        for (int i = 0; i < times; i++) {
            counter.inc();
            if (i % 1000 == 0) {
                // yield opportunity
                Thread.yield();
            }
        }
        System.out.println(getName() + " done, alive? " + isAlive());
    }
}

public class ThreadsDemo {
    public static void main(String[] args) throws Exception {
        Counter counter = new Counter();
        Worker t1 = new Worker("T1", counter, 5000, Thread.NORM_PRIORITY + 1);
        Worker t2 = new Worker("T2", counter, 5000, Thread.NORM_PRIORITY - 1);

        System.out.println("Starting threads...");
        t1.start();
        t2.start();

        // Inter-thread communication: wait/notify
        new Thread(() -> {
            try {
                counter.waitUntilAtLeast(5000);
                System.out.println("Notifier: Counter reached 5000");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Watcher").start();

        System.out.println("T1 alive? " + t1.isAlive());
        System.out.println("T2 alive? " + t2.isAlive());

        t1.join();
        t2.join();

        System.out.println("Final counter = " + counter.get());
        System.out.println("T1 alive? " + t1.isAlive() + ", T2 alive? " + t2.isAlive());
        System.out.println("End of Lab 7");
    }
}