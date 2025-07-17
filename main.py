"""
Medical Expert System - Main Entry Point
Rule-Based Expert System for Medical Diagnosis using Forward and Backward Chaining

This system demonstrates classical AI reasoning techniques as described in
Russell & Norvig's "Artificial Intelligence: A Modern Approach"

Author: MCA Student
Date: 2025
Purpose: Educational demonstration of expert systems
"""

import sys
import os

# Add current directory to path to import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from user_interface import MedicalExpertSystemUI
from knowledge_base import MedicalKnowledgeBase
from inference_engine import InferenceEngine, ExplanationModule

def demonstrate_system():
    """Demonstrate the system with sample data"""
    print("=" * 60)
    print("SYSTEM DEMONSTRATION")
    print("=" * 60)
    
    # Initialize components
    kb = MedicalKnowledgeBase()
    ie = InferenceEngine(kb)
    em = ExplanationModule(ie)
    
    print("\nKnowledge Base Statistics:")
    print(f"- Total rules: {len(kb.get_rules())}")
    print(f"- Total symptoms: {len(kb.get_symptoms())}")
    print(f"- Total diagnoses: {len(kb.get_diagnoses())}")
    
    # Sample diagnosis 1: Common Cold
    print("\n" + "=" * 50)
    print("DEMONSTRATION 1: Common Cold Symptoms")
    print("=" * 50)
    
    sample_symptoms_1 = ["runny_nose", "sneezing", "sore_throat"]
    print(f"Input symptoms: {', '.join(sample_symptoms_1)}")
    
    diagnoses_1 = ie.forward_chaining(sample_symptoms_1)
    em.explain_forward_chaining()
    
    # Sample diagnosis 2: Flu
    print("\n" + "=" * 50)
    print("DEMONSTRATION 2: Flu Symptoms")
    print("=" * 50)
    
    sample_symptoms_2 = ["fever", "body_aches", "fatigue", "headache"]
    print(f"Input symptoms: {', '.join(sample_symptoms_2)}")
    
    diagnoses_2 = ie.forward_chaining(sample_symptoms_2)
    em.explain_forward_chaining()
    
    # Backward chaining demonstration
    print("\n" + "=" * 50)
    print("DEMONSTRATION 3: Backward Chaining")
    print("=" * 50)
    
    # Test if we can prove "migraine" with some symptoms
    test_symptoms = ["severe_headache", "nausea"]
    print(f"Input symptoms: {', '.join(test_symptoms)}")
    
    result = ie.backward_chaining("migraine", test_symptoms)
    em.explain_backward_chaining("migraine", result)
    
    print("\n" + "=" * 60)
    print("DEMONSTRATION COMPLETE")
    print("=" * 60)

def run_interactive_mode():
    """Run the interactive user interface"""
    ui = MedicalExpertSystemUI()
    ui.run()

def main():
    """Main function with command-line options"""
    print("Medical Expert System - Rule-Based Diagnosis")
    print("Using Forward and Backward Chaining Algorithms")
    print("=" * 60)
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--demo":
            demonstrate_system()
            return
        elif sys.argv[1] == "--help":
            print("Usage:")
            print("  python main.py          - Run interactive mode")
            print("  python main.py --demo   - Run demonstration")
            print("  python main.py --help   - Show this help")
            return
        else:
            print(f"Unknown option: {sys.argv[1]}")
            print("Use --help for usage information")
            return
    
    # Default: run interactive mode
    run_interactive_mode()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nSystem interrupted by user. Goodbye!")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
        print("Please check the system and try again.")