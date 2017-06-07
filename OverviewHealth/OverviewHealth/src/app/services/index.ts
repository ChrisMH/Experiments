import { InjectionToken } from "@angular/core";

export const WINDOW = new InjectionToken<Window>("WindowToken");

export * from "./OvServicesModule";

export * from "./AppSettings";
export * from "./RouteGuard";


