package com.healthcare.api;

import java.util.*;
import java.io.*;
import java.sql.*;
import java.util.logging.Logger;

/**
 * Healthcare API with Privacy Vulnerabilities
 * This demonstrates various HIPAA and privacy violations
 */
public class HealthcareAPI {
    
    // CRITICAL: Hardcoded database credentials
    private static final String DB_URL = "jdbc:mysql://localhost:3306/healthcare";
    private static final String DB_USER = "admin";
    private static final String DB_PASSWORD = "super_secret_password_123";
    
    // CRITICAL: Hardcoded API keys
    private static final String API_KEY = "sk_live_healthcare_api_key_123456789";
    private static final String JWT_SECRET = "healthcare_jwt_secret_key_should_be_secure";
    
    // CRITICAL: Hardcoded PII and PHI
    private static final String ADMIN_EMAIL = "admin@healthcare.com";
    private static final String SUPPORT_PHONE = "555-123-4567";
    private static final String DEFAULT_PATIENT_SSN = "123-45-6789";
    
    private Logger logger = Logger.getLogger(HealthcareAPI.class.getName());
    private List<Patient> patients = new ArrayList<>();
    
    /**
     * CRITICAL: Patient class with sensitive data exposure
     */
    public static class Patient {
        public String patientId;
        public String firstName;
        public String lastName;
        public String ssn;           // CRITICAL: SSN should be encrypted
        public String dateOfBirth;
        public String phoneNumber;
        public String email;
        public String address;
        public String medicalHistory; // CRITICAL: PHI data
        public String diagnosis;      // CRITICAL: PHI data
        public String medications;    // CRITICAL: PHI data
        public String insuranceId;    // CRITICAL: Sensitive data
        
        // CRITICAL: Constructor logs sensitive data
        public Patient(String patientId, String firstName, String lastName, String ssn) {
            this.patientId = patientId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.ssn = ssn;
            
            // CRITICAL: Logging SSN during object creation
            System.out.println("Creating patient with SSN: " + ssn);
        }
    }
    
    /**
     * CRITICAL: Creating patient with privacy violations
     */
    public Patient createPatient(String firstName, String lastName, String ssn, 
                                String dateOfBirth, String phoneNumber, String email) {
        
        // CRITICAL: Logging sensitive patient data
        logger.info("Creating patient: " + firstName + " " + lastName);
        logger.info("Patient SSN: " + ssn);
        logger.info("Patient DOB: " + dateOfBirth);
        logger.info("Patient phone: " + phoneNumber);
        
        Patient patient = new Patient(generatePatientId(), firstName, lastName, ssn);
        patient.dateOfBirth = dateOfBirth;
        patient.phoneNumber = phoneNumber;
        patient.email = email;
        
        // CRITICAL: Storing patient data without encryption
        patients.add(patient);
        
        // CRITICAL: Writing patient data to unencrypted file
        savePatientToFile(patient);
        
        return patient;
    }
    
    /**
     * CRITICAL: Exposing all patient data without proper access controls
     */
    public Patient getPatient(String patientId) {
        for (Patient patient : patients) {
            if (patient.patientId.equals(patientId)) {
                // CRITICAL: Returning full patient data including SSN and PHI
                return patient;
            }
        }
        return null;
    }
    
    /**
     * CRITICAL: SQL injection vulnerability
     */
    public List<Patient> searchPatientsByName(String name) {
        String query = "SELECT * FROM patients WHERE first_name = '" + name + 
                      "' OR last_name = '" + name + "'";
        
        // CRITICAL: Executing vulnerable query
        return executeQuery(query);
    }
    
    /**
     * CRITICAL: Updating medical records without proper audit trail
     */
    public void updateMedicalHistory(String patientId, String medicalHistory, String diagnosis) {
        for (Patient patient : patients) {
            if (patient.patientId.equals(patientId)) {
                // CRITICAL: Updating PHI without logging changes
                patient.medicalHistory = medicalHistory;
                patient.diagnosis = diagnosis;
                
                // CRITICAL: Logging sensitive medical data
                logger.info("Updated medical history for patient " + patientId + ": " + medicalHistory);
                logger.info("Updated diagnosis for patient " + patientId + ": " + diagnosis);
                
                break;
            }
        }
    }
    
    /**
     * CRITICAL: Exposing patient data in API response without proper masking
     */
    public Map<String, Object> getPatientSummary(String patientId) {
        Patient patient = getPatient(patientId);
        if (patient != null) {
            // CRITICAL: Returning sensitive data without masking
            Map<String, Object> summary = new HashMap<>();
            summary.put("patientId", patient.patientId);
            summary.put("name", patient.firstName + " " + patient.lastName);
            summary.put("ssn", patient.ssn);           // Should be masked
            summary.put("dateOfBirth", patient.dateOfBirth);
            summary.put("phoneNumber", patient.phoneNumber);
            summary.put("email", patient.email);
            summary.put("medicalHistory", patient.medicalHistory); // PHI data
            summary.put("diagnosis", patient.diagnosis);           // PHI data
            summary.put("medications", patient.medications);       // PHI data
            summary.put("insuranceId", patient.insuranceId);       // Sensitive data
            
            return summary;
        }
        return null;
    }
    
    /**
     * CRITICAL: Weak encryption for sensitive data
     */
    public String encryptPatientData(String data) {
        // CRITICAL: Using weak encryption (MD5 is not secure)
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(data.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            logger.severe("Encryption failed: " + e.getMessage());
            return data; // CRITICAL: Returning plain text if encryption fails
        }
    }
    
    /**
     * CRITICAL: Saving patient data to unencrypted file
     */
    private void savePatientToFile(Patient patient) {
        try {
            FileWriter writer = new FileWriter("patients.txt", true);
            writer.write("Patient ID: " + patient.patientId + "\n");
            writer.write("Name: " + patient.firstName + " " + patient.lastName + "\n");
            writer.write("SSN: " + patient.ssn + "\n");
            writer.write("DOB: " + patient.dateOfBirth + "\n");
            writer.write("Phone: " + patient.phoneNumber + "\n");
            writer.write("Email: " + patient.email + "\n");
            writer.write("Medical History: " + patient.medicalHistory + "\n");
            writer.write("Diagnosis: " + patient.diagnosis + "\n");
            writer.write("---\n");
            writer.close();
        } catch (IOException e) {
            logger.severe("Failed to save patient data: " + e.getMessage());
        }
    }
    
    /**
     * CRITICAL: Database query execution without proper error handling
     */
    private List<Patient> executeQuery(String query) {
        List<Patient> results = new ArrayList<>();
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            
            while (rs.next()) {
                Patient patient = new Patient(
                    rs.getString("patient_id"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("ssn")
                );
                results.add(patient);
            }
            
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            // CRITICAL: Logging database errors with potentially sensitive information
            logger.severe("Database error: " + e.getMessage());
        }
        return results;
    }
    
    private String generatePatientId() {
        return "PAT" + System.currentTimeMillis();
    }
    
    public static void main(String[] args) {
        HealthcareAPI api = new HealthcareAPI();
        
        // Example usage with privacy violations
        Patient patient = api.createPatient(
            "John", "Doe", "123-45-6789", 
            "1990-01-01", "555-123-4567", "john.doe@email.com"
        );
        
        api.updateMedicalHistory(patient.patientId, 
            "Hypertension, Diabetes", "Type 2 Diabetes");
        
        Map<String, Object> summary = api.getPatientSummary(patient.patientId);
        System.out.println("Patient Summary: " + summary);
    }
} 