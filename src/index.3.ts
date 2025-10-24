import { Stagehand } from "@browserbasehq/stagehand";
import { endpointURLString } from "@cloudflare/playwright";
import { WorkersAIClient } from "./workersAIClient";

const USER_INSTRUCTIONS = `
I'd like to order a peperoni pizza with extra cheese.
Please deliver it to Cloudflare Austin office.
Price should not be more than $20.
`

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.url.endsWith("/index.html")) {
			return env.ASSETS.fetch(request);
		}

		const stagehand = new Stagehand({
			env: "LOCAL",
			localBrowserLaunchOptions: { cdpUrl: endpointURLString(env.BROWSER) },
			llmClient: new WorkersAIClient(env.AI),
			verbose: 1,
		});

		await stagehand.init();
    	const agent = stagehand.agent();

		const result = await agent.execute(USER_INSTRUCTIONS);

		return new Response(result.message);
	},
} satisfies ExportedHandler<Env>;
