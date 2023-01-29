import { NestMiddleware, Type } from "@nestjs/common";
import { Config as BaseConfig } from "@bull-monitor/root";

type Config = Omit<BaseConfig, "queues"> & {
    queues: Array<
        string |
        {
            name: string,
            readonly: boolean
        }
    >
}

export interface Options {
    route: string,
    config: Config,
    middleware?: Array<Type<NestMiddleware>>
}