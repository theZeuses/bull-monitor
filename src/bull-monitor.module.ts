import { BullModule, getQueueToken } from "@nestjs/bull";
import { DynamicModule, Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BullMonitorExpressService } from "./bull-monitor.service";
import { Queue } from "bull";
import { BULL_MONITOR_OPTIONS_TOKEN, BULL_MONITOR_TOKEN } from "./bull-monitor.constant";
import { AsyncOptions, Options } from "./bull-monitor.interface";

@Module({})
export class BullMonitorModule implements NestModule {
    constructor(
        @Inject(BULL_MONITOR_TOKEN)
        private monitor: BullMonitorExpressService,
        @Inject(BULL_MONITOR_OPTIONS_TOKEN)
        private options: Options
    ) { }

    async configure(consumer: MiddlewareConsumer) {
        await this.monitor.init();
        consumer.apply(...[...(this.options.middleware || []) as any, this.monitor.router]).forRoutes(this.options.route);
    }

    static register(options: Options): DynamicModule {
        const imports = [];
        const { queues, ...restConfig } = options.config;

        const configuredQueues = {};
        queues.map(q => {
            imports.push(BullModule.registerQueue(q));
            configuredQueues[q.name] = q;
        });

        return {
            module: BullMonitorModule,
            imports: [...imports],
            providers: [
                {
                    provide: BULL_MONITOR_TOKEN,
                    useFactory: (...injectedQueues: Array<Queue>) => {
                        return new BullMonitorExpressService(injectedQueues.map(q => ({
                            queue: q,
                            config: {
                                readonly: configuredQueues[q.name].readonly && true
                            }
                        })), restConfig);
                    },
                    inject: [...queues.map(q => getQueueToken(q.name))]
                },
                {
                    provide: BULL_MONITOR_OPTIONS_TOKEN,
                    useValue: options
                }
            ]
        }
    }

    static registerAsync(options: AsyncOptions): DynamicModule {
        const imports = [];
        const { queues, ...restConfig } = options.config;

        const configuredQueues = {};
        queues.map(q => {
            imports.push(BullModule.registerQueueAsync(q));
            configuredQueues[q.name] = q;
        });

        return {
            module: BullMonitorModule,
            imports: [...imports],
            providers: [
                {
                    provide: BULL_MONITOR_TOKEN,
                    useFactory: (...injectedQueues: Array<Queue>) => {
                        return new BullMonitorExpressService(injectedQueues.map(q => ({
                            queue: q,
                            config: {
                                readonly: configuredQueues[q.name].readonly && true
                            }
                        })), restConfig);
                    },
                    inject: [...queues.map(q => getQueueToken(q.name))]
                },
                {
                    provide: BULL_MONITOR_OPTIONS_TOKEN,
                    useValue: options
                }
            ]
        }
    }
}