import { Component, EventEmitter, Input, HostBinding, Output} from "@angular/core";

import { Customer } from "./Backlog";

@Component({
    moduleId: module.id,
    selector: "customer-block",
    templateUrl: "./CustomerBlock.html"
})

export class CustomerBlock
{
    @Input() customer: Customer;   
    @Output() expand = new EventEmitter();

    @HostBinding("class.customer-block-good") customerBlockGood: boolean = false;
    @HostBinding("class.customer-block-poor") customerBlockPoor: boolean = false;
    @HostBinding("class.customer-block-bad") customerBlockBad: boolean = false;

    ngDoCheck(): void
    {
        this.customerBlockGood = this.customer && this.customer.backlog <= 50;
        this.customerBlockPoor = this.customer && this.customer.backlog > 50 && this.customer.backlog <= 250;
        this.customerBlockBad = this.customer && this.customer.backlog > 250;
    }

    protected onExpandClick(): void
    {
        this.expand.emit();
    }

}