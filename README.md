# nestjs-microservice-auto-decorators

**nestjs-microservice-auto-decorators** is a utility package for NestJS microservices that provides two decorators—`AutoMessagePattern` and `AutoSend`—to reduce boilerplate and enforce consistency in message pattern creation and message sending.

## Features

- **AutoMessagePattern:** Automatically generates a message pattern based on the controller's metadata and method name.
- **AutoSend:** Automatically constructs the message pattern for client methods and sends payloads via a ClientProxy.
- Designed with industry best practices for modularity and reusability.

## Installation

```bash
npm install nestjs-microservice-auto-decorators
```

## Usage

### AutoMessagePattern

Apply it to controller methods to auto-generate the message pattern:

```ts
import { Controller } from "@nestjs/common";
import { AutoMessagePattern } from "nestjs-microservice-auto-decorators";

@Controller("users")
export class UsersController {
  @AutoMessagePattern()
  findAll() {
    // Automatically resolves to the pattern "users.findAll"
  }
}
```

### AutoSend

Use it in your service to automatically send messages through a ClientProxy.

#### Example 1: findAll without payload

If the method doesn't require a payload, calling it without any arguments will send an empty object (or default payload):

```ts
import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AutoSend } from "nestjs-microservice-auto-decorators";

@Injectable()
export class UsersService {
  // Optional: explicitly define the service name.
  public serviceName = "users";

  constructor(
    @Inject("USERS_CLIENT") private readonly userClient: ClientProxy
  ) {}

  @AutoSend({ clientProperty: "userClient" })
  findAll() {
    // If called as findAll(), it sends {} with the pattern "users.findAll"
  }
}
```

#### Example 2: findOne with payload

For methods that need to send data, passing a primitive value (like an ID) will be wrapped in an object automatically:

```ts
import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AutoSend } from "nestjs-microservice-auto-decorators";

@Injectable()
export class UsersService {
  public serviceName = "users";

  constructor(
    @Inject("USERS_CLIENT") private readonly userClient: ClientProxy
  ) {}

  @AutoSend({ clientProperty: "userClient" })
  findOne(id: string) {
    // If called as findOne('123'), it sends { id: '123' } with the pattern "users.findOne"
  }
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/yourusername/nestjs-microservice-auto-decorators).

## License

This project is licensed under the MIT License.

---

By following these examples, developers can easily integrate `AutoMessagePattern` and `AutoSend` into their NestJS microservices to streamline message pattern generation and message sending.
