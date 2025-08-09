# Java Semester 2 PDF Programs

This Maven project contains 14 Java example programs covering fundamental Java concepts as organized by package. Each example is self-contained and demonstrates specific Java features.

## Project Structure

The project uses Maven with Java 17 and follows the standard Maven directory structure:
- `src/main/java/examples/` - Contains all example packages
- Each example is in its own package (e.g., `examples.ex01_box_basic`)

## Building the Project

To compile all examples:
```bash
mvn clean compile
```

To package the project:
```bash
mvn clean package
```

## Running Examples

Use Maven exec plugin to run any main class:
```bash
mvn exec:java -Dexec.mainClass="<fully-qualified-class-name>"
```

### Example Programs and Main Classes

#### 1. Basic Box Example (`ex01_box_basic`)
- **Main class**: `examples.ex01_box_basic.BoxDemo`
- **Description**: Basic field assignment and volume calculation
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex01_box_basic.BoxDemo"`

#### 2. Box Constructor Example (`ex02_box_ctor`)
- **Main class**: `examples.ex02_box_ctor.BoxDemo2`
- **Description**: Constructor and method usage
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex02_box_ctor.BoxDemo2"`

#### 3. Inheritance and Shipping Example (`ex03_inheritance_shipping`)
- **Main class**: `examples.ex03_inheritance_shipping.DemoShipment`
- **Description**: Multi-level inheritance with Box, BoxWeight, and Shipment
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex03_inheritance_shipping.DemoShipment"`

#### 4. toString and Args Example (`ex04_toString_args`)
- **Main class**: `examples.ex04_toString_args.ToStringDemo`
- **Description**: toString method and command-line arguments
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex04_toString_args.ToStringDemo"`
- **Run with args**: `mvn exec:java -Dexec.mainClass="examples.ex04_toString_args.ToStringDemo" -Dexec.args="arg1 arg2 arg3"`

#### 5. Exception Handling (`ex05_exceptions`)
- **Main classes**: 
  - `examples.ex05_exceptions.MultipleCatches`
  - `examples.ex05_exceptions.ThrowsDemo`
- **Description**: Multiple catch blocks and throws/catch demonstration
- **Run**: 
  - `mvn exec:java -Dexec.mainClass="examples.ex05_exceptions.MultipleCatches"`
  - `mvn exec:java -Dexec.mainClass="examples.ex05_exceptions.ThrowsDemo"`

#### 6. Packages and Access Control (`ex06_packages`)
- **Main classes**:
  - `examples.ex06_packages.p1.DemoP1`
  - `examples.ex06_packages.p2.DemoP2`
- **Description**: Package visibility and access modifiers
- **Run**:
  - `mvn exec:java -Dexec.mainClass="examples.ex06_packages.p1.DemoP1"`
  - `mvn exec:java -Dexec.mainClass="examples.ex06_packages.p2.DemoP2"`

#### 7. Multithreading (`ex07_multithreading`)
- **Main class**: `examples.ex07_multithreading.Synch`
- **Description**: Synchronized methods and thread coordination
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex07_multithreading.Synch"`

#### 8. Enums and Autoboxing (`ex08_enum_autobox`)
- **Main classes**:
  - `examples.ex08_enum_autobox.EnumDemo`
  - `examples.ex08_enum_autobox.AutoBox`
- **Description**: Enum with values and autoboxing/unboxing
- **Run**:
  - `mvn exec:java -Dexec.mainClass="examples.ex08_enum_autobox.EnumDemo"`
  - `mvn exec:java -Dexec.mainClass="examples.ex08_enum_autobox.AutoBox"`

#### 9. Generics (`ex09_generics`)
- **Main class**: `examples.ex09_generics.SimpGen`
- **Description**: Generic classes with type parameters
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex09_generics.SimpGen"`

#### 10. ArrayList Collections (`ex10_arraylist`)
- **Main class**: `examples.ex10_arraylist.AL`
- **Description**: ArrayList operations (add, remove, size)
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex10_arraylist.AL"`

#### 11. LinkedList Collections (`ex11_linkedlist`)
- **Main class**: `examples.ex11_linkedlist.LL`
- **Description**: LinkedList operations (addFirst, addLast, remove, etc.)
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex11_linkedlist.LL"`

#### 12. Lambda Expressions (`ex12_lambda_factorial`)
- **Main class**: `examples.ex12_lambda_factorial.LambdaFactorial`
- **Description**: Lambda expression for factorial calculation
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex12_lambda_factorial.LambdaFactorial"`

#### 13. Singleton Pattern (`ex13_singleton`)
- **Main class**: `examples.ex13_singleton.Main`
- **Description**: Singleton design pattern implementation (not thread-safe)
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex13_singleton.Main"`

#### 14. JDBC Database Connection (`ex14_jdbc`)
- **Main class**: `examples.ex14_jdbc.DbConnect`
- **Description**: Database connection using try-with-resources
- **Run**: `mvn exec:java -Dexec.mainClass="examples.ex14_jdbc.DbConnect"`
- **Note**: Requires MySQL database setup or will show sample output

## Running All Examples

You can run all examples sequentially using this script:
```bash
# Run all main classes
mvn exec:java -Dexec.mainClass="examples.ex01_box_basic.BoxDemo"
mvn exec:java -Dexec.mainClass="examples.ex02_box_ctor.BoxDemo2"
mvn exec:java -Dexec.mainClass="examples.ex03_inheritance_shipping.DemoShipment"
mvn exec:java -Dexec.mainClass="examples.ex04_toString_args.ToStringDemo"
mvn exec:java -Dexec.mainClass="examples.ex05_exceptions.MultipleCatches"
mvn exec:java -Dexec.mainClass="examples.ex05_exceptions.ThrowsDemo"
mvn exec:java -Dexec.mainClass="examples.ex06_packages.p1.DemoP1"
mvn exec:java -Dexec.mainClass="examples.ex06_packages.p2.DemoP2"
mvn exec:java -Dexec.mainClass="examples.ex07_multithreading.Synch"
mvn exec:java -Dexec.mainClass="examples.ex08_enum_autobox.EnumDemo"
mvn exec:java -Dexec.mainClass="examples.ex08_enum_autobox.AutoBox"
mvn exec:java -Dexec.mainClass="examples.ex09_generics.SimpGen"
mvn exec:java -Dexec.mainClass="examples.ex10_arraylist.AL"
mvn exec:java -Dexec.mainClass="examples.ex11_linkedlist.LL"
mvn exec:java -Dexec.mainClass="examples.ex12_lambda_factorial.LambdaFactorial"
mvn exec:java -Dexec.mainClass="examples.ex13_singleton.Main"
mvn exec:java -Dexec.mainClass="examples.ex14_jdbc.DbConnect"
```

## Dependencies

- Java 17
- Maven 3.6+
- MySQL Connector/J 8.0.33 (for JDBC example)

## Notes

- Each example is in its own package to avoid class name collisions
- The JDBC example includes try-with-resources for proper resource management
- The singleton example includes a note about thread-safety
- All examples include consistent output formatting