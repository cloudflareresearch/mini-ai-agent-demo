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

		const out = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8", {
			prompt: USER_INSTRUCTIONS,
		});

		return new Response(out.response);
	},
} satisfies ExportedHandler<Env>;
