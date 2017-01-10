import "angular";
import "ngMock";

import { AppSettings } from "../../app/Services";

export const configRoot: any = {
    page: {
        config: {
            originUrl: "http://origin/",
            rootUrl: "http://origin/root/",
            version: "1.0.0"
        }
    }
};
