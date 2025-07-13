# Medical Expert System - Rule-Based Diagnosis

## Overview

This project implements a Rule-Based Expert System for Medical Diagnosis using Forward and Backward Chaining algorithms. The system demonstrates classical AI reasoning techniques as described in Russell & Norvig's "Artificial Intelligence: A Modern Approach" without using any machine learning techniques.

## Features

- **Forward Chaining (Data-Driven)**: Starts with symptoms and derives all possible diagnoses
- **Backward Chaining (Goal-Driven)**: Tests if a specific diagnosis can be proven from given symptoms
- **Knowledge Base**: Contains 15 medical rules with symptoms, diagnoses, and recommendations
- **Explanation Facility**: Provides step-by-step reasoning explanations
- **Interactive CLI**: User-friendly command-line interface
- **Working Memory**: Manages facts and reasoning chains during inference

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface│    │ Inference Engine│    │ Knowledge Base  │
│     (CLI)       │◄──►│   - Forward     │◄──►│   - Rules       │
│                 │    │   - Backward    │    │   - Facts       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       
         │              ┌─────────────────┐              
         │              │ Working Memory  │              
         │              │ - Facts         │              
         │              │ - Reasoning     │              
         └──────────────┤   Chain         │              
                        └─────────────────┘              
                                 │                       
                        ┌─────────────────┐              
                        │  Explanation    │              
                        │    Module       │              
                        └─────────────────┘              
```

## Files Structure

- `main.py` - Main entry point and system launcher
- `knowledge_base.py` - Medical rules and facts database
- `inference_engine.py` - Forward and backward chaining algorithms
- `user_interface.py` - Command-line interface
- `project_report.md` - Technical project report

## Installation and Usage

### Prerequisites
- Python 3.6 or higher
- No external dependencies required

### Running the System

1. **Interactive Mode** (Default):
```bash
python main.py
```

2. **Demonstration Mode**:
```bash
python main.py --demo
```

3. **Help**:
```bash
python main.py --help
```

## Knowledge Base

The system contains 15 rules covering common medical conditions:

### Diagnostic Rules
- **R001**: Common Cold (runny nose, sneezing, sore throat)
- **R002**: Influenza (fever, body aches, fatigue, headache)
- **R003**: Strep Throat (sore throat, fever, swollen lymph nodes)
- **R004**: Migraine (severe headache, nausea, light sensitivity)
- **R005**: Allergic Reaction (skin rash, itching, sneezing)
- **R006**: Gastroenteritis (nausea, vomiting, diarrhea)
- **R007**: Bronchitis (persistent cough, chest pain, fatigue)
- **R008**: Hypertension (headache, dizziness, shortness of breath)
- **R009**: Anemia (fatigue, weakness, pale skin)
- **R010**: Sinusitis (facial pain, nasal congestion, headache)

### Recommendation Rules
- **R011-R015**: Treatment recommendations for diagnosed conditions

## Algorithms

### Forward Chaining Algorithm
```python
def forward_chaining(symptoms):
    working_memory = initialize_with_symptoms(symptoms)
    changed = True
    
    while changed:
        changed = False
        for rule in knowledge_base.rules:
            if all_conditions_satisfied(rule.conditions, working_memory):
                if rule not in used_rules:
                    add_conclusions(rule.conclusions, working_memory)
                    used_rules.add(rule)
                    changed = True
    
    return extract_diagnoses(working_memory)
```

### Backward Chaining Algorithm
```python
def backward_chaining(goal, symptoms):
    working_memory = initialize_with_symptoms(symptoms)
    
    def prove_goal(goal, visited=set()):
        if goal in working_memory:
            return True
        
        if goal in visited:
            return False
        
        visited.add(goal)
        
        for rule in rules_concluding(goal):
            if all(prove_goal(condition, visited.copy()) 
                   for condition in rule.conditions):
                working_memory.add(goal)
                return True
        
        return False
    
    return prove_goal(goal)
```

## Example Usage

### Forward Chaining Example
```
Input: runny_nose, sneezing, sore_throat
Output: common_cold, rest, drink_fluids
Reasoning: Rule R001 matches symptoms → Rule R011 provides recommendations
```

### Backward Chaining Example
```
Goal: migraine
Input: severe_headache, nausea
Result: PROVEN (missing light_sensitivity reduces confidence)
```

## Explanation Facility

The system provides detailed explanations including:
- Step-by-step reasoning process
- Rules applied and their confidence levels
- Proof chains for backward chaining
- Individual rule explanations

## Limitations

- **Educational Purpose**: Not for actual medical diagnosis
- **Limited Knowledge**: Contains only basic medical rules
- **No Uncertainty Handling**: Simple confidence scoring
- **No Learning**: Static rule base

## Future Enhancements

- Uncertainty management with Bayesian networks
- Natural language processing for symptom input
- Web-based interface using Streamlit
- Integration with medical databases
- Machine learning for rule discovery

## Academic Context

This project demonstrates:
- **Classical AI Reasoning**: Rule-based expert systems
- **Search Algorithms**: Forward and backward chaining
- **Knowledge Representation**: IF-THEN rules
- **Inference Mechanisms**: Logical reasoning
- **Explanation Systems**: Transparent AI reasoning

## Disclaimer

This system is for educational purposes only. It should not be used for actual medical diagnosis or treatment decisions. Always consult qualified healthcare professionals for medical advice.

## License

This project is created for academic purposes as part of MCA coursework.