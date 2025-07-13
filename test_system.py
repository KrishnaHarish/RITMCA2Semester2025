#!/usr/bin/env python3
"""
Test script for the Medical Expert System
Tests both forward and backward chaining functionality
"""

import sys
sys.path.append('.')

from knowledge_base import MedicalKnowledgeBase
from inference_engine import InferenceEngine, ExplanationModule

def test_forward_chaining():
    """Test forward chaining with various symptom combinations"""
    print("=" * 50)
    print("TESTING FORWARD CHAINING")
    print("=" * 50)
    
    kb = MedicalKnowledgeBase()
    ie = InferenceEngine(kb)
    
    # Test Case 1: Common Cold
    print("\nTest 1: Common Cold Symptoms")
    symptoms = ["runny_nose", "sneezing", "sore_throat"]
    diagnoses = ie.forward_chaining(symptoms)
    print(f"Expected: common_cold in results")
    print(f"Actual: {'common_cold' in diagnoses}")
    
    # Test Case 2: Flu
    print("\nTest 2: Flu Symptoms")
    symptoms = ["fever", "body_aches", "fatigue", "headache"]
    diagnoses = ie.forward_chaining(symptoms)
    print(f"Expected: influenza in results")
    print(f"Actual: {'influenza' in diagnoses}")
    
    # Test Case 3: Partial symptoms
    print("\nTest 3: Partial Symptoms")
    symptoms = ["fever", "headache"]
    diagnoses = ie.forward_chaining(symptoms)
    print(f"Results: {diagnoses}")
    
    return True

def test_backward_chaining():
    """Test backward chaining with goal-driven inference"""
    print("\n" + "=" * 50)
    print("TESTING BACKWARD CHAINING")
    print("=" * 50)
    
    kb = MedicalKnowledgeBase()
    ie = InferenceEngine(kb)
    
    # Test Case 1: Successful proof
    print("\nTest 1: Prove migraine with all symptoms")
    symptoms = ["severe_headache", "nausea", "light_sensitivity"]
    result = ie.backward_chaining("migraine", symptoms)
    print(f"Expected: migraine proven")
    print(f"Actual: {result is not None}")
    
    # Test Case 2: Failed proof
    print("\nTest 2: Prove migraine with missing symptoms")
    symptoms = ["severe_headache"]
    result = ie.backward_chaining("migraine", symptoms)
    print(f"Expected: migraine not proven")
    print(f"Actual: {result is None}")
    
    # Test Case 3: Common cold proof
    print("\nTest 3: Prove common cold")
    symptoms = ["runny_nose", "sneezing", "sore_throat"]
    result = ie.backward_chaining("common_cold", symptoms)
    print(f"Expected: common_cold proven")
    print(f"Actual: {result is not None}")
    
    return True

def test_knowledge_base():
    """Test knowledge base functionality"""
    print("\n" + "=" * 50)
    print("TESTING KNOWLEDGE BASE")
    print("=" * 50)
    
    kb = MedicalKnowledgeBase()
    
    print(f"Total rules: {len(kb.get_rules())}")
    print(f"Total symptoms: {len(kb.get_symptoms())}")
    print(f"Total diagnoses: {len(kb.get_diagnoses())}")
    
    # Test rule retrieval
    rules_with_fever = kb.get_rules_with_condition("fever")
    print(f"Rules with fever: {len(rules_with_fever)}")
    
    rules_with_cold = kb.get_rules_with_conclusion("common_cold")
    print(f"Rules concluding common_cold: {len(rules_with_cold)}")
    
    return True

def run_all_tests():
    """Run all tests"""
    print("Medical Expert System - Test Suite")
    print("=" * 60)
    
    try:
        test_knowledge_base()
        test_forward_chaining()
        test_backward_chaining()
        
        print("\n" + "=" * 60)
        print("ALL TESTS COMPLETED SUCCESSFULLY")
        print("=" * 60)
        
    except Exception as e:
        print(f"\nTEST FAILED: {e}")
        return False
    
    return True

if __name__ == "__main__":
    run_all_tests()