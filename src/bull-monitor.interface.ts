import { NestMiddleware, Type } from "@nestjs/common";
import { Config as BaseConfig } from "@bull-monitor/root";
import { BullModuleAsyncOptions, BullModuleOptions } from "@nestjs/bull";

type Config = Omit<BaseConfig, "queues"> & {
    queues: Array<
        BullModuleOptions &
        {
            readonly?: boolean
        }
    >
}

type AsyncConfig = Omit<BaseConfig, "queues"> & {
    queues: Array<
        BullModuleAsyncOptions &
        {
            readonly?: boolean
        }
    >
}

export interface Options {
    route: string,
    config: Config,
    middleware?: Array<Type<NestMiddleware>>
}

export interface AsyncOptions {
    route: string,
    config: AsyncConfig,
    middleware?: Array<Type<NestMiddleware>>
}