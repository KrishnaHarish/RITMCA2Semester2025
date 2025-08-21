# Design and Analysis of Algorithms Solutions
## Based on Anany Levitin's Approach
### MCA22 - Semester End Examination Solutions

---

## UNIT - I

### Question 1

**a) Explain the term Algorithm. Explain the characteristics of a good algorithm? (05 marks)**

**Algorithm Definition:**
An algorithm is a sequence of unambiguous instructions for solving a problem, i.e., for obtaining a required output for any legitimate input in a finite amount of time.

**Characteristics of a Good Algorithm (Levitin's Criteria):**
1. **Correctness** - The algorithm should produce correct output for all valid inputs
2. **Efficiency** - Should use minimal time and space resources
3. **Clarity** - Should be clearly written and easy to understand
4. **Generality** - Should solve a general class of problems, not just specific instances
5. **Finiteness** - Must terminate after finite number of steps

**b) List and explain problem types in ADA (05 marks)**

According to Levitin, problems can be classified as:

1. **Sorting Problems** - Rearranging items in ascending/descending order
2. **Searching Problems** - Finding a particular item in a collection
3. **String Processing** - Pattern matching, text editing operations
4. **Graph Problems** - Finding paths, connectivity, spanning trees
5. **Combinatorial Problems** - Finding optimal solutions from finite sets
6. **Geometric Problems** - Computational geometry applications
7. **Numerical Problems** - Mathematical computations and approximations

**c) Write an Algorithm for Sequential Search, Discuss complexities (10 marks)**

**Sequential Search Algorithm:**
```
Algorithm: SequentialSearch(A[0..n-1], K)
// Input: Array A[0..n-1] and search key K
// Output: Index of K in A, or -1 if not found

for i ← 0 to n-1 do
    if A[i] = K then
        return i
return -1
```

**Time Complexity Analysis:**
- **Best Case (C_best):** 1 comparison - when key is at first position
- **Worst Case (C_worst):** n comparisons - when key is at last position or not found
- **Average Case (C_avg):** (n+1)/2 comparisons - assuming equal probability for all positions

**Space Complexity:** O(1) - constant extra space

---

### Question 2

**a) Element Uniqueness Problem Algorithm and Time Complexity (10 marks)**

**Problem:** Determine if all elements in an array are distinct.

**Algorithm:**
```
Algorithm: ElementUniqueness(A[0..n-1])
// Input: Array A[0..n-1]
// Output: true if all elements unique, false otherwise

for i ← 0 to n-2 do
    for j ← i+1 to n-1 do
        if A[i] = A[j] then
            return false
return true
```

**Time Complexity Derivation:**
- Number of comparisons = Σ(i=0 to n-2) Σ(j=i+1 to n-1) 1
- = Σ(i=0 to n-2) (n-1-i)
- = (n-1) + (n-2) + ... + 1
- = n(n-1)/2
- **Therefore: O(n²)**

**b) Algorithm Design and Analysis Process (10 marks)**

**Levitin's Algorithm Design & Analysis Framework:**

```
Understanding → Design → Analysis → Implementation
     ↑                                      ↓
     ← ← ← ← ← Verification ← ← ← ← ← ← ←
```

**Steps:**
1. **Understand the Problem** - Identify inputs, outputs, constraints
2. **Choose Design Strategy** - Brute force, divide & conquer, etc.
3. **Design Algorithm** - Specify step-by-step procedure
4. **Analyze Efficiency** - Time and space complexity
5. **Implement** - Code the algorithm
6. **Verify** - Test correctness and performance

---

## UNIT - II

### Question 3

**a) Brute-Force Selection Sort with Tracing (10 marks)**

**Brute-Force Approach:** Solve problem in most straightforward manner, typically by examining all possibilities.

**Selection Sort Algorithm:**
```
Algorithm: SelectionSort(A[0..n-1])
// Input: Array A[0..n-1]
// Output: Array A sorted in ascending order

for i ← 0 to n-2 do
    min ← i
    for j ← i+1 to n-1 do
        if A[j] < A[min] then
            min ← j
    swap A[i] and A[min]
```

**Tracing for [81, 43, 66, 87, 21, 34, 15]:**

