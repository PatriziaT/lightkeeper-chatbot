// import { MemoryStorage, BotFrameworkAdapter } from "botbuilder";
import { doTopic } from "botbuilder-topical";
//// import { ConsoleAdapter, MemoryStorage } from "botbuilder";
//// import { Topic, doTopic, consoleOnTurn, prettyConsole } from "botbuilder-topical";
// import { Root } from "./topics";

var Root = require('./topics').Root;

var MemoryStorage = require('botbuilder').MemoryStorage;
var BotFrameworkAdapter = require('botbuilder').BotFrameworkAdapter;

var Topic = require('botbuilder-topical').Topic;

Topic.init(new MemoryStorage());

// var adapter = new ConsoleAdapter()
//     .use(prettyConsole);

// consoleOnTurn(adapter, context => doTopic(Root, context));

// import * as restify from 'restify';
var restify = require('restify');

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3980, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

var adapter = new BotFrameworkAdapter({
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
