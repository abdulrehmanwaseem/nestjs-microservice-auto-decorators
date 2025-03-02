import { MessagePattern } from "@nestjs/microservices";
import "reflect-metadata";

/**
 * AutoMessagePattern decorator automatically generates a message pattern
 * based on the controller's path or class name and the decorated method's name.
 *
 * Example:
 *   @AutoMessagePattern()
 *   findAll() { ... } // resolves to "users.findAll" if controller is @Controller('users')
 */
export function AutoMessagePattern() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerPath: string | undefined = Reflect.getMetadata(
      "path",
      target.constructor
    );
    const resourceName: string = controllerPath
      ? controllerPath
      : target.constructor.name.replace("Controller", "").toLowerCase();

    const pattern = `${resourceName}.${propertyKey}`;

    // Apply Nest's MessagePattern with the auto-generated pattern.
    return MessagePattern(pattern)(target, propertyKey, descriptor);
  };
}
