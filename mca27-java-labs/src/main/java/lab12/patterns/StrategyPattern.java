package lab12.patterns;

interface Strategy {
    int combine(int a, int b);
}

class AddStrategy implements Strategy { public int combine(int a, int b) { return a + b; } }
class MultiplyStrategy implements Strategy { public int combine(int a, int b) { return a * b; } }

class Context {
    private Strategy strategy;
    public Context(Strategy strategy) { this.strategy = strategy; }
    public void setStrategy(Strategy strategy) { this.strategy = strategy; }
    public int execute(int a, int b) { return strategy.combine(a, b); }
}