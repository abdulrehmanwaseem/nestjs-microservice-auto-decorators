# NestJS Microservice Auto Decorators

<p align="center">
  <img src="https://img.shields.io/npm/v/nestjs-microservice-auto-decorators.svg" alt="NPM Version" />
  <img src="https://img.shields.io/npm/l/nestjs-microservice-auto-decorators.svg" alt="Package License" />
  <img src="https://img.shields.io/npm/dm/nestjs-microservice-auto-decorators.svg" alt="NPM Downloads" />
</p>
![image](https://github.com/user-attachments/assets/599de5b0-78d0-4a86-89f1-0633e891e5a4)


<p align="center">
  Streamlining NestJS microservices communication with powerful automatic decorators: <b>AutoMessagePattern</b> and <b>AutoSend</b>.
</p>

---

## Overview

**nestjs-microservice-auto-decorators** eliminates boilerplate code in NestJS microservice applications by providing intelligent decorators that automatically generate message patterns and handle message sending operations. This package improves developer productivity, reduces errors, and enforces consistent communication patterns across distributed systems.

---

## Features

- 🔄 **AutoMessagePattern:** Automatically generates a message pattern based on the controller's metadata or class name and the decorated method name.
- 📨 **AutoSend:** Automatically constructs the message pattern for client methods and sends payloads via a `ClientProxy`.
- 🚀 **Zero Configuration:** Works out-of-the-box with sensible defaults.
- 🔍 **Type Safety:** Fully typed with TypeScript, ensuring robust development.
- 📊 **Performance Optimized:** Minimal overhead with maximum convenience.

---

## Installation

Install using your preferred package manager:

```bash
# NPM
npm install nestjs-microservice-auto-decorators

# Yarn
yarn add nestjs-microservice-auto-decorators

# PNPM
pnpm add nestjs-microservice-auto-decorators
```

---

## Quick Start

After installation, integrate the decorators into your NestJS microservices:

1. **Import the Decorators:**

   ```ts
   import {
     AutoMessagePattern,
     AutoSend,
   } from "nestjs-microservice-auto-decorators";
   ```

2. **Apply `AutoMessagePattern` to your controller methods to automatically generate message patterns.**

3. **Use `AutoSend` in your services to dynamically send messages through a ClientProxy.**

---

## Usage Examples

### Using AutoMessagePattern

The `AutoMessagePattern` decorator automatically derives the message pattern from your controller’s metadata or class name.

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

### Using AutoSend

The `AutoSend` decorator simplifies sending messages by auto-generating the message pattern and handling payload wrapping.

#### Example 1: findAll Without Payload

If the method does not require a payload, calling it without arguments sends an empty object.

```ts
import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AutoSend } from "nestjs-microservice-auto-decorators";

@Injectable()
export class UsersService {
  // Optionally, set the service name explicitly.
  public serviceName = "users";

  constructor(
    @Inject("USERS_CLIENT") private readonly userClient: ClientProxy
  ) {}

  @AutoSend({ clientProperty: "userClient" })
  findAll() {
    // When invoked as findAll(), it sends {} using the message pattern "users.findAll"
  }
}
```

#### Example 2: findOne With Payload

For methods that require a payload, passing a primitive value (like an ID) will automatically be wrapped in an object.

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
    // When called as findOne('123'), it sends { id: '123' } using the pattern "users.findOne"
  }
}
```

---

## API Reference

### AutoMessagePattern

- **Usage:** Apply to controller methods to automatically generate a message pattern.
- **How It Works:**
  - Uses the controller's metadata (`@Controller('xxx')`) or the class name (stripping "Controller")
  - Combines it with the method name (e.g., `findAll`) to produce a pattern like `users.findAll`

### AutoSend

- **Usage:** Decorate service methods to auto-generate a message pattern and send payloads via a designated `ClientProxy`.
- **Configuration Option:**
  - `clientProperty`: The property name where the `ClientProxy` instance is stored.
- **Payload Handling:**
  - If the first argument is not an object, it is wrapped as `{ id: value }`
- **Example:**
  - For a service named `users` and method `findOne`, calling `findOne('123')` sends a message with pattern `users.findOne` and payload `{ id: '123' }`.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

- **Reporting Issues:**  
  Open issues for bug reports or feature requests on [GitHub Issues](https://github.com/abdulrehmanwaseem/nestjs-microservice-auto-decorators/issues).
- **Pull Requests:**  
  Fork the repository, commit your changes with clear messages, and open a pull request. Include tests and update documentation where applicable.
- **Code Style:**  
  Adhere to TypeScript best practices and maintain consistency with existing code.

---

## Changelog

Keep track of changes with a detailed changelog. Consider using tools like [standard-version](https://github.com/conventional-changelog/standard-version) for automated changelog generation.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For further details, examples, and updates, please visit our [GitHub repository](https://github.com/abdulrehmanwaseem/nestjs-microservice-auto-decorators).

Built with ❤️ for the NestJS community.
