import { MemoryStorage, BotFrameworkAdapter } from "botbuilder";
import { Topic, doTopic } from "botbuilder-topical";
//// import { ConsoleAdapter, MemoryStorage } from "botbuilder";
//// import { Topic, doTopic, consoleOnTurn, prettyConsole } from "botbuilder-topical";
import { Root } from "./topics";

Topic.init(new MemoryStorage());

// var adapter = new ConsoleAdapter()
//     .use(prettyConsole);

// consoleOnTurn(adapter, context => doTopic(Root, context));

// import * as restify from 'restify';
var restify = require('restify');
var builder = require('botbuilder');

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

// Create chat connector for communicating with the Bot Framework Service
// var connector = new builder.ChatConnector({
//     appId: process.env.MicrosoftAppId,
//     appPassword: process.env.MicrosoftAppPassword
// });

// Listen for messages from users
// server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// var bot = new builder.UniversalBot(connector, function (session: any) {
//     session.send("You said: %s", session.message.text);
// });