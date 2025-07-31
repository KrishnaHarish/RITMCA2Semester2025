# Department of Master of Computer Applications  
## MCAE12 Introduction to Artificial Intelligence  
### Assignment Answers

---

### 1. PEAS Descriptions and Environment Characterization

| Activity | PEAS Description | Environment Properties |
|----------|------------------|-----------------------|
| **i. Playing soccer** | **P:** Win the game, score goals, prevent opposition from scoring<br>**E:** Soccer field, teammates, opponents, ball, referee, weather<br>**A:** Move, kick, pass, tackle, intercept<br>**S:** Visual, auditory, touch (ball, field), game state | Multi-agent, stochastic, dynamic, partially observable, continuous |
| **ii. Exploring the subsurface oceans of Titan** | **P:** Collect samples, map ocean, avoid hazards<br>**E:** Subsurface ocean, obstacles, unknown terrain, pressure, temperature<br>**A:** Move, collect, analyze, communicate<br>**S:** Sonar, chemical, pressure, temperature, images | Single-agent, stochastic, partially observable, dynamic, continuous |
| **iii. Shopping for used AI books on the Internet** | **P:** Buy best book(s) at lowest price, minimize costs<br>**E:** Online marketplace, sellers, buyers, book listings<br>**A:** Search, select, bid/buy, pay<br>**S:** Listings, prices, seller ratings, book details | Single-agent, deterministic (mostly), static, fully observable, discrete |
| **iv. Playing a tennis match** | **P:** Win the match, score points<br>**E:** Tennis court, opponent, ball, net, umpire<br>**A:** Move, hit, serve, volley<br>**S:** Visual, auditory, tactile, game state | Two-agent, stochastic, dynamic, partially observable, continuous |
| **v. Practicing tennis against a wall** | **P:** Improve skills, return the ball<br>**E:** Wall, ball, player<br>**A:** Move, hit, serve<br>**S:** Visual, auditory, tactile | Single-agent, deterministic, dynamic, fully observable, continuous |
| **vi. Performing a high jump** | **P:** Clear highest bar, maximize jump height<br>**E:** Track, bar, ground, body<br>**A:** Run, jump, arch, land<br>**S:** Visual, tactile, proprioceptive | Single-agent, deterministic, episodic, fully observable, continuous |
| **vii. Knitting a sweater** | **P:** Complete sweater as per design<br>**E:** Yarn, needles, instructions<br>**A:** Knit, purl, switch yarn, bind off<br>**S:** Visual, tactile, pattern state | Single-agent, deterministic, static, fully observable, discrete/continuous |
| **viii. Bidding on an item at an auction** | **P:** Win desired item at best price<br>**E:** Auction platform, other bidders, auctioneer<br>**A:** Place bid, withdraw, observe<br>**S:** Current bids, time, item info | Multi-agent, stochastic, dynamic, partially observable, discrete |

---

### 2. Problem Formulation

#### i. 8-puzzle problem
- **State:** Arrangement of 8 tiles and an empty space (3x3 grid).
- **Initial state:** Any legal configuration.
- **Actions:** Move a tile into the empty space (up, down, left, right).
- **Transition model:** Resulting configuration after move.
- **Goal test:** Tiles are in order (usually 1-8, blank at last).
- **Path cost:** Typically 1 per move.

#### ii. 8-queens problem
- **State:** Arrangement of 0 to 8 queens on the board in non-attacking positions.
- **Initial state:** Empty board.
- **Actions:** Place a queen in a safe square in the next row.
- **Transition model:** Add queen if not attacked.
- **Goal test:** 8 queens placed, none attacking.
- **Path cost:** Not applicable (all solutions are equal cost).

#### iii. Airline travel problems
- **State:** Current city, time, tickets used.
- **Initial state:** Starting city, time.
- **Actions:** Take a flight from current city to destination.
- **Transition model:** Update city, time, and tickets.
- **Goal test:** Arrive at destination (possibly minimize cost/time).
- **Path cost:** Total cost or total travel time.

#### iv. Traveling salesperson problem (TSP)
- **State:** Current city and list of cities visited.
- **Initial state:** Starting city, no cities visited.
- **Actions:** Travel to unvisited city.
- **Transition model:** Mark city as visited, update position.
- **Goal test:** All cities visited, return to start.
- **Path cost:** Total distance or cost of route.