Initial: [81, 43, 66, 87, 21, 34, 15]
Pass 1: [15, 43, 66, 87, 21, 34, 81] (min=15 at index 6)
Pass 2: [15, 21, 66, 87, 43, 34, 81] (min=21 at index 4)
Pass 3: [15, 21, 34, 87, 43, 66, 81] (min=34 at index 5)
Pass 4: [15, 21, 34, 43, 87, 66, 81] (min=43 at index 4)
Pass 5: [15, 21, 34, 43, 66, 87, 81] (min=66 at index 5)
Pass 6: [15, 21, 34, 43, 66, 81, 87] (min=81 at index 5)

**b) Recursive Binary Search with Complexity Proof (10 marks)**

**Algorithm:**
```
Algorithm: BinarySearch(A[l..r], K)
// Input: Sorted array A[l..r] and search key K
// Output: Index of K or -1 if not found

if l > r then
    return -1
mid ← ⌊(l+r)/2⌋
if K = A[mid] then
    return mid
else if K < A[mid] then
    return BinarySearch(A[l..mid-1], K)
else
    return BinarySearch(A[mid+1..r], K)
```

**Example:** Search for 5 in [1, 3, 5, 7, 9, 11]
- Call 1: l=0, r=5, mid=2, A[2]=5 ✓ Found!

**Worst Case Time Complexity Proof:**
Let W(n) = worst-case comparisons for array of size n
- W(n) = W(⌊n/2⌋) + 1 for n > 1
- W(1) = 1
- Solving: W(n) = ⌊log₂n⌋ + 1 = O(log n)

---

### Question 4

**a) Define: Granularity, Task Interaction Graph, Degree of Concurrency (06 marks)**

1. **Granularity:** The amount of computation performed by each parallel task. Fine-grain has small tasks, coarse-grain has large tasks.

2. **Task Interaction Graph:** A directed graph showing dependencies between parallel tasks, where edges represent data dependencies.

3. **Degree of Concurrency:** Maximum number of tasks that can be executed simultaneously at any point in the algorithm.

**b) Merge Sort Algorithm with Tracing (08 marks)**

**Algorithm:**
```
Algorithm: MergeSort(A[0..n-1])
// Input: Array A[0..n-1]
// Output: Sorted array A

if n > 1 then
    copy A[0..⌊n/2⌋-1] to B[0..⌊n/2⌋-1]
    copy A[⌊n/2⌋..n-1] to C[0..⌊n/2⌋-1]
    MergeSort(B[0..⌊n/2⌋-1])
    MergeSort(C[0..⌊n/2⌋-1])
    Merge(B, C, A)
```

**Tracing for [8, 3, 2, 9, 7, 1, 5, 4]:**

```
                [8,3,2,9,7,1,5,4]
                       /           \
            [8,3,2,9]                    [7,1,5,4]
             /      \                     /      \
        [8,3]        [2,9]         [7,1]        [5,4]
        /  \          /  \          /  \          /  \
      [8]  [3]      [2]  [9]      [7]  [1]      [5]  [4]
        \  /          \  /          \  /          \  /
        [3,8]        [2,9]        [1,7]        [4,5]
           \          /              \          /
           [2,3,8,9]                  [1,4,5,7]
                 \                      /
                  [1,2,3,4,5,7,8,9]
```

**c) Exhaustive Search Knapsack Problem (06 marks)**

**Exhaustive Search:** Generate all possible solutions and pick the best one.

**Given:** Capacity w=10
Items: {(7,$42), (3,$12), (4,$40), (5,$25)}

**All possible subsets:**
- {} : weight=0, value=$0
- {1}: weight=7, value=$42
- {2}: weight=3, value=$12  
- {3}: weight=4, value=$40
- {4}: weight=5, value=$25
- {1,2}: weight=10, value=$54 ✓
- {1,3}: weight=11 > 10 (invalid)
- {1,4}: weight=12 > 10 (invalid)
- {2,3}: weight=7, value=$52
- {2,4}: weight=8, value=$37
- {3,4}: weight=9, value=$65 ✓
- {2,3,4}: weight=12 > 10 (invalid)

**Optimal Solution:** Items {3,4} with weight=9, value=$65

---

## UNIT - III

### Question 5

**a) Topological Sorting Problem (10 marks)**

**Graph Construction:**
Vertices: {DS, DM, DAA, DBMS, DA}
Edges: DS→DAA, DM→DAA, DAA→DA, DBMS→DA

**Topological Order using DFS:**
1. DS → DM → DAA → DBMS → DA
2. DM → DS → DAA → DBMS → DA

**Minimum Condition:** The graph must be a DAG (Directed Acyclic Graph)

**b) Decrease and Conquer with Insertion Sort (10 marks)**

