import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "datepickerpopup",
    template: `
      <label>{{label}}</label>
      <input [(ngModel)]="dateModel" class="form-control"  (focus)="showPopup()" />
        <a class="btn" href="#"><i class="icon-calendar"></i></a>
      <datepicker class="popup" *ngIf="showDatepicker" [(ngModel)]="dateModel" [showWeeks]="true" (ngModelChange)="hidePopup($event)" ></datepicker>
  `,
    styles: [`
    .popup {
      position: absolute;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #ddd;
      height: 251px;
    }
  `]
})
export class DatepickerPopup {
    @Input()
    dateModel: Date;

    @Input()
    label: string;

    @Output()
    dateModelChange: EventEmitter<Date> = new EventEmitter<Date>();

    private showDatepicker: boolean = false;

    showPopup() {
        this.showDatepicker = true;
    }

    hidePopup(event: Date) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    }
}