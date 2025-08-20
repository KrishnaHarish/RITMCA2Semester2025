# MCA22 Design and Analysis of Algorithms - Complete Solutions
**Semester End Examinations – Sept/Oct 2024**

---

## UNIT - I

### Question 1

#### a) Explain the term Algorithm. Explain the characteristics of a good algorithm? (CO1 - 5 marks)

**Algorithm Definition:**
An algorithm is a finite sequence of well-defined, unambiguous instructions or steps that, when executed, solves a specific problem or performs a particular task. It takes input, processes it through a series of computational steps, and produces the desired output.

**Characteristics of a Good Algorithm:**

1. **Finiteness**: The algorithm must terminate after a finite number of steps
2. **Definiteness**: Each step must be precisely defined and unambiguous
3. **Input**: Should have zero or more well-defined inputs
4. **Output**: Must produce one or more well-defined outputs
5. **Effectiveness**: Each operation must be basic enough to be carried out in principle
6. **Efficiency**: Should use minimal time and space resources
7. **Generality**: Should be applicable to a set of inputs, not just one specific case

#### b) List and explain problem types in ADA (CO1 - 5 marks)

**Problem Types in Algorithm Design and Analysis:**

1. **Sorting Problems**: Arranging elements in a specific order (ascending/descending)
   - Examples: Bubble sort, Quick sort, Merge sort

2. **Searching Problems**: Finding specific elements in a data structure
   - Examples: Linear search, Binary search

3. **String Processing Problems**: Manipulating and analyzing text strings
   - Examples: Pattern matching, String compression

4. **Graph Problems**: Working with vertices and edges
   - Examples: Shortest path, Minimum spanning tree

5. **Geometric Problems**: Dealing with geometric objects and their properties
   - Examples: Convex hull, Closest pair of points

6. **Numerical Problems**: Mathematical computations
   - Examples: Matrix multiplication, GCD calculation

7. **Combinatorial Problems**: Dealing with arrangements and selections
   - Examples: Permutations, Combinations, Knapsack problem

8. **Optimization Problems**: Finding the best solution among all possible solutions
   - Examples: Traveling salesman, Job scheduling

#### c) Write an Algorithm for Sequential Search, Discuss Worst case, Best Case and average-Case Efficiencies (CO1 - 10 marks)

**Sequential Search Algorithm:**

```
Algorithm: SequentialSearch(A[0..n-1], K)
// Searches for key K in array A of size n
// Input: Array A[0..n-1] and search key K
// Output: Index of K if found, -1 otherwise

begin
    for i ← 0 to n-1 do
        if A[i] = K then
            return i
        end if
    end for
    return -1
end
```

**Time Complexity Analysis:**

1. **Best Case: O(1)**
   - Occurs when the key is found at the first position (i=0)
   - Only 1 comparison is needed

2. **Worst Case: O(n)**
   - Occurs when:
     - Key is at the last position (n comparisons)
     - Key is not present in the array (n comparisons)

3. **Average Case: O(n/2) = O(n)**
   - Assuming the key is equally likely to be at any position
   - Expected number of comparisons = (1+2+3+...+n)/n = (n+1)/2
   - For unsuccessful search: Always n comparisons

**Space Complexity: O(1)** - Uses constant extra space

---

### Question 2

#### a) Develop an algorithm for element uniqueness problem and derive its time complexity (CO1 - 10 marks)

**Element Uniqueness Problem:**
Given an array of n elements, determine whether all elements are unique (no duplicates).

**Algorithm 1: Brute Force Approach**

```
Algorithm: ElementUniqueness_BruteForce(A[0..n-1])
// Input: Array A of n elements
// Output: true if all elements are unique, false otherwise

begin
    for i ← 0 to n-2 do
        for j ← i+1 to n-1 do
            if A[i] = A[j] then
                return false
            end if
        end for
    end for
    return true
end
```

**Time Complexity Derivation:**
- Nested loops: outer loop runs (n-1) times, inner loop runs (n-1-i) times
- Total comparisons = Σ(i=0 to n-2) Σ(j=i+1 to n-1) 1
- = Σ(i=0 to n-2) (n-1-i) = (n-1) + (n-2) + ... + 1
- = (n-1)(n)/2 = n(n-1)/2
- **Time Complexity: O(n²)**

**Algorithm 2: Sorting-based Approach**

```
Algorithm: ElementUniqueness_Sorting(A[0..n-1])
begin
    Sort(A)  // O(n log n)
    for i ← 0 to n-2 do
        if A[i] = A[i+1] then
            return false
        end if
    end for
    return true
end
```

**Time Complexity: O(n log n)** due to sorting

#### b) Explain the algorithm design and analysis process with the help of a flow chart (CO1 - 10 marks)

**Algorithm Design and Analysis Process:**

The process involves several stages from problem understanding to implementation:

```
[Problem Statement]
        ↓
[Understand the Problem]
        ↓
[Decide on Computational Means]
        ↓
[Exact vs Approximate Algorithm?]
   /                    \
[Exact]              [Approximate]
   ↓                      ↓
[Algorithm Design Strategy]
   ↓
[Design Algorithm]
   ↓
[Prove Correctness]
   ↓
[Analyze Efficiency]
   ↓
[Code the Algorithm]
   ↓
[Verify/Test]
```

**Detailed Steps:**

1. **Problem Understanding**: Clearly define input, output, and constraints
2. **Algorithm Design**: Choose appropriate technique (brute force, divide & conquer, etc.)
3. **Correctness Proof**: Ensure algorithm produces correct output for all valid inputs
4. **Efficiency Analysis**: 
   - Time complexity (Big O, Θ, Ω notations)
   - Space complexity
5. **Implementation**: Code in chosen programming language
6. **Testing**: Verify with test cases
7. **Optimization**: Improve if necessary

---

## UNIT - II

### Question 3

#### a) Define the Brute–Force approach for problem solving. Develop Selection sort algorithm and trace it (CO2 - 10 marks)

**Brute-Force Approach:**
A straightforward problem-solving technique that tries all possible solutions until finding the correct one. It relies on raw computing power rather than advanced techniques to solve problems.

**Characteristics:**
- Simple and straightforward
- Usually the first approach that comes to mind
- Often inefficient but reliable
- Useful for small problem instances

**Selection Sort Algorithm:**

```
Algorithm: SelectionSort(A[0..n-1])
// Input: Array A of n elements
// Output: Array A sorted in ascending order

begin
    for i ← 0 to n-2 do
        min_index ← i
        for j ← i+1 to n-1 do
            if A[j] < A[min_index] then
                min_index ← j
            end if
        end for
        swap(A[i], A[min_index])
    end for
end
```

**Tracing Selection Sort on [81, 43, 66, 87, 21, 34, 15]:**

