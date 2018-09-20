import { MemoryStorage, BotFrameworkAdapter } from "botbuilder";
import { Topic, doTopic } from "botbuilder-topical";
// import { ConsoleAdapter, MemoryStorage } from "botbuilder";
// import { Topic, doTopic, consoleOnTurn, prettyConsole } from "botbuilder-topical";
import { Root } from "./topics";

Topic.init(new MemoryStorage());

// const adapter = new ConsoleAdapter()
//     .use(prettyConsole);

// consoleOnTurn(adapter, context => doTopic(Root, context));

import * as restify from 'restify';

let server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3980, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', async (req, res) => {
    adapter.processActivity(req, res, async ctx => {
        // if (ctx.activity.type === 'message') {
            // await ctx.sendActivity(ctx.activity.text);
            await doTopic(Root, ctx)
        // }
    });
});

//This is a comment