#### v. Robot navigation
- **State:** Position and orientation of robot.
- **Initial state:** Given starting position.
- **Actions:** Move forward, turn, etc.
- **Transition model:** New position and orientation.
- **Goal test:** Robot at goal location.
- **Path cost:** Sum of movement costs (distance, time, energy).

---

### 3. Two Friends Meet Problem

#### i. Search Problem Formulation

- **State:** (city_A, city_B) — positions of friend A and B
- **Initial state:** (start_A, start_B)
- **Actions:** For each friend, move to any neighboring city.
- **Transition model:** (new_city_A, new_city_B)
- **Cost:** For each move, time = max(d(city_A, new_city_A), d(city_B, new_city_B)) — since both must wait for the slower to arrive.
- **Goal test:** city_A == city_B (they meet)

#### Notation:
- Let the set of cities be C. Let N(i) be neighbors of city i. At each step, choose (j, k) where j in N(i), k in N(l).
- d(i, j): road distance between i and j.
- State: (i, l)
- Successors: {(j, k) | j in N(i), k in N(l)}
- Cost: max(d(i, j), d(l, k))
- Goal: i = l

#### ii. Heuristics Admissibility

- **a) D(i, j):** Admissible. Straight-line distance is a lower bound on the time to meet (if both could go straight toward each other at once).
- **b) 2·D(i, j):** Not admissible. It may overestimate the minimal cost.
- **c) D(i, j)/2:** Not admissible. It may *underestimate* in a way that is not consistent with the problem's cost structure.

#### iii. Completely connected maps with no solution?
- **No.** In a completely connected map, every city is reachable from every other, so a solution always exists.

#### iv. Must one friend visit a city twice in all solutions?
- **Yes, possible.** If the shortest paths for both require backtracking or if the optimal meeting point is only accessible by revisiting a city, then revisiting is necessary.

---

### 4. Search Algorithms for Road Map (A-G)

**Assume the following graph (node: heuristic value):**

```
A(3)
|   \
B(6) C(6)
|    / \
D(11) E(1)
 \  /   \
  F(99)  G(0)
       /
      G(0)
```
(Assume edges and their costs as per a standard textbook example or as per an image given.)

#### i. Breadth-First Search (BFS)
- Explores nodes level by level (ignoring heuristic/cost).
- **Frontier/Explored Table:**  
  Iteration 1: F: [A], E: []  
  Iteration 2: F: [B, C], E: [A]  
  Iteration 3: F: [D, E], E: [A, B, C]  
  ...and so on until G is found.
- **Optimality:** BFS finds the shortest path in terms of number of edges, not cost.

#### ii. Uniform Cost Search (UCS)
- Always expands the lowest path-cost node first.
- **Frontier/Explored Table:**  
  Similar to BFS, but nodes entered into the frontier with their path cost; the lowest-cost node is expanded.
- **Optimality:** UCS is optimal for lowest path cost.

#### iii. Best First Search
- Expands the node with lowest heuristic value h(n).
- **Frontier/Explored Table:**  
  Expansion order depends on heuristic, which may not be optimal.
- **Optimality:** Not guaranteed to be optimal.

#### iv. A* Search
- Expands node with lowest f(n) = g(n) + h(n).
- **Frontier/Explored Table:**  
  Keeps track of both path cost and heuristic; expands lowest f(n) node.
- **Optimality:** If h(n) is admissible, A* is optimal.

*(Note: For full tables, draw the graph and record the actual values at each iteration using the cost and heuristic. Since the map image is not clear, provide a step-by-step example in your answer sheet.)*

---

### 5. First-order Logic Assertions

Using given predicates:

i. Emily is either a surgeon or a lawyer:  
   `Occupation(Emily, Surgeon) ∨ Occupation(Emily, Lawyer)`

ii. Joe is an actor, but he also holds another job:  
   `Occupation(Joe, Actor) ∧ ∃o (o ≠ Actor ∧ Occupation(Joe, o))`

iii. All surgeons are doctors:  
   `∀p (Occupation(p, Surgeon) ⇒ Occupation(p, Doctor))`

