# MCA11: Programming with Python – Model Answers

---

## UNIT - I

### 1a) Significance of Indentation in Python
Indentation in Python is crucial as it defines the blocks of code. Unlike other languages that use braces `{}` to delimit blocks, Python uses whitespace (spaces or tabs). Incorrect indentation leads to `IndentationError`. It affects the logic flow, especially in loops, functions, and conditionals.
```python
if True:
    print("Indented block")
print("Outside block")
```

### 1b) Implicit vs Explicit Type Conversion
- **Implicit:** Python automatically converts one data type to another.
  ```python
  x = 5    # int
  y = 2.0  # float
  z = x + y  # z becomes float (7.0)
  ```
- **Explicit:** Programmer manually converts data type using functions like `int()`, `float()`, `str()`, etc.
  ```python
  x = "100"
  y = int(x)  # y is int 100
  ```

### 1c) Program to Find Largest of Three Numbers
```python
a = int(input("Enter first: "))
b = int(input("Enter second: "))
c = int(input("Enter third: "))

if a >= b and a >= c:
    largest = a
elif b >= a and b >= c:
    largest = b
else:
    largest = c

print("Largest:", largest)
```

### 1d) break, continue, and pass Statements
- **break:** Exits the loop prematurely.
- **continue:** Skips the current iteration, continues with next.
- **pass:** Does nothing; placeholder.

```python
for i in range(5):
    if i == 2:
        break   # stops loop when i is 2
    print(i)

for i in range(5):
    if i == 2:
        continue  # skips printing 2
    print(i)

for i in range(5):
    if i == 2:
        pass   # does nothing, loop continues
    print(i)
```

---

### 2a) Basic Data Types in Python
- **int:** Integer numbers (e.g., 5)
- **float:** Decimal numbers (e.g., 3.14)
- **str:** Strings (e.g., "hello")
- **bool:** Boolean (True/False)
- **complex:** Complex numbers (e.g., 2+3j)

```python
a = 10        # int
b = 3.14      # float
c = "Python"  # str
d = True      # bool
e = 2 + 3j    # complex
```

### 2b) Fibonacci Series up to a Given Number
```python
n = int(input("Enter limit: "))
a, b = 0, 1
while a <= n:
    print(a, end=' ')
    a, b = b, a + b
```

### 2c) Check if Number is Prime (Efficient)
```python
num = int(input("Enter number: "))
if num < 2:
    print("Not prime")
else:
    for i in range(2, int(num**0.5)+1):
        if num % i == 0:
            print("Not prime")
            break
    else:
        print("Prime")
```

---

## UNIT - II

### 3a) Menu-driven Script for 5 String Operations
```python
s = input("Enter string: ")
print("Menu:\n1. Length\n2. Uppercase\n3. Lowercase\n4. Replace\n5. Slice")
choice = int(input("Choose operation: "))
if choice == 1:
    print(len(s))
elif choice == 2:
    print(s.upper())
elif choice == 3:
    print(s.lower())
elif choice == 4:
    old = input("Old: ")
    new = input("New: ")
    print(s.replace(old, new))
elif choice == 5:
    start = int(input("Start: "))
    end = int(input("End: "))
    print(s[start:end])
```

### 3b) Sum of List of Integers
```python
lst = list(map(int, input("Enter integers separated by space: ").split()))
print("Sum:", sum(lst))
```

### 3c) What is Numpy? Real-time Scenarios
- **Numpy** is a Python library for numerical computations, supporting multi-dimensional arrays and matrices.
- **Scenarios:** Data analysis, scientific simulations, image processing, machine learning (manipulating large datasets), fast mathematical operations, etc.

---

### 4a) Menu-driven Script for 5 Tuple Operations
```python
t = tuple(map(int, input("Enter tuple elements: ").split()))
print("Menu:\n1. Length\n2. Count\n3. Index\n4. Concatenate\n5. Slice")
choice = int(input("Choose: "))
if choice == 1:
    print(len(t))
elif choice == 2:
    x = int(input("Element to count: "))
    print(t.count(x))
elif choice == 3:
    x = int(input("Element to find index: "))
    print(t.index(x))
elif choice == 4:
    t2 = tuple(map(int, input("Enter another tuple: ").split()))
    print(t + t2)
elif choice == 5:
    s, e = int(input("Start: ")), int(input("End: "))
    print(t[s:e])
```

### 4b) Dictionary Definition and Remove Methods
A **dictionary** is a collection of key-value pairs.  
Ways to create:
```python
d1 = {'a': 1, 'b': 2}
d2 = dict(x=3, y=4)
```
Removing items:
- `pop(key)`
- `popitem()`
- `del dict[key]`
- `clear()`
```python
d = {'a': 1, 'b': 2}
d.pop('a')       # removes ‘a’
d.popitem()      # removes last inserted
del d['b']       # deletes ‘b’
d.clear()        # removes all items
```

### 4c) String Operations on S1="MCA Department"
```python
S1 = "MCA Department"
# i. Total characters
print(len(S1))  # 14
# ii. Uppercase
print(S1.upper())  # "MCA DEPARTMENT"
# iii. Replace "MCA" to "CSE"
print(S1.replace("MCA", "CSE"))  # "CSE Department"
# iv. Retrieve substring "MCA"
print(S1[0:3])  # "MCA"
```

---

## UNIT - III

