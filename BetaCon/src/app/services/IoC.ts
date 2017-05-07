import { Container, interfaces } from "inversify";
import { AppSettings, ZoneService } from "../services";


let container: Container;

export function getContainer(): Container
{
    if(container === undefined)
    {
        container = new Container();
        container.bind<Object>("configRoot").toConstantValue(window);
        container.bind<AppSettings>(AppSettings).to(AppSettings).inSingletonScope();
        container.bind<ZoneService>(ZoneService).to(ZoneService).inSingletonScope();
    }
    return container;
}

