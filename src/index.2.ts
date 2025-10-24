import { Stagehand } from "@browserbasehq/stagehand";
import { endpointURLString } from "@cloudflare/playwright";
import { WorkersAIClient } from "./workersAIClient";

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
		const page = stagehand.page;

		await page.goto("https://mini-ai-agent.cloudflareresearch.com/index.html");

		if (request.url.endsWith("/image")) {
			const screenshot = await page.screenshot();
			return new Response(screenshot, {
				headers: { "Content-Type": "image/png" },
			});
		}

		const { extraction } = await page.extract(
			"what are the pizza available on the menu?"
		);
		return new Response(extraction);
	},
} satisfies ExportedHandler<Env>;
