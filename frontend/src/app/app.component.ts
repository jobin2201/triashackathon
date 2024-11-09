import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Method for toggling the medication form visibility
  toggleMedicationForm() {
    // Here, you will handle the logic to toggle the medication form.
    // This could set a flag that shows/hides the form in the TodaysMedicationComponent
    console.log("Toggle Today's Medication Form");
  }

  // Method for handling the "My Inventory" button click
  viewInventory() {
    // Here, you will handle the logic for viewing the inventory.
    // You could navigate to another view or show some inventory list
    console.log("View My Inventory");
  }
}
