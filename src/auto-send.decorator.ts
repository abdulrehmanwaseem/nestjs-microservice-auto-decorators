import { ClientProxy } from "@nestjs/microservices";

export interface AutoSendOptions {
  /**
   * The name of the property where the ClientProxy is stored.
   */
  clientProperty: string;
}

/**
 * AutoSend decorator automatically constructs the message pattern and sends
 * the payload via the designated ClientProxy.
 *
 * It generates a pattern using the service name (derived from a service property
 * or class name) and the method name.
 *
 * Example:
 *   @AutoSend({ clientProperty: 'userClient' })
 *   findAll(id: string) {}  // resolves to sending { id } with pattern "users.findAll"
 */
export function AutoSend(options: AutoSendOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const client: ClientProxy = this[options.clientProperty];
      if (!client) {
        throw new Error(
          `ClientProxy not found on property "${options.clientProperty}"`
        );
      }

      // Derive service name from a property or by convention.
      const serviceName =
        this.serviceName ||
        this.constructor.name.replace("Service", "").toLowerCase();
      const pattern = `${serviceName}.${propertyKey}`;

      // If the payload is not an object, wrap it as { id: payload }
      let payload = args[0];
      if (typeof payload !== "object" || payload === null) {
        payload = { id: payload };
      }

      return client.send(pattern, payload);
    };
    return descriptor;
  };
}
