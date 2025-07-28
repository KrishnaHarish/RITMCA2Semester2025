#!/usr/bin/env python3
"""
Test Suite for Computer Networks Demonstrations
Validates that all components work correctly
"""

import subprocess
import sys
import os

def test_main_demo():
    """Test the main demonstration script"""
    print("🧪 Testing main demonstration...")
    try:
        result = subprocess.run([sys.executable, 'computer_networks_demo.py', 'models'], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0 and "OSI Reference Model" in result.stdout:
            print("✅ Main demo test PASSED")
            return True
        else:
            print("❌ Main demo test FAILED")
            print(f"Return code: {result.returncode}")
            print(f"Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Main demo test ERROR: {e}")
        return False

def test_advanced_tools():
    """Test the advanced tools script"""
    print("🧪 Testing advanced tools...")
    try:
        # Test if script can be imported and has main components
        import advanced_network_tools
        tools = advanced_network_tools.AdvancedNetworkTools()
        print("✅ Advanced tools test PASSED")
        return True
    except Exception as e:
        print(f"❌ Advanced tools test ERROR: {e}")
        return False

def test_file_integrity():
    """Test that all required files exist"""
    print("🧪 Testing file integrity...")
    required_files = [
        'computer_networks_demo.py',
        'advanced_network_tools.py',
        'Computer_Networks_Implementation_Demo.md'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Missing files: {missing_files}")
        return False
    else:
        print("✅ All required files present")
        return True

def run_all_tests():
    """Run all tests"""
    print("=" * 50)
    print("COMPUTER NETWORKS DEMO TEST SUITE")
    print("=" * 50)
    
    tests = [
        test_file_integrity,
        test_main_demo,
        test_advanced_tools
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"TEST RESULTS: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED! Implementation is ready.")
        return True
    else:
        print("❌ Some tests failed. Please check the implementation.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)