import { Component, EventEmitter, Input, HostBinding, Output} from "@angular/core";

import { Server } from "./Backlog";

@Component({
    moduleId: module.id,
    selector: "server-block",
    templateUrl: "./ServerBlock.html"
})

export class ServerBlock
{
    @Input() server: Server;   
    @Output() history = new EventEmitter();
    @Output() expand = new EventEmitter();

    @HostBinding("class.server-block-good") serverBlockGood: boolean = false;
    @HostBinding("class.server-block-poor") serverBlockPoor: boolean = false;
    @HostBinding("class.server-block-bad") serverBlockBad: boolean = false;

    ngDoCheck(): void
    {
        this.serverBlockGood = this.server && this.server.backlog <= 100;
        this.serverBlockPoor = this.server && this.server.backlog > 100 && this.server.backlog <= 500;
        this.serverBlockBad = this.server && this.server.backlog > 500;
    }

    protected onHistoryClick(): void
    {
        this.history.emit();
    }

    protected onExpandClick(): void
    {
        this.expand.emit();
    }
}
