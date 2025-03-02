import { ClientProxy } from "@nestjs/microservices";

export interface AutoSendOptions {
  clientProperty: string;
}

export function AutoSend(options: AutoSendOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      const client: ClientProxy = this[options.clientProperty];
      if (!client) {
        throw new Error(
          `ClientProxy not found on property "${options.clientProperty}"`
        );
      }

      const serviceName =
        this.serviceName ||
        this.constructor.name.replace("Service", "").toLowerCase();
      const pattern = `${serviceName}.${propertyKey}`;

      let payload = args[0];
      if (typeof payload !== "object" || payload === null) {
        payload = { id: payload };
      }

      return client.send(pattern, payload);
    };
    return descriptor;
  };
}
