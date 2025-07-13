"""
Inference Engine for Medical Expert System
Implements Forward Chaining (data-driven) and Backward Chaining (goal-driven) algorithms
Based on Russell & Norvig's "Artificial Intelligence: A Modern Approach"
"""

class WorkingMemory:
    """Manages facts and intermediate results during inference"""
    
    def __init__(self):
        self.facts = set()  # Known facts (symptoms, diagnoses)
        self.inferred_facts = set()  # Facts inferred during reasoning
        self.used_rules = []  # Rules that have been applied
        self.reasoning_chain = []  # Step-by-step reasoning process
    
    def add_fact(self, fact):
        """Add a fact to working memory"""
        self.facts.add(fact)
    
    def add_inferred_fact(self, fact, rule_id, explanation=""):
        """Add an inferred fact with reasoning trace"""
        self.inferred_facts.add(fact)
        self.facts.add(fact)
        self.reasoning_chain.append({
            'fact': fact,
            'rule_id': rule_id,
            'explanation': explanation,
            'type': 'inferred'
        })
    
    def has_fact(self, fact):
        """Check if a fact is known"""
        return fact in self.facts
    
    def get_all_facts(self):
        """Get all known facts"""
        return self.facts
    
    def clear(self):
        """Clear working memory"""
        self.facts.clear()
        self.inferred_facts.clear()
        self.used_rules.clear()
        self.reasoning_chain.clear()
    
    def get_reasoning_chain(self):
        """Get the reasoning chain for explanation"""
        return self.reasoning_chain

class InferenceEngine:
    """Inference engine implementing forward and backward chaining"""
    
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
        self.working_memory = WorkingMemory()
    
    def forward_chaining(self, initial_symptoms):
        """
        Forward Chaining (Data-Driven Inference)
        Start with known symptoms and derive all possible conclusions
        """
        print("\n=== FORWARD CHAINING (DATA-DRIVEN) ===")
        
        # Clear working memory and add initial symptoms
        self.working_memory.clear()
        for symptom in initial_symptoms:
            self.working_memory.add_fact(symptom)
            self.working_memory.reasoning_chain.append({
                'fact': symptom,
                'rule_id': 'INPUT',
                'explanation': f'User reported symptom: {symptom}',
                'type': 'input'
            })
        
        print(f"Initial symptoms: {', '.join(initial_symptoms)}")
        
        # Apply rules iteratively until no new facts can be derived
        changed = True
        iteration = 0
        
        while changed:
            changed = False
            iteration += 1
            print(f"\n--- Iteration {iteration} ---")
            
            for rule in self.knowledge_base.get_rules():
                if rule.rule_id in [used_rule.rule_id for used_rule in self.working_memory.used_rules]:
                    continue  # Skip already used rules
                
                # Check if all conditions are satisfied
                if self._all_conditions_satisfied(rule.conditions):
                    # Apply the rule
                    new_facts = []
                    for conclusion in rule.conclusions:
                        if not self.working_memory.has_fact(conclusion):
                            self.working_memory.add_inferred_fact(
                                conclusion, 
                                rule.rule_id, 
                                rule.explanation
                            )
                            new_facts.append(conclusion)
                            changed = True
                    
                    if new_facts:
                        self.working_memory.used_rules.append(rule)
                        print(f"Applied {rule.rule_id}: {rule}")
                        print(f"  New facts: {', '.join(new_facts)}")
                        print(f"  Confidence: {rule.confidence:.2f}")
        
        # Return results
        diagnoses = [fact for fact in self.working_memory.get_all_facts() 
                    if fact in self.knowledge_base.get_diagnoses()]
        
        print(f"\nForward chaining completed in {iteration} iterations")
        print(f"Derived diagnoses: {', '.join(diagnoses) if diagnoses else 'None'}")
        
        return diagnoses
    
    def backward_chaining(self, goal_diagnosis, initial_symptoms):
        """
        Backward Chaining (Goal-Driven Inference)
        Start with a goal (diagnosis) and work backwards to see if it can be proven
        """
        print(f"\n=== BACKWARD CHAINING (GOAL-DRIVEN) ===")
        print(f"Goal: Prove '{goal_diagnosis}'")
        
        # Clear working memory and add initial symptoms
        self.working_memory.clear()
        for symptom in initial_symptoms:
            self.working_memory.add_fact(symptom)
            self.working_memory.reasoning_chain.append({
                'fact': symptom,
                'rule_id': 'INPUT',
                'explanation': f'User reported symptom: {symptom}',
                'type': 'input'
            })
        
        # Try to prove the goal
        result = self._prove_goal(goal_diagnosis, depth=0)
        
        if result:
            print(f"\nGoal '{goal_diagnosis}' PROVEN with confidence {result['confidence']:.2f}")
            print(f"Proof chain: {' -> '.join(result['proof_chain'])}")
        else:
            print(f"\nGoal '{goal_diagnosis}' CANNOT BE PROVEN with current symptoms")
        
        return result
    
    def _prove_goal(self, goal, depth=0, visited=None):
        """
        Recursively try to prove a goal using backward chaining
        """
        if visited is None:
            visited = set()
        
        # Avoid infinite loops
        if goal in visited:
            return None
        visited.add(goal)
        
        indent = "  " * depth
        print(f"{indent}Trying to prove: {goal}")
        
        # Check if goal is already a known fact
        if self.working_memory.has_fact(goal):
            print(f"{indent}✓ {goal} is already known")
            return {'confidence': 1.0, 'proof_chain': [goal]}
        
        # Find rules that can conclude this goal
        relevant_rules = self.knowledge_base.get_rules_with_conclusion(goal)
        
        if not relevant_rules:
            print(f"{indent}✗ No rules can conclude {goal}")
            return None
        
        # Try each relevant rule
        for rule in relevant_rules:
            print(f"{indent}Trying rule {rule.rule_id}: {rule}")
            
            # Try to prove all conditions of this rule
            conditions_proven = []
            all_conditions_satisfied = True
            min_confidence = rule.confidence
            
            for condition in rule.conditions:
                result = self._prove_goal(condition, depth + 1, visited.copy())
                if result:
                    conditions_proven.append(condition)
                    min_confidence = min(min_confidence, result['confidence'])
                else:
                    all_conditions_satisfied = False
                    break
            
            if all_conditions_satisfied:
                # All conditions proven, so goal is proven
                print(f"{indent}✓ Rule {rule.rule_id} successfully applied")
                
                # Add to working memory
                self.working_memory.add_inferred_fact(goal, rule.rule_id, rule.explanation)
                self.working_memory.used_rules.append(rule)
                
                # Build proof chain
                proof_chain = conditions_proven + [goal]
                
                return {
                    'confidence': min_confidence,
                    'proof_chain': proof_chain,
                    'rule_id': rule.rule_id
                }
        
        print(f"{indent}✗ Cannot prove {goal}")
        return None
    
    def _all_conditions_satisfied(self, conditions):
        """Check if all conditions in a rule are satisfied"""
        return all(self.working_memory.has_fact(condition) for condition in conditions)
    
    def get_explanation(self):
        """Get explanation of the reasoning process"""
        return self.working_memory.get_reasoning_chain()
    
    def get_working_memory(self):
        """Get current working memory state"""
        return self.working_memory

