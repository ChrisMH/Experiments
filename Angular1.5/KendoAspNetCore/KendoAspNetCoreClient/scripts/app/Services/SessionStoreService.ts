import * as angular from "angular";

export class SessionStoreService implements angular.IServiceProvider
{
    public static newStateMessage = "sssNewState";
    public static changedStateMessage = "sssChangedState";

    private static lastSessionIdKey: string = "lastSessionId";

    private creatingNewState = false;

    static $inject = ["$location", "$q", "$rootScope", "$timeout", "$window"];

    constructor(protected $location: angular.ILocationService,
        protected $q: angular.IQService,
        protected $rootScope: angular.IRootScopeService,
        protected $timeout: angular.ITimeoutService,
        protected $window: angular.IWindowService)
    {
        this.$rootScope.$on("$locationChangeSuccess", () => this.onLocationChangeSuccess());
    }


    /**
     * Creates a new session state, optionally replacing the existing
     * state with the new state.
     * 
     * @param replace true to replace the existing state
     */
    public createNewState(replace: boolean = false): void
    {
        //console.log(`SessionStoreService.createNewState`);
        let id = this.$location.hash();
        if (id && replace)
            this.$window.sessionStorage[id] = undefined;

        id = this.getNextStateId();
        this.$window.sessionStorage[id] = JSON.stringify({});

        this.creatingNewState = true;

        this.$location.hash(id);
        if (replace)
            this.$location.replace();

        // This $timeout is necessary so that the hash change propagates during the
        // next digest cycle.
        this.$timeout(() => this.$rootScope.$emit(SessionStoreService.newStateMessage));
    }

    /**
     * Loads data from the current session state
     * 
     * @param key The key to access the data
     * @returns The data, null if not found
     */
    public load(key: string): string
    {
        //console.log(`SessionStoreService.load: key=${key}`);

        let stateData = this.getCurrentStateData();

        if (!stateData || !stateData.hasOwnProperty(key)) return undefined;

        return stateData[key];
    }

    /**
     * Saves data in the current session state
     *
     * @param key The key to access the data
     * @param data The data to store
     * @returns true if successful
     */
    public save(key: string, data: string) : boolean
    {
        //console.log(`SessionStoreService.save: key=${key}`);

        let id = this.$location.hash();
        if (!id) return false;

        let stateData = this.getCurrentStateData();
        if (!stateData) return false;

        stateData[key] = data;
        this.$window.sessionStorage[id] = JSON.stringify(stateData);

        return true;
    }

    /**
     * $rootScope message on any URL change
     *
     * - Creates a new state if there isn't an existing state
     * - Sends the changedStateMessage unless a new state is being created
     * 
     */
    private onLocationChangeSuccess(): void
    {
        let id = this.$location.hash();
        //console.log(`SessionStoreService.onLocationChangeSuccess : sessionId=${id}`);

        if (this.creatingNewState)
        {
            this.creatingNewState = false;
            return;
        }

        if (!id)
        {
            this.createNewState(true);
            return;
        }

        this.$rootScope.$emit(SessionStoreService.changedStateMessage);
    }

    /**
     * Gets the next valid state ID give the current state ID
     *
     * @returns the next valid state ID
     */
    private getNextStateId(): string
    {
        let id = this.$window.sessionStorage[SessionStoreService.lastSessionIdKey];
        if (id)
        {
            id = parseInt(id);
            if (isNaN(id))
                id = 0;
        }
        else
        {
            id = 0;
        }

        let nextId = (++id).toString();
        this.$window.sessionStorage[SessionStoreService.lastSessionIdKey] = nextId;
        return nextId;
    }
    
    /**
     * Gets the data for the current session state
     *
     * @returns The current data, undefined if there is no current data
     */
    private getCurrentStateData(): {}
    {
        let id = this.$location.hash();
        if (!id) return undefined;

        let storedData = this.$window.sessionStorage[id];
        if (!storedData) return undefined;

        return JSON.parse(storedData) as {};
    }
    
    $get: any;
}