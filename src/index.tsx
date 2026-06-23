import { serve } from "bun";
import index from "./index.html";

const server = serve({
    routes: {
        "/*": index,
        "/api/countries": async () => {
            const apiKey = process.env.PUBLIC_API_KEY 
            const response = await fetch(
                'https://api.restcountries.com/countries/v5?limit=100',
                { headers: { 'Authorization': apiKey! } }
            )
            const json = await response.json()
            return Response.json(json.data.objects)
        },
    },

    development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);