**Decrease and Conquer:** Reduce problem size by constant on each iteration.

**Variations:**
1. **Decrease by constant** - typically by 1
2. **Decrease by constant factor** - typically by half  
3. **Variable size decrease** - depends on input

**Insertion Sort Algorithm:**
```
Algorithm: InsertionSort(A[0..n-1])
for i ← 1 to n-1 do
    v ← A[i]
    j ← i-1
    while j ≥ 0 and A[j] > v do
        A[j+1] ← A[j]
        j ← j-1
    A[j+1] ← v
```

**Tracing for [189,145,168,190,129,134,117]:**
- Initial: [189,145,168,190,129,134,117]
- Pass 1: [145,189,168,190,129,134,117]
- Pass 2: [145,168,189,190,129,134,117]  
- Pass 3: [145,168,189,190,129,134,117]
- Pass 4: [129,145,168,189,190,134,117]
- Pass 5: [129,134,145,168,189,190,117]
- Pass 6: [117,129,134,145,168,189,190]

---

### Question 6

**a) Heap Construction Algorithm (10 marks)**

**Heap Definition:** A complete binary tree where each parent is ≥ its children (max-heap).

**Bottom-Up Heap Construction:**
```
Algorithm: HeapBottomUp(H[1..n])
for i ← ⌊n/2⌋ downto 1 do
    k ← i; v ← H[k]; heap ← false
    while not heap and 2*k ≤ n do
        j ← 2*k
        if j < n and H[j] < H[j+1] then j ← j+1
        if v ≥ H[j] then heap ← true
        else H[k] ← H[j]; k ← j
    H[k] ← v
```

**Construction for [14, 22, 19, 18, 17, 10]:**

```
Initial array: [14, 22, 19, 18, 17, 10]
      14
     /  \
    22   19  
   / \   /
  18 17 10

After heapifying index 2 (19):
      14
     /  \
    22   19  
   / \   /
  18 17 10

After heapifying index 1 (22):
      14
     /  \
    22   19  
   / \   /
  18 17 10

After heapifying index 0 (14):
      22
     /  \
    18   19  
   / \   /
  14 17 10
```

**Final Heap:** [22, 18, 19, 14, 17, 10]

**b) Johnson-Trotter Algorithm (10 marks)**

**Johnson-Trotter Algorithm** generates permutations with minimal changes (swap adjacent elements).

**Example for n=3:**
1. 1̅2̅3̅ (all arrows left initially)
2. 1̅3̅2̅ (swap 2,3)
3. 3̅1̅2̅ (swap 1,3) 
4. 3̅2̅1̅ (swap 1,2)
5. 2̅3̅1̅ (swap 3,2)
6. 2̅1̅3̅ (swap 3,1)

**Key Properties:**
- Each step swaps adjacent elements
- Direction arrows indicate movement
- Mobile element: largest element that can move in its direction

---

## UNIT - IV

### Question 7

**a) Dijkstra's Algorithm from vertex B (10 marks)**

**Algorithm steps:**
1. Initialize distances: d[B]=0, others=∞
2. Mark B as processed
3. Update neighbors of B
4. Select unprocessed vertex with minimum distance
5. Repeat until all processed

*Note: Without the actual graph diagram, I cannot provide specific shortest paths. The algorithm would systematically update distances and track predecessors to build shortest path tree.*

**b) Warshall's Algorithm for Transitive Closure (10 marks)**

**Warshall's Algorithm:**
```
Algorithm: Warshall(A[1..n,1..n])
// Input: Adjacency matrix A
// Output: Transitive closure matrix

R⁰ ← A
for k ← 1 to n do
    for i ← 1 to n do
        for j ← 1 to n do
            R^k[i,j] ← R^(k-1)[i,j] or (R^(k-1)[i,k] and R^(k-1)[k,j])
return R^n
```

**Process:** 
R^k[i,j] = 1 if there's a path from i to j using vertices {1,2,...,k} as intermediate vertices.

---

### Question 8

**a) Open Hashing with Hash Function h(k)=k mod 11 (10 marks)**

**Input sequence:** (30,20,56,75,31,19)

**Hash Table Construction:**
- h(30) = 30 mod 11 = 8 → Table[8] = [30]
- h(20) = 20 mod 11 = 9 → Table[9] = [20]  
- h(56) = 56 mod 11 = 1 → Table[1] = [56]
- h(75) = 75 mod 11 = 9 → Table[9] = [20,75] (chain)
- h(31) = 31 mod 11 = 9 → Table[9] = [20,75,31] (chain)  
- h(19) = 19 mod 11 = 8 → Table[8] = [30,19] (chain)

