import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Define the Enum types (same as the SQL types you mentioned)
enum FormType {
  Capsule = 'Capsule',
  Tablet = 'Tablet',
  Syrup = 'Syrup'
}

enum StrengthUnitType {
  mg = 'mg',
  litres = 'litres'
}

enum QualifierType {
  BeforeFood = 'Before Food',
  AfterFood = 'After Food',
  DuringFood = 'During Food'
}

enum DurationUnitType {
  Days = 'days',
  Months = 'months',
  Years = 'years'
}

interface Medication {
  id: number;
  name: string;
  form: FormType;
  strength: number;
  strength_unit: StrengthUnitType;
  dosage: number;
  qualifier: QualifierType;
  start_date: string;
  duration: number;
  duration_unit: DurationUnitType;
  frequency: string[];
  add_meds: number;
  remind_when: number;
  refill_reminder: boolean;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

interface DisplayedDate {
  day: string;
  date: string;
}

@Component({
  selector: 'app-todays-medication',
  templateUrl: './todays-medication.component.html',
  styleUrls: ['./todays-medication.component.css']
})
export class TodaysMedicationComponent {
  showMedicationForm: boolean = false;
  showInventoryForm: boolean = false;
  showCalendar: boolean = false;
  newMedication: Omit<Medication, 'id'> = {
    name: '',
    form: FormType.Capsule,
    strength: 0,
    strength_unit: StrengthUnitType.mg,
    dosage: 0,
    qualifier: QualifierType.BeforeFood,
    start_date: '',
    duration: 0,
    duration_unit: DurationUnitType.Days,
    frequency: [],
    add_meds: 0,
    remind_when: 0,
    refill_reminder: false
  };

  medications: Medication[] = [];
  private nextMedicationId: number = 1;

  inventoryItems: InventoryItem[] = [];
  private nextInventoryId: number = 1;

  displayedDates: DisplayedDate[] = [];
  selectedDateIndex: number = 0;

  newInventoryItem: Omit<InventoryItem, 'id'> = { name: '', quantity: 0 };

  // Enum Options for the forms
  formOptions = Object.values(FormType);
  strengthUnitOptions = Object.values(StrengthUnitType);
  qualifierOptions = Object.values(QualifierType);
  durationUnitOptions = Object.values(DurationUnitType);

  constructor(private router: Router) {
    this.generateDates();
  }

  // Method to navigate back to the previous page
  goBack(): void {
    this.router.navigate(['']);  // Navigate to the home or main page (adjust the route as necessary)
  }

  // Add medication method (similar to your previous implementation)
  addMedication() {
    if (this.newMedication.name) {
      const newMedWithId: Medication = { 
        id: this.nextMedicationId++, 
        ...this.newMedication 
      };
      this.medications.push(newMedWithId);
      this.newMedication = {
        name: '',
        form: FormType.Capsule,
        strength: 0,
        strength_unit: StrengthUnitType.mg,
        dosage: 0,
        qualifier: QualifierType.BeforeFood,
        start_date: '',
        duration: 0,
        duration_unit: DurationUnitType.Days,
        frequency: [],
        add_meds: 0,
        remind_when: 0,
        refill_reminder: false
      };
    }
  }
  
  deleteMedication(id: number) {
    this.medications = this.medications.filter(medication => medication.id !== id);
  }
  toggleMedicationForm() {
    this.showMedicationForm = !this.showMedicationForm;
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  addInventoryItem() {
    if (this.newInventoryItem.name && this.newInventoryItem.quantity > 0) {
      const newItemWithId: InventoryItem = { 
        id: this.nextInventoryId++, 
        ...this.newInventoryItem 
      };
      this.inventoryItems.push(newItemWithId);
      this.newInventoryItem = { name: '', quantity: 0 };
    }
  }

  deleteInventoryItem(id: number) {
    this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
  }

  toggleInventoryForm() {
    this.showInventoryForm = !this.showInventoryForm;
  }

  generateDates(): void {
    const today = new Date();
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.toLocaleString('en-us', { weekday: 'short' });
      const dateStr = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'short' })}`;
      this.displayedDates.push({ day, date: dateStr });
    }
  }

  selectDate(index: number): void {
    this.selectedDateIndex = index;
  }

  scrollLeft(): void {
    this.displayedDates.unshift(this.displayedDates.pop()!);
  }

  scrollRight(): void {
    this.displayedDates.push(this.displayedDates.shift()!);
  }

  // Added navigateToSection method
  navigateToSection(section: string): void {
    this.router.navigate([`/`]); // Adjust path as necessary
  }
}