```
Initial: [81, 43, 66, 87, 21, 34, 15]

Pass 1 (i=0): Find minimum from index 0-6
- Minimum = 15 (at index 6)
- Swap A[0] with A[6]: [15, 43, 66, 87, 21, 34, 81]

Pass 2 (i=1): Find minimum from index 1-6  
- Minimum = 21 (at index 4)
- Swap A[1] with A[4]: [15, 21, 66, 87, 43, 34, 81]

Pass 3 (i=2): Find minimum from index 2-6
- Minimum = 34 (at index 5)
- Swap A[2] with A[5]: [15, 21, 34, 87, 43, 66, 81]

Pass 4 (i=3): Find minimum from index 3-6
- Minimum = 43 (at index 4)
- Swap A[3] with A[4]: [15, 21, 34, 43, 87, 66, 81]

Pass 5 (i=4): Find minimum from index 4-6
- Minimum = 66 (at index 5)
- Swap A[4] with A[5]: [15, 21, 34, 43, 66, 87, 81]

Pass 6 (i=5): Find minimum from index 5-6
- Minimum = 81 (at index 6)
- Swap A[5] with A[6]: [15, 21, 34, 43, 66, 81, 87]

Final: [15, 21, 34, 43, 66, 81, 87]
```

**Time Complexity: O(n²)** - regardless of input
**Space Complexity: O(1)** - in-place sorting

#### b) Explain the recursive binary search algorithm with an example. Prove worst-case time complexity is log₂n (CO2 - 10 marks)

**Recursive Binary Search Algorithm:**

```
Algorithm: BinarySearch(A[low..high], K)
// Input: Sorted array A, search key K, indices low and high
// Output: Index of K if found, -1 otherwise

begin
    if low > high then
        return -1
    else
        mid ← ⌊(low + high)/2⌋
        if K = A[mid] then
            return mid
        else if K < A[mid] then
            return BinarySearch(A[low..mid-1], K)
        else
            return BinarySearch(A[mid+1..high], K)
        end if
    end if
end
```

**Example: Search for K=7 in A=[1, 3, 5, 7, 9, 11, 13, 15]**

```
Call 1: BinarySearch(A[0..7], 7)
- low=0, high=7, mid=3
- A[3]=7, K=7 → Found! Return 3

If searching for K=5:
Call 1: BinarySearch(A[0..7], 5)
- low=0, high=7, mid=3
- A[3]=7, K=5 < 7 → Search left half

Call 2: BinarySearch(A[0..2], 5)  
- low=0, high=2, mid=1
- A[1]=3, K=5 > 3 → Search right half

Call 3: BinarySearch(A[2..2], 5)
- low=2, high=2, mid=2  
- A[2]=5, K=5 → Found! Return 2
```

**Proof of Worst-Case Time Complexity O(log₂n):**

Let T(n) be the time complexity for an array of size n.

**Recurrence Relation:**
T(n) = T(n/2) + O(1)

**Base Case:**
T(1) = O(1)

**Solving the Recurrence:**
- At each recursive call, the problem size is halved
- Maximum number of recursive calls = ⌈log₂n⌉
- Each call does O(1) work (comparison and index calculation)

**Mathematical Proof:**
- After k recursive calls, array size = n/2^k
- When n/2^k = 1, we reach the base case
- This happens when k = log₂n
- Total time = k × O(1) = O(log₂n)

Therefore, **worst-case time complexity is O(log₂n)**.

---

### Question 4

#### a) Explain the following terms: i) Granularity, ii) Task Interaction Graph iii) Degree of concurrency (CO2 - 6 marks)

**i) Granularity:**
Granularity refers to the size or amount of work performed by each parallel task in a parallel algorithm.

- **Fine Granularity**: Small tasks, high communication overhead, better load balancing
- **Coarse Granularity**: Large tasks, low communication overhead, potential load imbalancing
- **Medium Granularity**: Balance between the two extremes

**Example**: In parallel matrix multiplication:
- Fine: Each element calculation is a separate task
- Coarse: Each row calculation is a separate task

**ii) Task Interaction Graph:**
A directed graph that represents the dependencies between tasks in a parallel algorithm.

- **Nodes**: Represent individual tasks
- **Edges**: Represent dependencies (task A must complete before task B)
- Used to analyze parallelism and identify critical paths
- Helps in scheduling and load balancing

**iii) Degree of Concurrency:**
The maximum number of tasks that can be executed simultaneously at any given time.

- **Maximum Degree of Concurrency**: Peak parallelism in the algorithm
- **Average Degree of Concurrency**: Total work divided by critical path length
- Limited by dependencies and available processors

#### b) Develop an algorithm for Merge Sort. Apply the algorithm to sort the given list- 8, 3, 2, 9, 7, 1, 5, 4 (CO2 - 8 marks)

**Merge Sort Algorithm:**

```
Algorithm: MergeSort(A[low..high])
// Input: Array A with indices low and high
// Output: Array A sorted in ascending order

begin
    if low < high then
        mid ← ⌊(low + high)/2⌋
        MergeSort(A[low..mid])
        MergeSort(A[mid+1..high])
        Merge(A[low..mid], A[mid+1..high])
    end if
end

Algorithm: Merge(A[low..mid], A[mid+1..high])
// Merges two sorted subarrays into one sorted array

begin
    // Create temporary arrays
    L[0..mid-low], R[0..high-mid-1]
    
    // Copy data to temporary arrays
    for i ← 0 to mid-low do
        L[i] ← A[low+i]
    end for
    for j ← 0 to high-mid-1 do  
        R[j] ← A[mid+1+j]
    end for
    
    // Merge the temporary arrays back
    i ← 0, j ← 0, k ← low
    while i ≤ mid-low and j ≤ high-mid-1 do
        if L[i] ≤ R[j] then
            A[k] ← L[i]
            i ← i + 1
        else
            A[k] ← R[j]
            j ← j + 1
        end if
        k ← k + 1
    end while
    
    // Copy remaining elements
    while i ≤ mid-low do
        A[k] ← L[i]
        i ← i + 1, k ← k + 1
    end while
    while j ≤ high-mid-1 do
        A[k] ← R[j] 
        j ← j + 1, k ← k + 1
    end while
end
```

**Tracing Merge Sort on [8, 3, 2, 9, 7, 1, 5, 4]:**

```
Initial: [8, 3, 2, 9, 7, 1, 5, 4]

Level 1: Divide
[8, 3, 2, 9] | [7, 1, 5, 4]

Level 2: Divide  
[8, 3] [2, 9] | [7, 1] [5, 4]

Level 3: Divide
[8] [3] [2] [9] | [7] [1] [5] [4]

Level 3: Merge (Conquer)
[3, 8] [2, 9] | [1, 7] [4, 5]

Level 2: Merge
[2, 3, 8, 9] | [1, 4, 5, 7]

Level 1: Merge
[1, 2, 3, 4, 5, 7, 8, 9]
```

**Time Complexity**: O(n log n) in all cases
**Space Complexity**: O(n) for temporary arrays

#### c) Define Exhaustive search. Solve the Knapsack problem using exhaustive search (CO2 - 6 marks)

**Exhaustive Search Definition:**
Exhaustive search (also called brute force) is a problem-solving technique that systematically examines all possible solutions to find the optimal one. It guarantees finding the correct answer but may be computationally expensive.

**0/1 Knapsack Problem Solution using Exhaustive Search:**

Given:
- Capacity W = 10
- Items: {(7,$42), (3,$12), (4,$40), (5,$25)}

