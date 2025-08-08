package lab12.patterns;

import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(int newState);
}

interface Subject {
    void attach(Observer o);
    void detach(Observer o);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private final List<Observer> observers = new ArrayList<>();
    private int state = 0;

    public void setState(int s) {
        this.state = s;
        notifyObservers();
    }
    public int getState() { return state; }

    public void attach(Observer o) { observers.add(o); }
    public void detach(Observer o) { observers.remove(o); }
    public void notifyObservers() { for (Observer o : observers) o.update(state); }
}

class ConcreteObserver implements Observer {
    private final String name;
    public ConcreteObserver(String name) { this.name = name; }
    public void update(int newState) {
        System.out.println(name + " observed state = " + newState);
    }
}