import requests

BASE_URL = "http://localhost:5000"  # Adjust the port if necessary

def add_medication():
    url = f"{BASE_URL}/medications"
    data = {
        "name": "Paracetamol",
        "dosage": "500mg",
        "frequency": 3,
        "start_date": "2024-01-01",
        "end_date": "2024-01-10",
        "notes": "Take with food"
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Add Medication:", response.json())
        return response.json().get('id')  # Returning ID of the added medication
    else:
        print("Failed to add medication:", response.text)
        return None

def get_medications():
    url = f"{BASE_URL}/medications"
    response = requests.get(url)
    if response.status_code == 200:
        medications = response.json()
        print("Get Medications:", medications)
        return medications  # Return list of medications if needed
    else:
        print("Failed to get medications:", response.text)
        return []

# Dynamically getting medication ID for reminder or update
medications = get_medications()
if medications:
    medication_id = medications[0]['id']  # Use first medication's ID as an example
    print(f"Using medication ID: {medication_id}")
else:
    medication_id = add_medication()  # Add a new medication if none exist
    if medication_id is not None:
        print(f"New medication added with ID: {medication_id}")

def edit_medication(medication_id):
    url = f"{BASE_URL}/medications/{medication_id}"
    data = {
        "name": "Ibuprofen",
        "dosage": "200mg",
        "frequency": 2,
        "start_date": "2024-01-01",
        "end_date": "2024-01-05",
        "notes": "Take after meals"
    }
    response = requests.put(url, json=data)
    if response.status_code == 200:
        print("Edit Medication:", response.json())
    else:
        print("Failed to edit medication:", response.text)

def delete_medication(medication_id):
    url = f"{BASE_URL}/medications/{medication_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print("Delete Medication:", response.json())
    else:
        print("Failed to delete medication:", response.text)

def add_reminder(medication_id):
    url = f"{BASE_URL}/reminders"
    data = {
        "medication_id": medication_id,  # Use valid medication ID
        "reminder_time": "2024-01-02T09:00:00"
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Add Reminder:", response.json())
    else:
        print("Failed to add reminder:", response.text)

def get_reminders():
    url = f"{BASE_URL}/reminders"
    response = requests.get(url)
    if response.status_code == 200:
        print("Get Reminders:", response.json())
    else:
        print("Failed to get reminders:", response.text)

def mark_reminder_as_taken(reminder_id):
    url = f"{BASE_URL}/reminders/{reminder_id}"
    response = requests.put(url)
    if response.status_code == 200:
        print("Mark Reminder as Taken:", response.json())
    else:
        print("Failed to mark reminder as taken:", response.text)

def delete_reminder(reminder_id):
    url = f"{BASE_URL}/reminders/{reminder_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print("Delete Reminder:", response.json())
    else:
        print("Failed to delete reminder:", response.text)

# Run the functions to test the API
if __name__ == "__main__":
    # Add a new medication if none exists
    medication_id = add_medication() or medication_id
    
    # Get all medications
    get_medications()
    
    # Update a specific medication if a valid ID exists
    if medication_id:
        edit_medication(medication_id)
    
    # Delete a specific medication if a valid ID exists
    if medication_id:
        delete_medication(medication_id)

    # Add a reminder for a medication if valid medication_id
    if medication_id:
        add_reminder(medication_id)
    
    # Get all reminders
    get_reminders()
    
    # Mark a reminder as taken (use a valid reminder ID)
    mark_reminder_as_taken(1)  # Replace '1' with the actual reminder ID
    
    # Delete a reminder (use a valid reminder ID)
    delete_reminder(1)  # Replace '1' with the actual reminder ID
