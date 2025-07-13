"""
Knowledge Base for Medical Expert System
Contains IF-THEN rules for medical diagnosis using classical AI reasoning
"""

class Rule:
    """Represents a single IF-THEN rule"""
    def __init__(self, rule_id, conditions, conclusions, confidence=1.0, explanation=""):
        self.rule_id = rule_id
        self.conditions = conditions  # List of symptoms/conditions (AND logic)
        self.conclusions = conclusions  # List of diagnoses/recommendations
        self.confidence = confidence  # Confidence level (0.0 to 1.0)
        self.explanation = explanation  # Explanation for the rule
    
    def __str__(self):
        return f"Rule {self.rule_id}: IF {' AND '.join(self.conditions)} THEN {', '.join(self.conclusions)}"

class MedicalKnowledgeBase:
    """Medical knowledge base containing diagnostic rules"""
    
    def __init__(self):
        self.rules = []
        self.symptoms = set()
        self.diagnoses = set()
        self.initialize_knowledge_base()
    
    def initialize_knowledge_base(self):
        """Initialize the knowledge base with medical rules"""
        
        # Rule 1: Common Cold
        self.add_rule(
            rule_id="R001",
            conditions=["runny_nose", "sneezing", "sore_throat"],
            conclusions=["common_cold"],
            confidence=0.85,
            explanation="Runny nose, sneezing, and sore throat are classic symptoms of common cold"
        )
        
        # Rule 2: Flu
        self.add_rule(
            rule_id="R002",
            conditions=["fever", "body_aches", "fatigue", "headache"],
            conclusions=["influenza"],
            confidence=0.80,
            explanation="Fever, body aches, fatigue, and headache strongly suggest influenza"
        )
        
        # Rule 3: Strep Throat
        self.add_rule(
            rule_id="R003",
            conditions=["sore_throat", "fever", "swollen_lymph_nodes"],
            conclusions=["strep_throat"],
            confidence=0.75,
            explanation="Sore throat with fever and swollen lymph nodes indicates strep throat"
        )
        
        # Rule 4: Migraine
        self.add_rule(
            rule_id="R004",
            conditions=["severe_headache", "nausea", "light_sensitivity"],
            conclusions=["migraine"],
            confidence=0.70,
            explanation="Severe headache with nausea and light sensitivity suggests migraine"
        )
        
        # Rule 5: Allergic Reaction
        self.add_rule(
            rule_id="R005",
            conditions=["skin_rash", "itching", "sneezing"],
            conclusions=["allergic_reaction"],
            confidence=0.65,
            explanation="Skin rash, itching, and sneezing indicate allergic reaction"
        )
        
        # Rule 6: Gastroenteritis
        self.add_rule(
            rule_id="R006",
            conditions=["nausea", "vomiting", "diarrhea"],
            conclusions=["gastroenteritis"],
            confidence=0.80,
            explanation="Nausea, vomiting, and diarrhea are signs of gastroenteritis"
        )
        
        # Rule 7: Bronchitis
        self.add_rule(
            rule_id="R007",
            conditions=["persistent_cough", "chest_pain", "fatigue"],
            conclusions=["bronchitis"],
            confidence=0.70,
            explanation="Persistent cough with chest pain and fatigue suggests bronchitis"
        )
        
        # Rule 8: Hypertension
        self.add_rule(
            rule_id="R008",
            conditions=["headache", "dizziness", "shortness_of_breath"],
            conclusions=["hypertension"],
            confidence=0.60,
            explanation="Headache, dizziness, and shortness of breath may indicate hypertension"
        )
        
        # Rule 9: Anemia
        self.add_rule(
            rule_id="R009",
            conditions=["fatigue", "weakness", "pale_skin"],
            conclusions=["anemia"],
            confidence=0.65,
            explanation="Fatigue, weakness, and pale skin are common signs of anemia"
        )
        
        # Rule 10: Sinusitis
        self.add_rule(
            rule_id="R010",
            conditions=["facial_pain", "nasal_congestion", "headache"],
            conclusions=["sinusitis"],
            confidence=0.75,
            explanation="Facial pain, nasal congestion, and headache indicate sinusitis"
        )
        
        # Recommendation Rules
        # Rule 11: Rest recommendation
        self.add_rule(
            rule_id="R011",
            conditions=["common_cold"],
            conclusions=["rest", "drink_fluids"],
            confidence=0.90,
            explanation="Common cold requires rest and adequate fluid intake"
        )
        
        # Rule 12: Medical attention for flu
        self.add_rule(
            rule_id="R012",
            conditions=["influenza"],
            conclusions=["see_doctor", "antiviral_medication"],
            confidence=0.85,
            explanation="Influenza may require medical attention and antiviral medication"
        )
        
        # Rule 13: Antibiotic for strep throat
        self.add_rule(
            rule_id="R013",
            conditions=["strep_throat"],
            conclusions=["see_doctor", "antibiotic_treatment"],
            confidence=0.90,
            explanation="Strep throat requires medical evaluation and antibiotic treatment"
        )
        
        # Rule 14: Migraine management
        self.add_rule(
            rule_id="R014",
            conditions=["migraine"],
            conclusions=["pain_medication", "rest_in_dark_room"],
            confidence=0.80,
            explanation="Migraine treatment includes pain medication and rest in dark room"
        )
        
        # Rule 15: Allergy management
        self.add_rule(
            rule_id="R015",
            conditions=["allergic_reaction"],
            conclusions=["antihistamine", "avoid_allergen"],
            confidence=0.85,
            explanation="Allergic reactions require antihistamines and allergen avoidance"
        )
    
    def add_rule(self, rule_id, conditions, conclusions, confidence=1.0, explanation=""):
        """Add a new rule to the knowledge base"""
        rule = Rule(rule_id, conditions, conclusions, confidence, explanation)
        self.rules.append(rule)
        
        # Update symptoms and diagnoses sets
        self.symptoms.update(conditions)
        self.diagnoses.update(conclusions)
    
    def get_rules(self):
        """Get all rules in the knowledge base"""
        return self.rules
    
    def get_symptoms(self):
        """Get all possible symptoms"""
        return sorted(list(self.symptoms))
    
    def get_diagnoses(self):
        """Get all possible diagnoses"""
        return sorted(list(self.diagnoses))
    
    def get_rules_with_condition(self, condition):
        """Get all rules that have a specific condition"""
        return [rule for rule in self.rules if condition in rule.conditions]
    
    def get_rules_with_conclusion(self, conclusion):
        """Get all rules that have a specific conclusion"""
        return [rule for rule in self.rules if conclusion in rule.conclusions]
    
    def display_knowledge_base(self):
        """Display all rules in the knowledge base"""
        print("\n=== MEDICAL KNOWLEDGE BASE ===")
        for rule in self.rules:
            print(f"{rule}")
            print(f"  Confidence: {rule.confidence:.2f}")
            print(f"  Explanation: {rule.explanation}")
            print()