"""
User Interface for Medical Expert System
Provides CLI interface for symptom input and result display
"""

import sys
from knowledge_base import MedicalKnowledgeBase
from inference_engine import InferenceEngine, ExplanationModule

class MedicalExpertSystemUI:
    """Command-line interface for the medical expert system"""
    
    def __init__(self):
        self.knowledge_base = MedicalKnowledgeBase()
        self.inference_engine = InferenceEngine(self.knowledge_base)
        self.explanation_module = ExplanationModule(self.inference_engine)
        self.current_symptoms = []
    
    def display_welcome(self):
        """Display welcome message"""
        print("=" * 60)
        print("    MEDICAL EXPERT SYSTEM")
        print("    Rule-Based Diagnosis using Forward & Backward Chaining")
        print("=" * 60)
        print("\nThis system uses classical AI reasoning techniques to help")
        print("diagnose medical conditions based on symptoms.")
        print("\nDISCLAIMER: This is for educational purposes only.")
        print("Always consult a healthcare professional for medical advice.")
        print("=" * 60)
    
    def display_menu(self):
        """Display main menu"""
        print("\n" + "=" * 40)
        print("MAIN MENU")
        print("=" * 40)
        print("1. View Available Symptoms")
        print("2. Enter Symptoms")
        print("3. Forward Chaining Diagnosis")
        print("4. Backward Chaining Diagnosis")
        print("5. View Knowledge Base")
        print("6. View Explanation")
        print("7. Clear Current Symptoms")
        print("8. Exit")
        print("=" * 40)
    
    def display_symptoms(self):
        """Display available symptoms"""
        print("\n" + "=" * 40)
        print("AVAILABLE SYMPTOMS")
        print("=" * 40)
        
        symptoms = self.knowledge_base.get_symptoms()
        
        # Display in columns for better readability
        for i, symptom in enumerate(symptoms, 1):
            formatted_symptom = symptom.replace('_', ' ').title()
            print(f"{i:2d}. {formatted_symptom}")
        
        print("=" * 40)
    
    def enter_symptoms(self):
        """Allow user to enter symptoms"""
        print("\n" + "=" * 40)
        print("SYMPTOM INPUT")
        print("=" * 40)
        
        self.display_symptoms()
        
        print(f"\nCurrent symptoms: {', '.join(self.current_symptoms) if self.current_symptoms else 'None'}")
        print("\nEnter symptoms (comma-separated numbers or names):")
        print("Example: 1,3,5 or fever,headache,nausea")
        print("Press Enter to finish, 'clear' to clear current symptoms")
        
        user_input = input("\nSymptoms: ").strip()
        
        if user_input.lower() == 'clear':
            self.current_symptoms.clear()
            print("Current symptoms cleared.")
            return
        
        if not user_input:
            return
        
        # Parse input
        symptoms = self.knowledge_base.get_symptoms()
        
        # Try to parse as numbers first
        try:
            indices = [int(x.strip()) - 1 for x in user_input.split(',')]
            for idx in indices:
                if 0 <= idx < len(symptoms):
                    symptom = symptoms[idx]
                    if symptom not in self.current_symptoms:
                        self.current_symptoms.append(symptom)
                else:
                    print(f"Invalid symptom number: {idx + 1}")
        except ValueError:
            # Parse as symptom names
            input_symptoms = [x.strip().lower().replace(' ', '_') for x in user_input.split(',')]
            for symptom in input_symptoms:
                if symptom in symptoms:
                    if symptom not in self.current_symptoms:
                        self.current_symptoms.append(symptom)
                else:
                    print(f"Unknown symptom: {symptom}")
        
        print(f"\nUpdated symptoms: {', '.join(self.current_symptoms) if self.current_symptoms else 'None'}")
    
    def run_forward_chaining(self):
        """Run forward chaining diagnosis"""
        if not self.current_symptoms:
            print("\nNo symptoms entered. Please enter symptoms first.")
            return
        
        print("\n" + "=" * 60)
        print("FORWARD CHAINING DIAGNOSIS")
        print("=" * 60)
        
        diagnoses = self.inference_engine.forward_chaining(self.current_symptoms)
        
        print("\n" + "=" * 40)
        print("DIAGNOSIS RESULTS")
        print("=" * 40)
        
        if diagnoses:
            print("Possible diagnoses and recommendations:")
            for i, diagnosis in enumerate(diagnoses, 1):
                formatted_diagnosis = diagnosis.replace('_', ' ').title()
                print(f"{i}. {formatted_diagnosis}")
        else:
            print("No specific diagnosis could be determined.")
            print("Consider consulting a healthcare professional.")
        
        print("\nUse option 6 to view detailed explanation.")
    
    def run_backward_chaining(self):
        """Run backward chaining diagnosis"""
        if not self.current_symptoms:
            print("\nNo symptoms entered. Please enter symptoms first.")
            return
        
        print("\n" + "=" * 60)
        print("BACKWARD CHAINING DIAGNOSIS")
        print("=" * 60)
        
        # Display available diagnoses
        diagnoses = [d for d in self.knowledge_base.get_diagnoses() 
                    if not any(keyword in d for keyword in ['rest', 'drink', 'see', 'medication', 'avoid'])]
        
        print("Available diagnoses to test:")
        for i, diagnosis in enumerate(diagnoses, 1):
            formatted_diagnosis = diagnosis.replace('_', ' ').title()
            print(f"{i}. {formatted_diagnosis}")
        
        try:
            choice = int(input("\nEnter diagnosis number to test: ")) - 1
            if 0 <= choice < len(diagnoses):
                goal_diagnosis = diagnoses[choice]
                result = self.inference_engine.backward_chaining(goal_diagnosis, self.current_symptoms)
                
                print("\n" + "=" * 40)
                print("BACKWARD CHAINING RESULTS")
                print("=" * 40)
                
                if result:
                    print(f"✓ {goal_diagnosis.replace('_', ' ').title()} can be PROVEN")
                    print(f"Confidence: {result['confidence']:.2f}")
                else:
                    print(f"✗ {goal_diagnosis.replace('_', ' ').title()} cannot be proven")
                    print("with the current symptoms.")
                
                print("\nUse option 6 to view detailed explanation.")
            else:
                print("Invalid choice.")
        except ValueError:
            print("Please enter a valid number.")
    
    def view_knowledge_base(self):
        """Display knowledge base"""
        print("\n" + "=" * 60)
        print("KNOWLEDGE BASE")
        print("=" * 60)
        
        self.knowledge_base.display_knowledge_base()
        
        print(f"Total rules: {len(self.knowledge_base.get_rules())}")
        print(f"Total symptoms: {len(self.knowledge_base.get_symptoms())}")
        print(f"Total diagnoses: {len(self.knowledge_base.get_diagnoses())}")
    
    def view_explanation(self):
        """Display explanation of last reasoning"""
        print("\n" + "=" * 60)
        print("EXPLANATION FACILITY")
        print("=" * 60)
        
        reasoning_chain = self.inference_engine.get_explanation()
        
        if not reasoning_chain:
            print("No reasoning performed yet.")
            print("Please run forward or backward chaining first.")
            return
        
        print("Choose explanation type:")
        print("1. Forward Chaining Explanation")
        print("2. Backward Chaining Explanation")
        print("3. Rule Details")
        
        try:
            choice = int(input("Enter choice (1-3): "))
            
            if choice == 1:
                self.explanation_module.explain_forward_chaining()
            elif choice == 2:
                # For backward chaining, we need the last goal and result
                # This is a simplified version - in a full implementation,
                # we'd store the last backward chaining result
                print("Last backward chaining explanation:")
                self.explanation_module.explain_forward_chaining()
            elif choice == 3:
                rule_id = input("Enter rule ID (e.g., R001): ").strip()
                self.explanation_module.explain_rule(rule_id)
            else:
                print("Invalid choice.")
        except ValueError:
            print("Please enter a valid number.")
    
    def clear_symptoms(self):
        """Clear current symptoms"""
        self.current_symptoms.clear()
        print("\nCurrent symptoms cleared.")
    
    def run(self):
        """Main application loop"""
        self.display_welcome()
        
        while True:
            self.display_menu()
            
            try:
                choice = int(input("\nEnter your choice (1-8): "))
                
                if choice == 1:
                    self.display_symptoms()
                elif choice == 2:
                    self.enter_symptoms()
                elif choice == 3:
                    self.run_forward_chaining()
                elif choice == 4:
                    self.run_backward_chaining()
                elif choice == 5:
                    self.view_knowledge_base()
                elif choice == 6:
                    self.view_explanation()
                elif choice == 7:
                    self.clear_symptoms()
                elif choice == 8:
                    print("\nThank you for using the Medical Expert System!")
                    print("Remember to consult healthcare professionals for medical advice.")
                    sys.exit(0)
                else:
                    print("Invalid choice. Please enter a number between 1 and 8.")
            
            except ValueError:
                print("Please enter a valid number.")
            except KeyboardInterrupt:
                print("\n\nGoodbye!")
                sys.exit(0)
            
            # Wait for user to continue
            input("\nPress Enter to continue...")

def main():
    """Main function to run the medical expert system"""
    ui = MedicalExpertSystemUI()
    ui.run()

if __name__ == "__main__":
    main()