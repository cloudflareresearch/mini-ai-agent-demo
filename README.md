# mini-ai-agent

![GitHub License](https://img.shields.io/github/license/cloudflareresearch/mini-ai-agent-demo)

Repository presenting demonstration of an ai agent on Cloufdflare workers, from responding to a prompt at the edge to orchestrating a remote browser to make web requests.

These demonstrations are detailed and explained on the [Cloudflare Research blog](https://blog.cloudflare.com/anonymous-credentials-agents).

## Tables of Content

- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Deploy](#deploy)
- [Security Considerations](#security-considerations)
- [License](#license)

## Usage

### Prerequisites

- [Node.js 22](https://nodejs.org/en/download)
- [Cloudflare Workers account](https://workers.cloudflare.com/)

### Deploy

First, replace all occurences of `cloudflareresearch.com` in the configuration files with your own domain.

Then, you can deploy all versions of the agents, numbered from 0 to 3 with the following command

```shell
npm run deploy:2
```

This will deploy the service on your domain.

## Security Considerations

This software has not been audited. Please use at your sole discretion.

## License

This project is under the Apache 2.0 license.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you shall be Apache 2.0 licensed as above, without any additional terms or conditions.