**Approach**: Generate all 2^n = 16 possible subsets and check which ones fit in the knapsack.

**All Possible Combinations:**

| Subset | Items | Weight | Value | Valid? |
|--------|--------|---------|--------|---------|
| {} | None | 0 | $0 | ✓ |
| {1} | Item 1 | 7 | $42 | ✓ |
| {2} | Item 2 | 3 | $12 | ✓ |
| {3} | Item 3 | 4 | $40 | ✓ |
| {4} | Item 4 | 5 | $25 | ✓ |
| {1,2} | Items 1,2 | 10 | $54 | ✓ |
| {1,3} | Items 1,3 | 11 | $82 | ✗ |
| {1,4} | Items 1,4 | 12 | $67 | ✗ |
| {2,3} | Items 2,3 | 7 | $52 | ✓ |
| {2,4} | Items 2,4 | 8 | $37 | ✓ |
| {3,4} | Items 3,4 | 9 | $65 | ✓ |
| {1,2,3} | Items 1,2,3 | 14 | $94 | ✗ |
| {1,2,4} | Items 1,2,4 | 15 | $79 | ✗ |
| {1,3,4} | Items 1,3,4 | 16 | $107 | ✗ |
| {2,3,4} | Items 2,3,4 | 12 | $77 | ✗ |
| {1,2,3,4} | All items | 19 | $119 | ✗ |

**Optimal Solution**: Items {3,4} with total weight = 9 ≤ 10 and maximum value = $65

**Time Complexity**: O(2^n) - exponential
**Space Complexity**: O(1) if done iteratively

---

## UNIT - III

### Question 5

#### a) Construct a graph and find the topological order for the given scenario (CO3 - 10 marks)

**Given Dependencies:**
- DAA requires: DS, DM (prerequisites)
- DA requires: DBMS, DAA (prerequisites)

**Constructed Graph:**
```
DM ──┐
     ├──→ DAA ──┐
DS ──┘          ├──→ DA
                │
DBMS ───────────┘
```

**Adjacency Representation:**
- DM → DAA
- DS → DAA  
- DAA → DA
- DBMS → DA

**Finding Topological Order using DFS:**

**Algorithm: DFS-based Topological Sort**
1. Perform DFS on all unvisited vertices
2. When finishing a vertex, push it to a stack
3. Pop all elements from stack to get topological order

**Step-by-step execution:**
```
1. Start DFS from DM: DM → DAA → DA (finish DA, then DAA, then DM)
2. Continue with unvisited DS: DS → (DAA already visited)
3. Continue with unvisited DBMS: DBMS → (DA already visited)

Stack operations:
- Push DA (finished first)
- Push DAA  
- Push DM
- Push DS (when DS finishes)
- Push DBMS (when DBMS finishes)
```

**Possible Topological Orders:**
1. **DM, DS, DBMS, DAA, DA**
2. **DS, DM, DBMS, DAA, DA**  
3. **DBMS, DM, DS, DAA, DA**

**Minimum Condition for Topological Sorting:**
The graph must be a **Directed Acyclic Graph (DAG)**. If the graph contains any cycle, topological sorting is impossible because circular dependencies cannot be resolved.

#### b) What is meant by decrease and conquer technique and explain its variations. Write down an algorithm for insertion sort (CO3 - 10 marks)

**Decrease and Conquer Technique:**
A algorithm design technique that solves a problem by:
1. Reducing the problem instance to a smaller instance of the same problem
2. Solving the smaller instance  
3. Extending the solution to solve the original problem

**Three Variations:**

**1. Decrease by a Constant (usually by 1):**
- Reduce problem size by a fixed amount each time
- Examples: Insertion sort, Linear search, Factorial calculation
- Recurrence: T(n) = T(n-1) + f(n)

**2. Decrease by a Constant Factor (usually by half):**
- Reduce problem size by dividing by a constant
- Examples: Binary search, Russian peasant multiplication
- Recurrence: T(n) = T(n/2) + f(n)

**3. Variable Size Decrease:**
- Reduction amount varies based on input
- Examples: Euclidean algorithm for GCD, Selection sort
- More complex recurrence relations

**Insertion Sort Algorithm:**

```
Algorithm: InsertionSort(A[0..n-1])
// Input: Array A of n elements  
// Output: Array A sorted in ascending order

begin
    for i ← 1 to n-1 do
        key ← A[i]
        j ← i - 1
        
        // Move elements greater than key one position ahead
        while j ≥ 0 and A[j] > key do
            A[j+1] ← A[j]
            j ← j - 1
        end while
        
        A[j+1] ← key
    end for
end
```

**Sorting [189, 145, 168, 190, 129, 134, 117] using Insertion Sort:**

```
Initial: [189, 145, 168, 190, 129, 134, 117]

i=1, key=145:
- Compare 145 with 189: 145 < 189, shift 189 right
- Insert 145 at position 0: [145, 189, 168, 190, 129, 134, 117]

i=2, key=168:  
- Compare 168 with 189: 168 < 189, shift 189 right
- Compare 168 with 145: 168 > 145, stop
- Insert 168 at position 1: [145, 168, 189, 190, 129, 134, 117]

i=3, key=190:
- Compare 190 with 189: 190 > 189, no shift needed
- Array remains: [145, 168, 189, 190, 129, 134, 117]

i=4, key=129:
- Shift 190, 189, 168, 145 all right (all > 129)
- Insert 129 at position 0: [129, 145, 168, 189, 190, 134, 117]

i=5, key=134:
- Shift 190, 189, 168, 145 right (all > 134)  
- Compare 134 with 129: 134 > 129, stop
- Insert 134 at position 1: [129, 134, 145, 168, 189, 190, 117]

i=6, key=117:
- Shift all elements right (all > 117)
- Insert 117 at position 0: [117, 129, 134, 145, 168, 189, 190]

Final: [117, 129, 134, 145, 168, 189, 190]
```

**Time Complexity:**
- Best case: O(n) - already sorted array
- Average case: O(n²)  
- Worst case: O(n²) - reverse sorted array

**Space Complexity: O(1)** - in-place sorting

---

### Question 6

#### a) Define heap. Write down a bottom up algorithm to construct a heap. Construct a heap for the list 14, 22, 19, 18, 17, 10 (CO3 - 10 marks)

**Heap Definition:**
A heap is a complete binary tree that satisfies the heap property:
- **Max-Heap**: Parent node ≥ both children  
- **Min-Heap**: Parent node ≤ both children

A heap can be efficiently represented using an array where for element at index i:
- Left child: 2i + 1
- Right child: 2i + 2  
- Parent: ⌊(i-1)/2⌋

**Bottom-Up Heap Construction Algorithm:**

```
Algorithm: BuildMaxHeap(A[0..n-1])
// Input: Array A of n elements
// Output: Array A rearranged as a max-heap

begin
    // Start from the last non-leaf node and heapify upwards
    for i ← ⌊n/2⌋ - 1 down to 0 do
        MaxHeapify(A, i, n)
    end for
end

Algorithm: MaxHeapify(A, i, heap_size)
// Maintains max-heap property for subtree rooted at index i

begin
    left ← 2*i + 1
    right ← 2*i + 2
    largest ← i
    
    if left < heap_size and A[left] > A[largest] then
        largest ← left
    end if
    
    if right < heap_size and A[right] > A[largest] then
        largest ← right  
    end if
    
    if largest ≠ i then
        swap(A[i], A[largest])
        MaxHeapify(A, largest, heap_size)
    end if
end
```

