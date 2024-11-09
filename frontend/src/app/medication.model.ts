// src/app/medication.model.ts

export type FormType = 'Capsule' | 'Tablet' | 'Syrup';
export type StrengthUnitType = 'mg' | 'litres';
export type QualifierType = 'Before Food' | 'After Food' | 'During Food';
export type DurationUnitType = 'days' | 'months' | 'years';

export interface Medication {
  id: number;
  drug_name: string;
  form: FormType;
  strength: number;
  strength_unit: StrengthUnitType;
  dosage: number;
  qualifier: QualifierType;
  start_date: string;       // Use Date if you prefer handling dates as Date objects in Angular
  duration: number;
  duration_unit: DurationUnitType;
  frequency: string[];      // Using an array of strings for multiple frequency values
  add_meds: number;
  remind_when: number;
  refill_reminder: boolean;
}
