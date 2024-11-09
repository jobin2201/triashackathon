import requests
import json

BASE_URL = "http://localhost:5000"  # Update with the correct base URL of your backend

# Function to add a new medication
def add_medication(medication_data):
    response = requests.post(f"{BASE_URL}/medications", json=medication_data)
    if response.status_code == 201:  # Medication successfully added
        print("Medication added successfully:", response.json())
        return response.json()  # Return the added medication data
    else:
        print(f"Failed to add medication: {response.text}")
        return None

# Function to get all medications
def get_medications():
    response = requests.get(f"{BASE_URL}/medications")
    if response.status_code == 200:
        medications = response.json()
        print("Get Medications:", medications)
        return medications
    else:
        print(f"Failed to get medications: {response.text}")
        return []

# Function to edit an existing medication
def edit_medication(medication_id, medication_data):
    response = requests.put(f"{BASE_URL}/medications/{medication_id}", json=medication_data)
    if response.status_code == 200:
        print("Edit Medication:", response.json())
    else:
        print(f"Failed to edit medication: {response.text}")

# Function to delete a medication
def delete_medication(medication_id):
    response = requests.delete(f"{BASE_URL}/medications/{medication_id}")
    if response.status_code == 200:
        print("Delete Medication:", response.json())
    else:
        print(f"Failed to delete medication: {response.text}")

# Function to add a new reminder
def add_reminder(reminder_data):
    response = requests.post(f"{BASE_URL}/reminders", json=reminder_data)
    if response.status_code == 201:
        print("Reminder added successfully:", response.json())
    else:
        print(f"Failed to add reminder: {response.text}")

# Function to get all reminders
def get_reminders():
    response = requests.get(f"{BASE_URL}/reminders")
    if response.status_code == 200:
        reminders = response.json()
        print("Get Reminders:", reminders)
        return reminders
    else:
        print(f"Failed to get reminders: {response.text}")
        return []

# Function to delete a reminder
def delete_reminder(reminder_id):
    response = requests.delete(f"{BASE_URL}/reminders/{reminder_id}")
    if response.status_code == 200:
        print("Delete Reminder:", response.json())
    else:
        print(f"Failed to delete reminder: {response.text}")

# Function to mark a reminder as taken
# Function to mark a reminder as taken
def mark_reminder_as_taken(reminder_id):
    response = requests.put(f"{BASE_URL}/reminders/{reminder_id}/taken")
    if response.status_code == 200:
        # Check if the response is not empty and can be parsed as JSON
        try:
            print("Mark Reminder as Taken:", response.json())
        except json.JSONDecodeError:
            print("No JSON response received, raw response:", response.text)
    else:
        print(f"Failed to mark reminder as taken: {response.text}")

# Sample medication data
medication_data = {
    "name": "Paracetamol",
    "dosage": "500mg",
    "frequency": 3,
    "start_date": "2023-12-31T18:30:00.000Z",
    "end_date": "2024-01-09T18:30:00.000Z",
    "notes": "Take with food"
}

# Sample reminder data
reminder_data = {
    "medication_id": 1,  # Ensure this exists in the medications table
    "reminder_time": "2023-12-31T18:30:00.000Z",
    "status": "pending"
}

# Add medication
added_medication = add_medication(medication_data)

# Get all medications
medications = get_medications()

# If medications are available, proceed to add reminders
if medications:
    # Ensure medication_id is valid and exists in the medications table
    medication_id = medications[0]['id']  # This assumes the first medication exists
    reminder_data['medication_id'] = medication_id

    # Add a reminder for the medication
    add_reminder(reminder_data)

    # Get all reminders
    reminders = get_reminders()

    # Example: Delete the first reminder (if exists)
    if reminders:
        reminder_id = reminders[0]['id']
        delete_reminder(reminder_id)

    # Delete medication
    delete_medication(medication_id)

# Mark a reminder as taken (example)
if reminders:
    reminder_id = reminders[0]['id']
    mark_reminder_as_taken(reminder_id)
