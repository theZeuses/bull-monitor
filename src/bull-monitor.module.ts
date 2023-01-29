import { BullModule, getQueueToken } from "@nestjs/bull";
import { DynamicModule, Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BullMonitorExpressService } from "./bull-monitor.service";
import { Queue } from "bull";
import { BULL_MONITOR_OPTIONS_TOKEN, BULL_MONITOR_TOKEN } from "./bull-monitor.constant";
import { Options } from "./bull-monitor.interface";

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

        options.config.queues.map(queue => {
            imports.push(BullModule.registerQueue({ name: (typeof queue == "string" ? queue : queue.name) }));
        });

        const { queues, ...restConfig } = options.config;
        return {
            module: BullMonitorModule,
            imports,
            providers: [
                {
                    provide: BULL_MONITOR_TOKEN,
                    useFactory: (...injectedQueues: Array<Queue>) => {
                        return new BullMonitorExpressService(injectedQueues, restConfig);
                    },
                    inject: [...queues.map(queue => getQueueToken((typeof queue == "string" ? queue : queue.name)))]
                },
                {
                    provide: BULL_MONITOR_OPTIONS_TOKEN,
                    useValue: options
                }
            ]
        }
    }
}