### 5a) Functions and Types of Arguments
A **function** is a block of code that performs a task.
Types of arguments:
- **Required (positional):** Must be passed in order.
- **Keyword:** Passed with key=value.
- **Default:** Default value if not provided.
- **Variable-length:** *args (tuple), **kwargs (dict).

```python
def f(a, b=2, *args, **kwargs):
    pass
```

### 5b) Map and Lambda Function
- **map(func, iterable):** Applies function to each element.
- **lambda:** Anonymous function.
```python
lst = [1, 2, 3]
squared = list(map(lambda x: x*x, lst))  # [1, 4, 9]
```

### 5c) List Comprehension
A concise way to create lists.
```python
squares = [x*x for x in range(5)]  # [0, 1, 4, 9, 16]
```

---

### 6a) Display Even Numbers from List
```python
import random
lst = [random.randint(1, 100) for _ in range(10)]
def display_even(lst):
    for i in lst:
        if i % 2 == 0:
            print(i, end=' ')
display_even(lst)
```

### 6b) Local vs Global Variables
- **Local:** Defined inside function, accessible only there.
- **Global:** Defined outside, accessible everywhere.
```python
x = 10  # global
def f():
    y = 5  # local
    global x
    x = x + 1
```

### 6c) Pass by Value vs Pass by Reference
Python uses "pass by object reference".
- Immutable (int, str): changes inside function don’t affect original (acts like pass by value).
- Mutable (list, dict): changes inside function affect original (acts like pass by reference).
```python
def foo(x):
    x = 5

a = 10
foo(a)
print(a)  # 10

def bar(lst):
    lst.append(5)

b = [1,2]
bar(b)
print(b)  # [1,2,5]
```

---

## UNIT - IV

### 7a) Regular Expressions: search(), match(), findall()
- **Regular Expression:** Sequence of characters defining a search pattern.
- **search():** Scans through string, returns first match.
- **match():** Checks for match at the beginning of string.
- **findall():** Returns all non-overlapping matches.

```python
import re
txt = "abc 123 abc"
print(re.search(r"\d+", txt))    # finds '123'
print(re.match(r"\w+", txt))     # matches 'abc'
print(re.findall(r"abc", txt))   # ['abc', 'abc']
```

### 7b) Extract Emails from File Using Regex
```python
import re
with open("file.txt") as f:
    text = f.read()
emails = re.findall(r"\b[\w.-]+@[\w.-]+\.\w+\b", text)
print(emails)
```

---

### 8a) Constructor in Python OOP
- **Constructor:** `__init__` method, called when object is created.
```python
class Person:
    def __init__(self, name):
        self.name = name
p = Person("Alice")
```

### 8b) Employee Class with Private Attributes, Getter/Setter
```python
class Employee:
    def __init__(self, name, salary):
        self.__name = name
        self.__salary = salary

    def get_name(self):
        return self.__name
    def set_name(self, name):
        self.__name = name

    def get_salary(self):
        return self.__salary
    def set_salary(self, salary):
        self.__salary = salary
```

### 8c) Multiple Inheritance in Python
Python supports multiple inheritance; a class can inherit from multiple parents.
```python
class A: pass
class B: pass
class C(A, B): pass  # C inherits from A and B
```

---

## UNIT - V

### 9a) File Read/Write Methods (Any 5)
1. **read()**: Reads the entire file.
2. **readline()**: Reads a single line.
3. **readlines()**: Reads all lines into a list.
4. **write()**: Writes a string to file.
5. **writelines()**: Writes a list of strings.
6. **close()**: Closes the file.
7. **seek()**: Moves file pointer.
8. **tell()**: Returns file pointer position.

### 9b) Exception Handling and User-defined Exception
Exception handling lets you catch errors and prevent program crash.
```python
class MyException(Exception): pass

try:
    raise MyException("Custom error")
except MyException as e:
    print(e)
```

### 9c) Script to Print Characters, Words, Lines in File
```python
fname = input("Filename: ")
with open(fname, 'r') as f:
    contents = f.read()
    lines = contents.splitlines()
    words = contents.split()
    print("Chars:", len(contents))
    print("Words:", len(words))
    print("Lines:", len(lines))
```

---

### 10a) Display First 5 and Last 5 Lines of a File
```python
fname = input("Filename: ")
with open(fname) as f:
    lines = f.readlines()
    print("First 5 lines:", "".join(lines[:5]))
    print("Last 5 lines:", "".join(lines[-5:]))
```

### 10b) Purpose, Syntax, Example
- **tell():** Returns current file pointer position.
  ```python
  f = open('test.txt')
  print(f.tell())
  ```
- **seek():** Moves the file pointer to specified position.
  ```python
  f.seek(0)
  ```
- **rename():** Renames a file (from os module).
  ```python
  import os
  os.rename('old.txt', 'new.txt')
  ```

### 10c) Exception Types and Handling Examples
- **Division by zero**
  ```python
  try:
      x = 1/0
  except ZeroDivisionError:
      print("Cannot divide by zero")
  ```
- **Opening a file that does not exist**
  ```python
  try:
      f = open("nofile.txt")
  except FileNotFoundError:
      print("File not found")
  ```
- **Indexing a list with illegal value**
  ```python
  try:
      lst = [1,2,3]
      print(lst[5])
  except IndexError:
      print("Index error")
  ```
- **Using unintended code**
  ```python
  try:
      eval('x === x')
  except SyntaxError:
      print("Syntax error")
  ```

---

**End of Answers**