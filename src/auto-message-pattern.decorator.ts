import { MessagePattern } from "@nestjs/microservices";
import { Reflector } from "@nestjs/core";
import "reflect-metadata";

export function AutoMessagePattern() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const reflector = new Reflector();
    const controllerPath: string | undefined = reflector.get(
      "path",
      target.constructor
    );

    const resourceName: string = controllerPath
      ? controllerPath
      : target.constructor.name.replace("Controller", "").toLowerCase();

    const pattern = `${resourceName}.${propertyKey}`;

    return MessagePattern(pattern)(target, propertyKey, descriptor);
  };
}
