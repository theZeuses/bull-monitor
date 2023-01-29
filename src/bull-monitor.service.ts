import { BullMonitorExpress } from "@bull-monitor/express";
import { Queue } from "bull";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";
import { Config } from "@bull-monitor/root";

export class BullMonitorExpressService extends BullMonitorExpress {
  constructor(queues: Array<Queue>, config: Omit<Config, "queues">) {
    super({ 
      queues: queues.map(q => new BullAdapter(q)),
      ...config
    });
  }
}