iv. Joe does not have a lawyer:  
   `¬∃p (Occupation(p, Lawyer) ∧ Customer(Joe, p))`

v. Emily has a boss who is a lawyer:  
   `∃b (Boss(b, Emily) ∧ Occupation(b, Lawyer))`

vi. There exists a lawyer all of whose customers are doctors:  
   `∃l (Occupation(l, Lawyer) ∧ ∀c (Customer(c, l) ⇒ ∃d (Occupation(c, Doctor))))`

vii. Every surgeon has a lawyer:  
   `∀s (Occupation(s, Surgeon) ⇒ ∃l (Occupation(l, Lawyer) ∧ Customer(s, l)))`

---

### 6. FOL Translation (Owns, Dog, Cat, Cute, Scary)

i. Joe has a cute dog:  
   `∃d (Dog(d) ∧ Owns(Joe, d) ∧ Cute(d))`

ii. All of Joe’s dogs are cute:  
   `∀d (Dog(d) ∧ Owns(Joe, d) ⇒ Cute(d))`

iii. Unless Joe owns a dog, he is scary:  
   `¬∃d (Dog(d) ∧ Owns(Joe, d)) ⇒ Scary(Joe)`

iv. Either Joe has at least one cat and at least one dog or he is scary (but not both at the same time):  
   `[(∃c (Cat(c) ∧ Owns(Joe, c)) ∧ ∃d (Dog(d) ∧ Owns(Joe, d))) ⊕ Scary(Joe)]`
   (⊕ is exclusive or.)

v. Not all dogs are both scary and cute:  
   `¬∀d (Dog(d) ⇒ (Scary(d) ∧ Cute(d)))`

---

### 7. FOL to English

i. ∀x (Apple(x) ⇒ Red(x))  
   "All apples are red."

ii. ∀x ∃y Loves(x, y)  
   "Everyone loves someone."

iii. ∃y ∀x Loves(x, y)  
   "There is someone whom everyone loves."

---

### 8. OpenCV Program: BGR to Gray and Gray to RGB

```python
import cv2

# Load image in BGR
img = cv2.imread('input.jpg')

# Convert BGR to Gray
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imwrite('gray.jpg', gray)

# Convert Gray to RGB
gray_rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2RGB)
cv2.imwrite('gray_to_rgb.jpg', gray_rgb)
```

---

### 9. Translate and Rotate Image in OpenCV

**Translate (shift) and rotate an image:**

```python
import cv2
import numpy as np

img = cv2.imread('input.jpg')

# Translation matrix: shift by (tx, ty)
tx, ty = 100, 50
M_translate = np.float32([[1, 0, tx], [0, 1, ty]])
translated = cv2.warpAffine(img, M_translate, (img.shape[1], img.shape[0]))

# Rotation matrix: rotate by 45 degrees about the center
angle = 45
center = (img.shape[1]//2, img.shape[0]//2)
M_rotate = cv2.getRotationMatrix2D(center, angle, 1.0)
rotated = cv2.warpAffine(img, M_rotate, (img.shape[1], img.shape[0]))

cv2.imwrite('translated.jpg', translated)
cv2.imwrite('rotated.jpg', rotated)
```
**Explanation:**  
- `warpAffine` applies the transformation matrix.
- Translation shifts the image; rotation rotates it by `angle` degrees about the center.

---

### 10. Access Video Capture Object Properties

```python
import cv2

cap = cv2.VideoCapture(0)

if cap.isOpened():
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Width: {width}, Height: {height}, FPS: {fps}")

cap.release()
```

---

### 11. Access Image Object Properties

```python
import cv2

img = cv2.imread('input.jpg')
print(f"Shape: {img.shape}")  # (height, width, channels)
print(f"Size: {img.size}")    # Total number of pixels
print(f"Datatype: {img.dtype}")
```

---

### 12. Split Multichannel Image to Single Channels

```python
import cv2

img = cv2.imread('input.jpg')
b, g, r = cv2.split(img)
cv2.imwrite('blue_channel.jpg', b)
cv2.imwrite('green_channel.jpg', g)
cv2.imwrite('red_channel.jpg', r)
```
**Explanation:**  
- `cv2.split()` separates the channels (e.g., B, G, R in a color image).

---

**End of Assignment Answers**