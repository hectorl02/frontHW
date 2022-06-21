import { Component } from '@angular/core';
import { Person } from './shared/models/PersonModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'market-training';
  titleToSon: string = 'main-product works! - with string interpolation -- from Father component';
  secondProperty: string = '';

  persons: Person[] = [];

  onSaveEmit(person: Person): void {
    this.persons.push(person);
    alert(`Name: ${person.name} - lastName: ${person.lastName} --- from father component`);
  }
}
