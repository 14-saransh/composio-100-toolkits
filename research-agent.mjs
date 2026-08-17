/** Re-runnable research pipeline. Requires Node 20+ and OPENAI_API_KEY.
 * Input: seeds.json [{name, website, category}]
 * Output: research.json with claim-level evidence and confidence.
 */
import fs from "node:fs/promises";
import OpenAI from "openai";
const client=new OpenAI();
const seeds=JSON.parse(await fs.readFile("seeds.json","utf8"));
const schema={type:"object",properties:{name:{type:"string"},category:{type:"string"},description:{type:"string"},auth:{type:"array",items:{type:"string"}},access:{enum:["self-serve","friction","gated","unknown"]},api_surface:{type:"string"},mcp:{type:"string"},verdict:{enum:["build-now","build-with-friction","outreach-first"]},blocker:{type:"string"},confidence:{type:"number"},evidence:{type:"array",items:{type:"object",properties:{claim:{type:"string"},url:{type:"string"}},required:["claim","url"],additionalProperties:false}}},required:["name","category","description","auth","access","api_surface","mcp","verdict","blocker","confidence","evidence"],additionalProperties:false};
async function research(seed){const r=await client.responses.create({model:"gpt-5-mini",tools:[{type:"web_search"}],input:`Research ${seed.name} (${seed.website}) for an agent integration. Prefer official docs. Separate sandbox/test access from production. Find auth, whether credentials are self-serve, API breadth, official MCP only, blocker, and evidence per claim. Category: ${seed.category}.`,text:{format:{type:"json_schema",name:"app_research",strict:true,schema}}});return JSON.parse(r.output_text)}
const out=[];for(let i=0;i<seeds.length;i+=5){const batch=await Promise.all(seeds.slice(i,i+5).map(research));out.push(...batch);await fs.writeFile("research.json",JSON.stringify(out,null,2));console.log(`${out.length}/${seeds.length}`)}
// Challenge pass: review confidence < .8, missing official evidence, all gated rows,
// and a stratified random sample. Human adjudication remains required before publish.

