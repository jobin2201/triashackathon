import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medication } from './medication.model';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  private apiUrl = 'http://localhost:5000/api/medications'; // Adjust the endpoint as needed

  constructor(private http: HttpClient) {}

  // Fetch all medications
  getMedications(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.apiUrl);
  }

  // Add a new medication
  addMedication(medication: Medication): Observable<Medication> {
    return this.http.post<Medication>(this.apiUrl, medication);
  }

  // Delete a medication
  deleteMedication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