**Building Max-Heap for [14, 22, 19, 18, 17, 10]:**

**Initial Array**: [14, 22, 19, 18, 17, 10]
```
        14
       /  \
     22    19  
    / \   /
   18 17 10
```

**Step 1**: Start from last non-leaf node (i = ⌊6/2⌋ - 1 = 2)
- Index 2 (value 19): Compare with children (only left child 10)
- 19 > 10, no change needed
- Array: [14, 22, 19, 18, 17, 10]

**Step 2**: i = 1 (value 22)
- Compare 22 with children: left=18, right=17
- 22 > max(18,17), no change needed  
- Array: [14, 22, 19, 18, 17, 10]

**Step 3**: i = 0 (value 14) - Root node
- Compare 14 with children: left=22, right=19
- 22 is largest, swap 14 and 22
- Array: [22, 14, 19, 18, 17, 10]

```
        22
       /  \
     14    19
    / \   /  
   18 17 10
```

- Now heapify subtree rooted at index 1 (value 14)
- Compare 14 with children: left=18, right=17  
- 18 is largest, swap 14 and 18
- Array: [22, 18, 19, 14, 17, 10]

**Final Max-Heap**: [22, 18, 19, 14, 17, 10]

```
        22
       /  \
     18    19
    / \   /
   14 17 10  
```

**Verification**: Each parent ≥ its children
- 22 ≥ 18, 19 ✓
- 18 ≥ 14, 17 ✓  
- 19 ≥ 10 ✓

#### b) Discuss with example the methods of minimal change and Johnson Trotter algorithm for generating permutations (CO3 - 10 marks)

**Minimal Change Method:**
A permutation generation technique where successive permutations differ by exactly one swap of adjacent elements.

**Johnson-Trotter Algorithm:**
A specific minimal change algorithm that generates all permutations of n elements where each permutation differs from the previous one by swapping exactly one pair of adjacent elements.

**Key Concepts:**
1. **Mobile Element**: An element is mobile if it's larger than the adjacent element it points to
2. **Direction**: Each element has a direction (left ← or right →)
3. **Largest Mobile**: The largest element among all mobile elements

**Algorithm Steps:**
1. Initialize: All elements point left (←)
2. Find the largest mobile element
3. Swap it with the adjacent element it points to
4. Reverse the direction of all elements larger than the swapped element
5. Repeat until no mobile elements exist

**Example: Generate permutations of {1, 2, 3}**

**Initial State**: ←1 ←2 ←3
- Mobile elements: 2 (larger than 1), 3 (larger than 2)
- Largest mobile: 3

**Step 1**: Swap 3 with 2
- Result: ←1 ←3 ←2
- Reverse direction of elements > 3: none
- Current permutation: (1, 3, 2)