class ExplanationModule:
    """Provides explanations for the reasoning process"""
    
    def __init__(self, inference_engine):
        self.inference_engine = inference_engine
    
    def explain_forward_chaining(self):
        """Explain forward chaining reasoning"""
        print("\n=== FORWARD CHAINING EXPLANATION ===")
        
        reasoning_chain = self.inference_engine.get_explanation()
        
        if not reasoning_chain:
            print("No reasoning performed yet.")
            return
        
        print("Step-by-step reasoning process:")
        step = 1
        
        for entry in reasoning_chain:
            if entry['type'] == 'input':
                print(f"{step}. INPUT: {entry['fact']}")
                print(f"   {entry['explanation']}")
            elif entry['type'] == 'inferred':
                print(f"{step}. INFERRED: {entry['fact']}")
                print(f"   Rule: {entry['rule_id']}")
                print(f"   Explanation: {entry['explanation']}")
            step += 1
    
    def explain_backward_chaining(self, goal, result):
        """Explain backward chaining reasoning"""
        print(f"\n=== BACKWARD CHAINING EXPLANATION ===")
        print(f"Goal: {goal}")
        
        if result:
            print(f"Result: PROVEN (Confidence: {result['confidence']:.2f})")
            print(f"Proof chain: {' -> '.join(result['proof_chain'])}")
            print(f"Key rule: {result['rule_id']}")
        else:
            print("Result: NOT PROVEN")
        
        print("\nReasoning trace:")
        reasoning_chain = self.inference_engine.get_explanation()
        
        for i, entry in enumerate(reasoning_chain, 1):
            if entry['type'] == 'input':
                print(f"{i}. Given: {entry['fact']}")
            elif entry['type'] == 'inferred':
                print(f"{i}. Inferred: {entry['fact']} (Rule: {entry['rule_id']})")
    
    def explain_rule(self, rule_id):
        """Explain a specific rule"""
        rules = self.inference_engine.knowledge_base.get_rules()
        rule = next((r for r in rules if r.rule_id == rule_id), None)
        
        if rule:
            print(f"\n=== RULE EXPLANATION ===")
            print(f"Rule ID: {rule.rule_id}")
            print(f"Rule: {rule}")
            print(f"Confidence: {rule.confidence:.2f}")
            print(f"Explanation: {rule.explanation}")
        else:
            print(f"Rule {rule_id} not found.")