**Hash Table:**
```
0: []
1: [56]        → 1 comparison for successful search
2: []
...
8: [30,19]     → 2 comparisons max for successful search  
9: [20,75,31]  → 3 comparisons max for successful search
10: []
```

**Maximum key comparisons in successful search:** 3 (for keys 75 or 31)

**b) Distribution Counting Sort (10 marks)**

**Algorithm:**
```
Algorithm: DistributionCounting(A[0..n-1], l, u)
// Input: Array A with values in range [l..u]
// Create frequency array
for i ← l to u do D[i] ← 0
for j ← 0 to n-1 do D[A[j]] ← D[A[j]] + 1
// Transform to cumulative frequencies  
for i ← l+1 to u do D[i] ← D[i-1] + D[i]
// Distribute elements
for j ← n-1 downto 0 do
    B[D[A[j]]-1] ← A[j]
    D[A[j]] ← D[A[j]] - 1
```

**For [13,11,12,13,12,12]:**

1. **Count frequencies:**
   - D[11]=1, D[12]=3, D[13]=2

2. **Cumulative frequencies:**
   - D[11]=1, D[12]=4, D[13]=6

3. **Final sorted array:** [11,12,12,12,13,13]

---

## UNIT - V

### Question 9

**a) Subset-Sum using Backtracking (10 marks)**

**Problem:** S = {3, 5, 6, 7}, d = 15

**State-space tree for backtracking:**
```
                  {}
                 /  \
             {3}/    \∅
              /        \
          {3,5}        {5}
          /   \        /   \  
      {3,5,6} {3,5} {5,6} {5}
      /   \   /  \   /  \  /  \
   {3,5,6,7}{3,5,6}{3,5,7}{3,5}{5,6,7}{5,6}{5,7}{5}
     Sum=21  Sum=14  Sum=15✓ Sum=8  Sum=18  Sum=11  Sum=12  Sum=5
```

**Solution found:** {3, 5, 7} with sum = 15

**Algorithm backtracks when:**
- Current sum > target (15)
- No remaining elements can complete the sum

**b) 0/1 Knapsack using Branch and Bound (10 marks)**

**Given Data:**
- Items: 1, 2, 3, 4
- Weights: [10, 7, 8, 4]  
- Values: [$100, $63, $56, $12]
- Capacity W = 16

**Step 1: Calculate Value-to-Weight Ratios**
- Item 1: $100/10 = 10.0
- Item 2: $63/7 = 9.0
- Item 3: $56/8 = 7.0
- Item 4: $12/4 = 3.0

**Sorted by ratio (descending): Item 1, Item 2, Item 3, Item 4**

**Step 2: Branch and Bound Tree**

**Node Structure:** (level, weight, value, bound, items_included)

**Root Node Calculation:**
- Current: weight=0, value=0
- Upper Bound (using fractional knapsack):
  - Include Item 1: weight=10, value=$100, remaining_capacity=6
  - Include Item 2 partially: 6/7 × $63 = $54
  - Upper Bound = $100 + $54 = $154

**Branch and Bound Tree:**

```
                    Root (0, 0, 0, $154, {})
                   /                    \
            Include Item 1                Exclude Item 1
         (1, 10, $100, $147, {1})       (1, 0, 0, $131, {})
            /              \               /              \
     Include Item 2    Exclude Item 2   Include Item 2  Exclude Item 2
   (2, 17, -, -, -)   (2, 10, $100,    (2, 7, $63,     (2, 0, 0,
      INFEASIBLE      $156, {1})        $131, {2})      $68, {})
                      /         \        /         \      /         \
              Include Item 3  Exclude   Include   Exclude Include  Exclude
              (3, 18, -, -)   Item 3    Item 3    Item 3  Item 3   Item 3
                INFEASIBLE   (3, 10,    (3, 15,   (3, 7,  (3, 8,   (3, 0,
                             $100,      -, -)     $63,    $56,     0,
                             $144, {1}) INFEAS.   $75,{2}) $68,{3}) $12,{})
```

**Detailed Node Calculations:**

**Node (1, 10, $100, $147, {1}):** Include Item 1
- Current: weight=10, value=$100
- Remaining capacity=6
- Best remaining: 6/7 × $63 = $54 (partial Item 2)
- Upper Bound = $100 + $54 = $154... Wait, let me recalculate this properly.

