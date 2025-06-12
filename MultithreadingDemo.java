// 7. Multithreading: Thread, isAlive(), join(), priorities, synchronization, inter-thread comm

class Counter {
    private int count = 0;
    synchronized void increment() { count++; }
    int getCount() { return count; }
}

class MyThread extends Thread {
    Counter counter;
    MyThread(Counter c) { this.counter = c; }
    public void run() {
        for(int i=0; i<1000; i++) counter.increment();
    }
}

public class MultithreadingDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        MyThread t1 = new MyThread(c);
        MyThread t2 = new MyThread(c);
        t1.setPriority(Thread.MAX_PRIORITY);
        t2.setPriority(Thread.MIN_PRIORITY);
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Final count: " + c.getCount());
    }
}