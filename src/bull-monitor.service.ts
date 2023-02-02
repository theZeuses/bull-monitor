import { BullMonitorExpress } from "@bull-monitor/express";
import { Queue } from "bull";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";
import { Config } from "@bull-monitor/root";
import { QueueConfig } from "@bull-monitor/root/dist/queue";

export class BullMonitorExpressService extends BullMonitorExpress {
  constructor(queuesWithConfig: Array<{
    queue: Queue,
    config: QueueConfig
  }>, config: Omit<Config, "queues">) {
    super({ 
      queues: queuesWithConfig.map(q => new BullAdapter(q.queue, q.config)),
      ...config
    });
  }
}