Let me recalculate with the correct fractional knapsack approach:

**Upper Bound Calculation for Root:**
Remaining capacity = 16
- Take Item 1 completely: weight=10, value=$100, remaining=6  
- Take Item 2 partially: 6/7 × $63 = $54
- Upper Bound = $100 + $54 = $154

**Node (1, 10, $100, {1}):** Include Item 1
- Current: weight=10, value=$100, remaining=6
- Best from remaining items (2,3,4) with capacity 6:
  - Can't take Item 2 (weight=7 > 6)
  - Can't take Item 3 (weight=8 > 6)  
  - Can take Item 4: weight=4, value=$12, remaining=2
  - Upper Bound = $100 + $12 = $112

**Node (1, 0, 0, {}):** Exclude Item 1  
- Current: weight=0, value=0, remaining=16
- Best from items (2,3,4) with capacity 16:
  - Take Item 2: weight=7, value=$63, remaining=9
  - Take Item 3: weight=8, value=$56, remaining=1  
  - Take Item 4 partially: 1/4 × $12 = $3
  - Upper Bound = $63 + $56 + $3 = $122

**Complete Solution Tree:**

```
                Root (0, 0, $154)
               /                \
        (1, 10, $100, $112)    (1, 0, 0, $122)
           /           \           /           \
    (2,17,INFEAS)  (2,10,$100)  (2,7,$63)   (2,0,0,$68)
                      /    \      /    \       /      \
                     ...   (3,10, (3,15,    (3,8,$56) (3,0,0)
                           $100,  INFEAS)      /  \      /   \
                           $112)            (4,12, (4,8,  (4,4, (4,0,
                           /  \             $68,   $56,   $12,  0,
                      (4,14, (4,10,        $68)   $56)   $12)  $0)
                       $112,  $100,
                       $112)  $100)
```

**Feasible Solutions Found:**
1. {1, 4}: weight=14, value=$112
2. {2, 3}: weight=15, value=$119  ✓ **OPTIMAL**
3. {2, 4}: weight=11, value=$75
4. {3, 4}: weight=12, value=$68
5. {4}: weight=4, value=$12

**Branch and Bound Process:**
1. Start with upper bound $154
2. Explore nodes in best-first order (highest upper bound)
3. Prune branches where upper bound ≤ current best solution
4. Update best solution when better feasible solution found

**Final Answer:**
- **Optimal Solution:** Include items {2, 3}
- **Total Weight:** 7 + 8 = 15 ≤ 16 ✓
- **Maximum Value:** $63 + $56 = **$119**

---

### Question 10

**a) P, NP, NP-Complete, NP-Hard Problems (10 marks)**

**P (Polynomial Time):** Problems solvable in polynomial time by deterministic algorithm.
- Examples: Sorting, Shortest path, Matrix multiplication

**NP (Nondeterministic Polynomial):** Problems verifiable in polynomial time.
- Examples: Subset-sum, Hamiltonian cycle, Graph coloring

**NP-Complete:** Problems that are both in NP and NP-hard.
- Examples: SAT, Traveling Salesman, Clique
- If any NP-complete problem has polynomial solution, then P = NP

**NP-Hard:** At least as hard as any problem in NP.
- May not be in NP themselves
- Examples: Halting problem, some optimization problems

**Relationships:**
- P ⊆ NP
- If P ≠ NP, then P ∩ NP-Complete = ∅
- NP-Complete ⊆ NP-Hard

**b) Traveling Salesman using Branch and Bound (10 marks)**

*Note: Without the specific TSP instance (distance matrix), I'll outline the general approach:*

**Branch and Bound for TSP:**
1. **Lower bound:** Use minimum spanning tree + minimum edges
2. **Branching:** Fix edges in the tour systematically  
3. **Bounding:** Calculate lower bound for each subproblem
4. **Pruning:** Eliminate branches with bound ≥ current best tour cost

**General steps:**
- Start with all possible tours
- Branch by including/excluding specific edges
- Calculate lower bounds using MST-based or assignment-based methods
- Maintain best tour found so far
- Prune branches that cannot improve current best

---

**Note:** This solution set follows Anany Levitin's algorithmic approach and analysis methodology as presented in "Introduction to the Design and Analysis of Algorithms." The solutions emphasize clear algorithmic thinking, proper complexity analysis, and systematic problem-solving techniques.