**Step 2**: Find largest mobile
- Mobile elements: 3 (larger than 1), 2 (can't move left)
- Largest mobile: 3
- Swap 3 with 1: ←3 ←1 ←2
- Reverse direction of elements > 3: none  
- Current permutation: (3, 1, 2)

**Step 3**: Find largest mobile  
- Mobile elements: none can move left effectively
- Check directions: 3 points left (can't move), 1 points left, 2 points left
- Re-evaluate: 1 can move left if 3 is larger, 2 can move left if 1 is larger
- Largest mobile: 2
- Operations continue...

**Complete sequence for {1, 2, 3}:**
1. (1, 2, 3) - Initial
2. (1, 3, 2) - Swap 2,3  
3. (3, 1, 2) - Swap 1,3
4. (3, 2, 1) - Swap 1,2
5. (2, 3, 1) - Swap 3,2  
6. (2, 1, 3) - Swap 1,3

**Properties:**
- Generates all n! permutations
- Each permutation differs by exactly one adjacent swap
- Time complexity: O(n!) for generating all permutations
- Space complexity: O(n) for storing directions

---

## UNIT - IV

### Question 7

#### a) Apply Dijkstra's algorithm to find the shortest path from vertex B to all other vertices in the following graph and list out all the shortest paths (CO4 - 10 marks)

**Note**: Since the graph is not provided in the question, I'll demonstrate Dijkstra's algorithm using a sample weighted graph.

**Sample Graph:**
```
    2     3
A ----B ----C
|    /|    /|
|4  / |2  / |1
| /   |  /  |
D     E    F
  \   |   /
   \3 |1 /2
    \ | /
      G
```

**Dijkstra's Algorithm:**

```
Algorithm: Dijkstra(G, source)
// Input: Weighted graph G and source vertex
// Output: Shortest distances from source to all vertices

begin
    for each vertex v in G do
        dist[v] ← ∞
        prev[v] ← undefined
    end for
    
    dist[source] ← 0
    Q ← all vertices in G
    
    while Q is not empty do
        u ← vertex in Q with minimum dist[u]
        remove u from Q
        
        for each neighbor v of u do
            alt ← dist[u] + weight(u, v)
            if alt < dist[v] then
                dist[v] ← alt
                prev[v] ← u
            end if
        end for
    end while
end
```

**Execution from vertex B:**

**Initialization:**
- dist[B] = 0
- dist[A] = dist[C] = dist[D] = dist[E] = dist[F] = dist[G] = ∞
- Q = {A, B, C, D, E, F, G}

**Iteration 1:** Select B (dist = 0)
- Update A: dist[A] = min(∞, 0+2) = 2
- Update C: dist[C] = min(∞, 0+3) = 3  
- Update D: dist[D] = min(∞, 0+4) = 4
- Update E: dist[E] = min(∞, 0+2) = 2
- Q = {A, C, D, E, F, G}, distances: A=2, C=3, D=4, E=2, F=∞, G=∞

**Iteration 2:** Select A or E (both dist = 2), choose A
- Update D: dist[D] = min(4, 2+4) = 4 (no change)
- Q = {C, D, E, F, G}

**Iteration 3:** Select E (dist = 2)
- Update C: dist[C] = min(3, 2+2) = 3 (no change)
- Update G: dist[G] = min(∞, 2+1) = 3
- Q = {C, D, F, G}

**Iteration 4:** Select C or G (both dist = 3), choose C
- Update F: dist[F] = min(∞, 3+1) = 4
- Q = {D, F, G}

**Iteration 5:** Select G (dist = 3)  
- Update D: dist[D] = min(4, 3+3) = 4 (no change)
- Update F: dist[F] = min(4, 3+2) = 4 (no change)
- Q = {D, F}

**Iteration 6:** Select D or F (both dist = 4), choose D
- No updates needed
- Q = {F}

**Iteration 7:** Select F (dist = 4)
- No updates needed  
- Q = {}

**Final Shortest Distances from B:**
- B to A: 2 (path: B→A)
- B to B: 0 (source)
- B to C: 3 (path: B→C)
- B to D: 4 (path: B→D or B→A→D)
- B to E: 2 (path: B→E)  
- B to F: 4 (path: B→C→F or B→E→G→F)
- B to G: 3 (path: B→E→G)

#### b) Develop Warshall's algorithm to find the transitive closure of a Matrix. Apply it to the diagraph (CO4 - 10 marks)

**Transitive Closure Definition:**
The transitive closure of a directed graph is a graph where there's an edge from vertex i to vertex j if and only if there's a path (of any length) from i to j in the original graph.

**Warshall's Algorithm:**

```
Algorithm: Warshall(A[1..n][1..n])
// Input: Adjacency matrix A of a directed graph
// Output: Transitive closure matrix

begin
    R ← A  // Initialize result matrix with adjacency matrix
    
    for k ← 1 to n do
        for i ← 1 to n do
            for j ← 1 to n do
                R[i][j] ← R[i][j] OR (R[i][k] AND R[k][j])
            end for
        end for
    end for
    
    return R
end
```

**Example Directed Graph:**
```
1 → 2 → 4
↓   ↓
3 → 4
```

**Initial Adjacency Matrix A:**
```
    1  2  3  4
1 [ 0  1  1  0 ]
2 [ 0  0  0  1 ]  
3 [ 0  0  0  1 ]
4 [ 0  0  0  0 ]
```

**Applying Warshall's Algorithm:**

**k = 1 (considering paths through vertex 1):**
```
R^(1)[i][j] = R^(0)[i][j] OR (R^(0)[i][1] AND R^(0)[1][j])

For each (i,j):
- (2,2): R[2][2] = 0 OR (0 AND 0) = 0
- (2,3): R[2][3] = 0 OR (0 AND 1) = 0  
- (3,2): R[3][2] = 0 OR (0 AND 1) = 0
- (3,3): R[3][3] = 0 OR (0 AND 1) = 0
- ... (other combinations yield no changes)
```
**R^(1):**
```
    1  2  3  4
1 [ 0  1  1  0 ]
2 [ 0  0  0  1 ]
3 [ 0  0  0  1 ]  
4 [ 0  0  0  0 ]
```

**k = 2 (considering paths through vertex 2):**
```
New paths: 1→2→4, so R[1][4] = 1

R^(2)[i][j] = R^(1)[i][j] OR (R^(1)[i][2] AND R^(1)[2][j])

Notable changes:
- (1,4): R[1][4] = 0 OR (1 AND 1) = 1
```
**R^(2):**
```
    1  2  3  4  
1 [ 0  1  1  1 ]
2 [ 0  0  0  1 ]
3 [ 0  0  0  1 ]
4 [ 0  0  0  0 ]
```

**k = 3 (considering paths through vertex 3):**
```
New paths: 1→3→4, but 1→4 already exists

R^(3)[i][j] = R^(2)[i][j] OR (R^(2)[i][3] AND R^(2)[3][j])

No new changes since paths through 3 don't create new connections.
```
**R^(3):**
```
    1  2  3  4
1 [ 0  1  1  1 ]  
2 [ 0  0  0  1 ]
3 [ 0  0  0  1 ]
4 [ 0  0  0  0 ]
```

**k = 4 (considering paths through vertex 4):**
```
No outgoing edges from vertex 4, so no new paths created.
```

**Final Transitive Closure R^(4):**
```
    1  2  3  4
1 [ 0  1  1  1 ]
2 [ 0  0  0  1 ]  
3 [ 0  0  0  1 ]
4 [ 0  0  0  0 ]
```

**Interpretation:**
- From vertex 1: Can reach vertices 2, 3, 4
- From vertex 2: Can reach vertex 4
- From vertex 3: Can reach vertex 4  
- From vertex 4: Cannot reach any vertex

**Time Complexity: O(n³)**
**Space Complexity: O(n²)**

---

### Question 8

#### a) Define hashing. For the input (30,20,56,75,31,19) construct the open hash table using the hash function h(k)=K mod 11 and find the largest number of key comparisons in a successful search (CO4 - 10 marks)

**Hashing Definition:**
Hashing is a technique used to store and retrieve data efficiently by using a hash function to map keys to array indices. It provides average-case O(1) access time for search, insertion, and deletion operations.

**Key Components:**
- **Hash Table**: Array to store key-value pairs
- **Hash Function**: Maps keys to array indices  
- **Collision Resolution**: Handles when multiple keys map to the same index

**Open Hashing (Separate Chaining):**
Each array position contains a linked list (or chain) of all elements that hash to that location.

**Constructing Hash Table with h(k) = k mod 11:**

**Hash Table Size:** 11 (indices 0-10)
**Input:** (30, 20, 56, 75, 31, 19)

**Step-by-step insertion:**

1. **Insert 30:**
   - h(30) = 30 mod 11 = 8
   - Table[8] = [30]

2. **Insert 20:**
   - h(20) = 20 mod 11 = 9  
   - Table[9] = [20]

3. **Insert 56:**
   - h(56) = 56 mod 11 = 1
   - Table[1] = [56]

4. **Insert 75:**
   - h(75) = 75 mod 11 = 9
   - Collision at index 9!
   - Table[9] = [20, 75]

5. **Insert 31:**  
   - h(31) = 31 mod 11 = 9
   - Another collision at index 9!
   - Table[9] = [20, 75, 31]

6. **Insert 19:**
   - h(19) = 19 mod 11 = 8
   - Collision at index 8!
   - Table[8] = [30, 19]

**Final Hash Table:**
```
Index | Chain
------|--------
  0   | []
  1   | [56]  
  2   | []
  3   | []
  4   | []
  5   | []
  6   | []
  7   | []
  8   | [30, 19]
  9   | [20, 75, 31]
  10  | []
```

**Finding Largest Number of Key Comparisons in Successful Search:**

For a successful search, we need to find how many comparisons are required for each key:

- **Search 30:** h(30) = 8, position 1 in chain → 1 comparison
- **Search 19:** h(19) = 8, position 2 in chain → 2 comparisons  
- **Search 56:** h(56) = 1, position 1 in chain → 1 comparison
- **Search 20:** h(20) = 9, position 1 in chain → 1 comparison
- **Search 75:** h(75) = 9, position 2 in chain → 2 comparisons
- **Search 31:** h(31) = 9, position 3 in chain → 3 comparisons

**Largest number of key comparisons: 3** (for searching key 31)

**Load Factor:** λ = n/m = 6/11 ≈ 0.55
**Average successful search time:** (1+2+1+1+2+3)/6 = 10/6 ≈ 1.67 comparisons

#### b) Develop the algorithm for sorting using distribution counting and sort the following list using distribution counting 13,11,12,13,12,12 (CO4 - 10 marks)

**Distribution Counting (Counting Sort):**
A non-comparison based sorting algorithm that sorts elements by counting the number of occurrences of each distinct element, then using arithmetic to determine positions.

**Algorithm: Distribution Counting Sort**

```
Algorithm: DistributionCountingSort(A[0..n-1])
// Input: Array A of n elements with values in range [0..k]
// Output: Sorted array A

begin
    // Step 1: Find the range of input
    min_val ← minimum value in A
    max_val ← maximum value in A
    range ← max_val - min_val + 1
    
    // Step 2: Initialize count array
    count[0..range-1] ← 0
    
    // Step 3: Count frequency of each element
    for i ← 0 to n-1 do
        count[A[i] - min_val] ← count[A[i] - min_val] + 1
    end for
    
    // Step 4: Calculate cumulative count (positions)
    for i ← 1 to range-1 do
        count[i] ← count[i] + count[i-1]  
    end for
    
    // Step 5: Build output array (backwards for stability)
    output[0..n-1]
    for i ← n-1 down to 0 do
        output[count[A[i] - min_val] - 1] ← A[i]
        count[A[i] - min_val] ← count[A[i] - min_val] - 1
    end for
    
    // Step 6: Copy back to original array
    for i ← 0 to n-1 do
        A[i] ← output[i]
    end for
end
```

**Sorting [13, 11, 12, 13, 12, 12] using Distribution Counting:**

**Step 1: Find Range**
- min_val = 11
- max_val = 13  
- range = 13 - 11 + 1 = 3
- Values: 11→index 0, 12→index 1, 13→index 2

**Step 2: Initialize Count Array**
```
count = [0, 0, 0]  // for values 11, 12, 13
```

**Step 3: Count Frequency**
```
Input: [13, 11, 12, 13, 12, 12]

Process each element:
- 13: count[13-11] = count[2]++  → count = [0, 0, 1]
- 11: count[11-11] = count[0]++  → count = [1, 0, 1]  
- 12: count[12-11] = count[1]++  → count = [1, 1, 1]
- 13: count[13-11] = count[2]++  → count = [1, 1, 2]
- 12: count[12-11] = count[1]++  → count = [1, 2, 2]
- 12: count[12-11] = count[1]++  → count = [1, 3, 2]

Final count: [1, 3, 2]
```

**Step 4: Calculate Cumulative Count**
```
count[0] = 1        (positions 0-0 for value 11)
count[1] = 1 + 3 = 4    (positions 1-3 for value 12)  
count[2] = 4 + 2 = 6    (positions 4-5 for value 13)

Cumulative count: [1, 4, 6]
```

**Step 5: Build Output Array (process input backwards)**
```
output = [_, _, _, _, _, _]

i=5, A[5]=12: 
- position = count[12-11] - 1 = count[1] - 1 = 4 - 1 = 3
- output[3] = 12, count[1] = 3
- output = [_, _, _, 12, _, _]

i=4, A[4]=12:
- position = count[1] - 1 = 3 - 1 = 2  
- output[2] = 12, count[1] = 2
- output = [_, _, 12, 12, _, _]

i=3, A[3]=13:
- position = count[2] - 1 = 6 - 1 = 5
- output[5] = 13, count[2] = 5  
- output = [_, _, 12, 12, _, 13]

i=2, A[2]=12:
- position = count[1] - 1 = 2 - 1 = 1
- output[1] = 12, count[1] = 1
- output = [_, 12, 12, 12, _, 13]

i=1, A[1]=11:  
- position = count[0] - 1 = 1 - 1 = 0
- output[0] = 11, count[0] = 0
- output = [11, 12, 12, 12, _, 13]

i=0, A[0]=13:
- position = count[2] - 1 = 5 - 1 = 4  
- output[4] = 13, count[2] = 4
- output = [11, 12, 12, 12, 13, 13]
```

**Final Sorted Array: [11, 12, 12, 12, 13, 13]**

**Time Complexity:** O(n + k), where k is the range of input values
**Space Complexity:** O(n + k) for the count and output arrays
**Stability:** Yes (maintains relative order of equal elements)

---

## UNIT - V

### Question 9

#### a) Solve the following subset-sum problem using Backtracking and draw the state-space tree applied to the instance S = {3, 5, 6, 7} and d = 15 (CO5 - 10 marks)

**Subset-Sum Problem:**
Given a set S of n positive integers and a positive integer d, find whether there exists a subset of S whose elements sum to exactly d.

**Backtracking Algorithm for Subset-Sum:**

```
Algorithm: SubsetSum(S, d, index, current_sum, solution)
// Input: Set S, target sum d, current index, current sum, solution array
// Output: true if subset with sum d exists, false otherwise

begin
    if current_sum = d then
        print solution
        return true
    end if
    
    if index ≥ |S| or current_sum > d then
        return false
    end if
    
    // Include current element
    solution[index] ← true
    if SubsetSum(S, d, index+1, current_sum + S[index], solution) then
        return true
    end if
    
    // Exclude current element (backtrack)
    solution[index] ← false
    if SubsetSum(S, d, index+1, current_sum, solution) then
        return true  
    end if
    
    return false
end
```

**State-Space Tree for S = {3, 5, 6, 7}, d = 15:**

```
                    Root (sum=0, index=0)
                          |
                    Include 3?
                    /           \
               Yes (sum=3)    No (sum=0)
              /         \       /        \
        Include 5?   Include 5?  Include 5?  Include 5?  
        /       \       /      \     /     \      /     \
   Yes(8)    No(3)   Yes(5)  No(0)  Yes(5) No(0)  Yes(5) No(0)
     |         |       |       |      |      |      |      |
Include 6?  Include 6? Include 6? Include 6? ...   ...   ...   ...
   /   \      /   \     /   \     /   \
Yes(14) No(8) Yes(9) No(3) Yes(11) No(5) Yes(6) No(0)
  |     |     |     |     |     |     |     |
Include 7? Include 7? Include 7? Include 7? Include 7? Include 7? Include 7? Include 7?
  |     |     |     |     |     |     |     |
21✗   15✓   16✗   10✗   18✗   12✗   13✗   7✗
(pruned) (SOLUTION) (pruned) (continue) (pruned) (continue) (continue) (continue)
```

**Detailed Traversal:**

**Level 0:** Start with empty set, sum = 0

**Level 1 - Element 3:**
- Left branch: Include 3 → sum = 3
- Right branch: Exclude 3 → sum = 0

**Level 2 - Element 5:**
- Branch 1: {3}, Include 5 → sum = 8
- Branch 2: {3}, Exclude 5 → sum = 3  
- Branch 3: {}, Include 5 → sum = 5
- Branch 4: {}, Exclude 5 → sum = 0

**Level 3 - Element 6:**
- Branch 1: {3,5}, Include 6 → sum = 14
- Branch 2: {3,5}, Exclude 6 → sum = 8
- Branch 3: {3}, Include 6 → sum = 9
- Branch 4: {3}, Exclude 6 → sum = 3
- (and so on...)

**Level 4 - Element 7:**
- Branch 1: {3,5,6}, Include 7 → sum = 21 > 15 (PRUNED)
- Branch 2: {3,5,6}, Exclude 7 → sum = 14 ≠ 15 (continue)
- Branch 3: {3,5}, Include 7 → sum = 15 = 15 (SOLUTION FOUND!)

**Solution Found:** Subset {3, 5, 7} with sum = 15

**All Valid Solutions:**
1. {3, 5, 7} → sum = 15 ✓
2. {6, 9} → not possible with given set  

The algorithm finds the first solution {3, 5, 7} and can terminate or continue to find all solutions.

#### b) Find the maximum profit for the following instance of Knapsack problem using Branch and Bound Technique (CO5 - 10 marks)

**Note:** Since the specific knapsack instance is not provided in the question, I'll demonstrate using a standard example.

**Sample 0/1 Knapsack Instance:**
- Capacity W = 10
- Items: {(weight=2, value=1), (weight=3, value=4), (weight=4, value=5), (weight=5, value=7)}

**Branch and Bound Algorithm for 0/1 Knapsack:**

```
Algorithm: KnapsackBranchBound(items, W)
// Input: Array of items with weights and values, capacity W
// Output: Maximum profit achievable

begin
    // Sort items by value/weight ratio in descending order
    sort items by (value/weight) ratio
    
    // Initialize priority queue with root node
    root ← create_node(level=-1, profit=0, weight=0, bound=fractional_knapsack_bound)
    queue ← priority_queue ordered by bound (max-heap)
    queue.add(root)
    
    max_profit ← 0
    
    while queue is not empty do
        current ← queue.extract_max()
        
        if current.bound ≤ max_profit then
            continue  // Prune this branch
        end if
        
        if current.level = n-1 then
            continue  // All items considered
        end if
        
        next_level ← current.level + 1
        
        // Branch 1: Include next item
        if current.weight + items[next_level].weight ≤ W then
            include_node ← create_node(
                level = next_level,
                profit = current.profit + items[next_level].value,
                weight = current.weight + items[next_level].weight,
                bound = calculate_bound(include_node)
            )
            
            if include_node.profit > max_profit then
                max_profit ← include_node.profit
            end if
            
            if include_node.bound > max_profit then
                queue.add(include_node)
            end if
        end if
        
        // Branch 2: Exclude next item  
        exclude_node ← create_node(
            level = next_level,
            profit = current.profit,
            weight = current.weight,
            bound = calculate_bound(exclude_node)
        )
        
        if exclude_node.bound > max_profit then
            queue.add(exclude_node)
        end if
    end while
    
    return max_profit
end
```

**Step-by-step Execution:**

**Items sorted by value/weight ratio:**
1. Item 4: w=5, v=7, ratio=1.4
2. Item 3: w=4, v=5, ratio=1.25  
3. Item 2: w=3, v=4, ratio=1.33
4. Item 1: w=2, v=1, ratio=0.5

**Reordered:** {(5,7), (4,5), (3,4), (2,1)}

**Bound Calculation (Fractional Knapsack Upper Bound):**
For any node, calculate the maximum possible profit by:
1. Adding all remaining items that fit completely
2. Adding fractional part of the next item if space remains

**Branch and Bound Tree:**

```
Level -1: Root
profit=0, weight=0, bound=10.0
(bound calculated: take items (5,7)+(4,5) fully, then 1/3 of (3,4))
                |
Level 0: Item (5,7)
        /              \
Include (5,7)      Exclude (5,7)
profit=7,weight=5   profit=0,weight=0
bound=12           bound=9.0
     |                 |
Level 1: Item (4,5)    Level 1: Item (4,5)
    /        \            /           \
Include(4,5) Exclude   Include(4,5)  Exclude  
p=12,w=9     p=7,w=5   p=5,w=4      p=0,w=0
bound=12     bound=11   bound=9      bound=9
   |           |         |            |
Level 2     Level 2    Level 2      Level 2
...         ...        ...          ...
```

**Detailed Execution:**

**Initial State:**
- Queue: [Root(bound=10.0)]
- max_profit = 0

**Iteration 1:** Process Root
- Include Item 1(5,7): profit=7, weight=5, bound=12
- Exclude Item 1(5,7): profit=0, weight=0, bound=9  
- Queue: [Include(bound=12), Exclude(bound=9)]
- max_profit = 7

**Iteration 2:** Process Include(5,7)
- Include Item 2(4,5): profit=12, weight=9, bound=12
- Exclude Item 2(4,5): profit=7, weight=5, bound=11
- Queue: [Include(5,7)+Include(4,5)(bound=12), Exclude Item 2(bound=11), Exclude Item 1(bound=9)]
- max_profit = 12

**Iteration 3:** Process Include(5,7)+Include(4,5)
- Weight = 9, only 1 unit capacity left
- Include Item 3(3,4): Not possible (weight would exceed capacity)
- Exclude Item 3(3,4): profit=12, weight=9, bound=12
- max_profit = 12

**Continue until queue is empty...**

**Final Answer:** Maximum profit = 12
**Optimal solution:** Take items (5,7) and (4,5)

**Time Complexity:** O(2^n) in worst case, but pruning significantly reduces the search space
**Space Complexity:** O(2^n) for storing nodes in the priority queue

---

### Question 10

#### a) Write a short note on P, NP, NP-complete and NP-Hard Problems (CO5 - 10 marks)

**Complexity Classes in Computer Science:**

**1. P (Polynomial Time) Class:**

**Definition:** The class of decision problems that can be solved by a deterministic algorithm in polynomial time O(n^k) for some constant k.

**Characteristics:**
- Efficiently solvable problems
- Solutions can be found in reasonable time even for large inputs
- Closed under complement (if a problem is in P, its complement is also in P)

**Examples:**
- Sorting algorithms (O(n log n))  
- Shortest path algorithms (O(V²))
- Linear programming
- Primality testing
- Graph connectivity

**2. NP (Non-deterministic Polynomial Time) Class:**

**Definition:** The class of decision problems for which a given solution can be verified in polynomial time by a deterministic algorithm.

**Key Properties:**
- If you have a potential solution, you can check if it's correct quickly
- Finding the solution might be difficult, but verifying is easy
- P ⊆ NP (every problem in P is also in NP)

**Examples:**
- Traveling Salesman Problem (TSP) - given a route, easy to verify its length
- Boolean Satisfiability (SAT) - given an assignment, easy to verify if formula is satisfied
- Hamiltonian Cycle - given a cycle, easy to verify if it visits each vertex once
- Subset Sum - given a subset, easy to verify if sum equals target

**3. NP-Complete Class:**

**Definition:** Problems that are both:
1. In NP (solutions can be verified in polynomial time)
2. NP-Hard (every problem in NP can be reduced to them in polynomial time)

**Significance:**
- The "hardest" problems in NP
- If any NP-complete problem can be solved in polynomial time, then P = NP
- Represents a class where all problems are equivalent in difficulty

**First NP-Complete Problem:** Boolean Satisfiability (SAT) - proven by Cook's Theorem (1971)

**Examples:**
- 3-SAT (Boolean Satisfiability with 3 literals per clause)
- Hamiltonian Cycle Problem
- Traveling Salesman Problem (decision version)
- Vertex Cover Problem
- Knapsack Problem (0/1 version)
- Graph Coloring Problem

**4. NP-Hard Class:**

**Definition:** Problems that are at least as hard as the hardest problems in NP. Every problem in NP can be reduced to an NP-Hard problem in polynomial time.

**Key Properties:**
- May or may not be in NP themselves
- If any NP-Hard problem can be solved in polynomial time, then P = NP
- Includes optimization versions of NP-complete problems

**Examples:**
- Traveling Salesman Problem (optimization version - find minimum cost tour)
- Knapsack Problem (optimization version - find maximum value)
- Halting Problem (not in NP, but NP-Hard)
- Some scheduling and resource allocation problems

**Relationship Diagram:**
```
        NP-Hard
    ┌─────────────────┐
    │                 │
    │  ┌─────────────┐│
    │  │     NP      ││
    │  │  ┌─────────┐││
    │  │  │    P    │││
    │  │  └─────────┘││
    │  │ NP-Complete ││
    │  └─────────────┘│
    └─────────────────┘
```

**P vs NP Question:**
- One of the most important unsolved problems in computer science
- Clay Millennium Problem with $1,000,000 prize
- Most experts believe P ≠ NP, but no proof exists

**Practical Implications:**
- **P problems:** Can be solved optimally for large instances
- **NP problems:** May require heuristics or approximations for large instances
- **NP-Complete/Hard:** Often use approximation algorithms, heuristics, or exact algorithms for small instances

#### b) Using Branch and Bound Technique solve the instance of travelling salesman problem (CO5 - 10 marks)

**Traveling Salesman Problem (TSP):**
Given n cities and distances between every pair of cities, find the shortest possible route that visits each city exactly once and returns to the starting city.

**Sample TSP Instance:**
Let's solve for 4 cities with the following distance matrix:

```
Distance Matrix:
     A   B   C   D
A [ ∞  10  15  20 ]
B [ 10  ∞  35  25 ]  
C [ 15  35  ∞  30 ]
D [ 20  25  30  ∞  ]
```

**Branch and Bound Algorithm for TSP:**

```
Algorithm: TSP_BranchAndBound(dist_matrix)
// Input: Distance matrix between cities
// Output: Minimum cost tour and its cost

begin
    n ← number of cities
    min_cost ← ∞
    best_path ← empty
    
    // Calculate initial lower bound using minimum spanning tree approach
    initial_bound ← calculate_initial_bound(dist_matrix)
    
    // Start with root node
    root ← create_node(level=0, path=[0], cost=0, bound=initial_bound)
    queue ← priority_queue ordered by bound (min-heap)
    queue.add(root)
    
    while queue is not empty do
        current ← queue.extract_min()
        
        if current.bound ≥ min_cost then
            continue  // Prune this branch
        end if
        
        if current.level = n-1 then
            // Complete tour by returning to start
            total_cost ← current.cost + dist[current.path[n-1]][0]
            if total_cost < min_cost then
                min_cost ← total_cost
                best_path ← current.path + [0]
            end if
            continue
        end if
        
        // Generate child nodes for unvisited cities
        for each unvisited city i do
            new_cost ← current.cost + dist[current.path[current.level]][i]
            new_path ← current.path + [i]
            new_bound ← calculate_bound(new_path, new_cost)
            
            if new_bound < min_cost then
                child ← create_node(current.level+1, new_path, new_cost, new_bound)
                queue.add(child)
            end if
        end for
    end while
    
    return (min_cost, best_path)
end
```

**Lower Bound Calculation:**
For each node, calculate lower bound using the formula:
- For each city, take the sum of two minimum outgoing edges
- Divide by 2 (since each edge is counted twice)
- Add the cost of the current partial path

**Step-by-step Solution:**

**Step 1: Calculate Initial Bound**
```
For each city, find two smallest distances:
A: 10(to B) + 15(to C) = 25
B: 10(to A) + 25(to D) = 35  
C: 15(to A) + 30(to D) = 45
D: 20(to A) + 25(to B) = 45

Initial bound = (25 + 35 + 45 + 45) / 2 = 75
```

**Step 2: Branch and Bound Tree**

```
Level 0: Start at A
path=[A], cost=0, bound=75
        |
Level 1: Choose next city
       /    |    \
   A→B     A→C   A→D
  cost=10  cost=15 cost=20
  bound=65 bound=70 bound=75
     |       |      |
Level 2: Continue from A→B
        /         \
    A→B→C       A→B→D  
   cost=45     cost=35
   bound=75    bound=65
      |          |
Level 3: Complete tours
   A→B→C→D→A   A→B→D→C→A
    cost=105    cost=80
```

**Detailed Bound Calculations:**

**Node A→B (cost=10):**
- Remaining cities: C, D
- For A: already used A→B, next minimum is A→C (15)
- For B: already used B→A, next minimum is B→D (25)  
- For C: minimum two are C→A (15) and C→D (30)
- For D: minimum two are D→A (20) and D→B (25)
- Bound = 10 + (15 + 25 + 45 + 45) / 2 = 10 + 65 = 75

**Node A→B→D (cost=35):**
- Path cost so far: 10 + 25 = 35
- Remaining: return via C
- Minimum completion: D→C (30) + C→A (15) = 45
- Bound = 35 + 45 = 80

**Step 3: Complete Exploration**

**All possible complete tours:**
1. A→B→C→D→A: 10 + 35 + 30 + 20 = 95
2. A→B→D→C→A: 10 + 25 + 30 + 15 = 80
3. A→C→B→D→A: 15 + 35 + 25 + 20 = 95  
4. A→C→D→B→A: 15 + 30 + 25 + 10 = 80
5. A→D→B→C→A: 20 + 25 + 35 + 15 = 95
6. A→D→C→B→A: 20 + 30 + 35 + 10 = 95

**Optimal Solutions:**
- **Tour 1:** A→B→D→C→A with cost = 80
- **Tour 2:** A→C→D→B→A with cost = 80

**Branch and Bound Efficiency:**
The algorithm prunes many branches early:
- If current bound ≥ current best solution, branch is eliminated
- Significantly reduces the search space from n! to much fewer nodes
- In this example, several partial paths were pruned when their bounds exceeded 80

**Final Answer:**
- **Minimum Cost:** 80
- **Optimal Tour:** A→B→D→C→A (or A→C→D→B→A)
- **Cities visited in order:** A → B → D → C → A

**Time Complexity:** 
- Worst case: O(n!) 
- Average case: Much better due to pruning
- Space complexity: O(n × 2^n) for storing nodes

**Key Advantages of Branch and Bound for TSP:**
1. Guarantees optimal solution
2. Pruning reduces search space significantly  
3. Can be stopped early if approximate solution is acceptable
4. Works well for moderate-sized instances (up to ~20 cities)

---

## Summary

This comprehensive solution covers all five units of the Design and Analysis of Algorithms course:

**Unit I:** Algorithm fundamentals, analysis techniques, and search algorithms
**Unit II:** Brute force methods, divide and conquer, and parallel algorithms
**Unit III:** Decrease and conquer, graph algorithms, and combinatorial algorithms  
**Unit IV:** Dynamic programming applications, hashing, and distribution counting
**Unit V:** Backtracking, branch and bound, and computational complexity theory

Each solution includes:
- Clear algorithm explanations
- Step-by-step traced examples
- Time and space complexity analysis
- Practical applications and variations

These solutions provide a solid foundation for understanding algorithmic design principles and their practical applications in computer science.