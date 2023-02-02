[![NPM][npm-shield]][npm-url]
[![Downloads][downloads-shield]][downloads-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="120">
  </a>
</p>

<div align="center">
  <h1 align="center">Nest Bull Monitor Module</h1>

  <p align="center">
    Bull Monitor module for Nest framework (node.js).
    <br />
    <a href="#usage"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/theZeuses/bull-monitor/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/theZeuses/bull-monitor/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This is a wrap around [@bull-monitor/express](https://github.com/s-r-x/bull-monitor/tree/main/packages/express#usage) for easy use with NestJs.
## Getting Started

### Prerequisites

This lib requires **NestJS ^9.0.0**, **@nestjs/bull ^0.6.2**.

### Installation

```sh
# with npm
npm install @thezeus/bull-monitor @nestjs/bull bull
npm install --save-dev @types/bull
```

## Usage

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { BullMonitorModule } from "@thezeus/bull-monitor";
import { bullConfig } from "@config/queue"

@Module({
  imports: [
    BullModule.forRoot({
      ...bullConfig
    }),
    BullMonitorModule.register({
      route: "q-monitor",
      config: {
        queues: [
          {
            name: "OTP_SENDER"
          },
          ...otherQueueConfig
        ],
        ...otherMonitorConfig
      }
    }),
    middleware: [MyCustomNestJsMiddleware]
  ]
})
export class AppModule {}
```
This will create a dashboard which will be available through **your_application_url/q-monitor**. For **bullConfig** and **otherQueueConfig** reference see [here](https://docs.nestjs.com/techniques/queues), and for otherMonitorConfig reference see [here](https://github.com/s-r-x/bull-monitor/tree/main/packages/express#usage). You can use the **middleware** option to setup your own authentication.
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [Bull Monitor](https://github.com/s-r-x/bull-monitor)
- [Official NestJs Documentation](https://docs.nestjs.com/techniques/queues)

[npm-shield]: https://img.shields.io/npm/v/@thezeus/bull-monitor/latest?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@thezeus/bull-monitor
[downloads-shield]: https://img.shields.io/npm/dm/@thezeus/bull-monitor?style=for-the-badge
[downloads-url]: https://www.npmjs.com/package/@thezeus/bull-monitor
[stars-shield]: https://img.shields.io/github/stars/theZeuses/bull-monitor?style=for-the-badge
[stars-url]: https://github.com/theZeuses/bull-monitor/stargazers
[issues-shield]: https://img.shields.io/github/issues/theZeuses/bull-monitor?style=for-the-badge
[issues-url]: https://github.com/theZeuses/bull-monitor/issues
[license-shield]: https://img.shields.io/npm/l/@liaoliaots/nestjs-redis?style=for-the-badge
[license-url]: https://github.com/liaoliaots/nestjs-redis/blob/main/LICENSE