import { Container, interfaces } from "inversify";
import { AppSettings } from "../Services";

export namespace IoC
{    
    let container: Container;

    export function getContainer(): Container
    {
        if(container === undefined)
        {
            container = new Container();
            container.bind<Object>("configRoot").toConstantValue(window);
            container.bind<AppSettings>(AppSettings).to(AppSettings).inSingletonScope();
        }
        return container;
    }
}

