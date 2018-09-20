// import { MemoryStorage, BotFrameworkAdapter } from "botbuilder";
// import { Topic, doTopic } from "botbuilder-topical";
//// import { ConsoleAdapter, MemoryStorage } from "botbuilder";
//// import { Topic, doTopic, consoleOnTurn, prettyConsole } from "botbuilder-topical";
// import { Root } from "./topics";

let Root = require('./topics').Root;

let MemoryStorage = require('botbuilder').MemoryStorage;
let BotFrameworkAdapter = require('botbuilder').BotFrameworkAdapter;

let Topic = require('botbuilder-topical').Topic;
let doTopic = require('botbuilder-topical').doTopic;

Topic.init(new MemoryStorage());

// let adapter = new ConsoleAdapter()
//     .use(prettyConsole);

// consoleOnTurn(adapter, context => doTopic(Root, context));

// import * as restify from 'restify';
let restify = require('restify');

let server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3980, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

let adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', async (req: any, res: any) => {
    adapter.processActivity(req, res, async (context: any) => {
        // if (ctx.activity.type === 'message') {
            // await ctx.sendActivity(ctx.activity.text);
            await doTopic(Root, context)
        // }
    });
});

//This is a comment
