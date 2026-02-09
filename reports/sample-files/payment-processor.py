#!/usr/bin/env python3
"""
Payment Processor with Privacy Vulnerabilities
This file demonstrates various privacy and security issues
"""

import json
import logging
import requests
from datetime import datetime

# CRITICAL: Hardcoded credentials and API keys
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
STRIPE_API_KEY = "sk_live_1234567890abcdefghijklmnopqrstuvwxyz"
DATABASE_URL = "postgresql://user:password123@localhost:5432/payments"

# CRITICAL: Hardcoded PII and sensitive data
CUSTOMER_SERVICE_EMAIL = "support@company.com"
CUSTOMER_SERVICE_PHONE = "1-800-555-0123"
DEFAULT_CC_NUMBER = "4111-1111-1111-1111"

class PaymentProcessor:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.transactions = []
        
    def process_payment(self, customer_data, payment_info):
        """
        Process customer payment with privacy violations
        """
        # CRITICAL: Logging sensitive payment data
        self.logger.info(f"Processing payment for customer: {customer_data['email']}")
        self.logger.info(f"Credit card: {payment_info['card_number']}")
        self.logger.info(f"CVV: {payment_info['cvv']}")
        
        # CRITICAL: Storing sensitive data in plain text
        transaction = {
            'customer_email': customer_data['email'],
            'customer_ssn': customer_data.get('ssn'),
            'card_number': payment_info['card_number'],
            'cvv': payment_info['cvv'],
            'expiry': payment_info['expiry'],
            'amount': payment_info['amount'],
            'timestamp': datetime.now().isoformat()
        }
        
        # CRITICAL: Writing sensitive data to file
        self.save_transaction_to_file(transaction)
        
        # CRITICAL: Sending sensitive data over HTTP (not HTTPS)
        response = requests.post(
            'http://payment-gateway.com/process',  # Should be HTTPS
            json=transaction,
            headers={'Authorization': f'Bearer {STRIPE_API_KEY}'}
        )
        
        return response.json()
    
    def save_transaction_to_file(self, transaction):
        """
        CRITICAL: Saving sensitive transaction data to unencrypted file
        """
        with open('transactions.json', 'a') as f:
            json.dump(transaction, f)
            f.write('\n')
    
    def get_customer_transactions(self, customer_email):
        """
        CRITICAL: Exposing all transaction data without proper access controls
        """
        # CRITICAL: SQL injection vulnerability
        query = f"SELECT * FROM transactions WHERE customer_email = '{customer_email}'"
        
        # CRITICAL: Returning sensitive data without masking
        return self.execute_query(query)
    
    def execute_query(self, query):
        """
        Placeholder for database execution
        """
        print(f"Executing query: {query}")
        return []
    
    def validate_credit_card(self, card_number):
        """
        CRITICAL: Weak validation and logging of credit card data
        """
        # CRITICAL: Logging full credit card number
        self.logger.info(f"Validating credit card: {card_number}")
        
        # CRITICAL: Storing credit card in memory without encryption
        self.current_card = card_number
        
        # Simple Luhn algorithm check (should be more robust)
        digits = [int(d) for d in str(card_number) if d.isdigit()]
        if len(digits) < 13:
            return False
        
        checksum = 0
        odd_digits = digits[-1::-2]
        even_digits = digits[-2::-2]
        
        checksum += sum(odd_digits)
        for d in even_digits:
            checksum += sum(divmod(d * 2, 10))
        
        return checksum % 10 == 0

# CRITICAL: Global variable with sensitive data
CUSTOMER_DATABASE = {
    "john.doe@example.com": {
        "name": "John Doe",
        "ssn": "123-45-6789",
        "phone": "555-123-4567",
        "address": "123 Main St, Anytown, CA 90210",
        "credit_cards": ["4111-1111-1111-1111", "5555-5555-5555-4444"]
    }
}

if __name__ == "__main__":
    processor = PaymentProcessor()
    
    # Example usage with privacy violations
    customer_data = {
        "email": "john.doe@example.com",
        "ssn": "123-45-6789"
    }
    
    payment_info = {
        "card_number": "4111-1111-1111-1111",
        "cvv": "123",
        "expiry": "12/25",
        "amount": 99.99
    }
    
    result = processor.process_payment(customer_data, payment_info)
    print(f"Payment result: {result}") 