// import { Topic } from "botbuilder-topical";
// import fetch from "node-fetch";

var Topic = require('botbuilder-topical').Topic;

export class PostConcern extends Topic {
    async onStart(result:string[]){
        var results = result.join(' ');
        var dataString = '';

        // var spawn = require('child_process').spawn;
        // var py = spawn('python', ['model_utils.py']);

        // py.stdout.on('data', (data: any) => {
        //     dataString += data.toString();
        // })
        // py.stdout.on('end', () => {
        //     console.log(dataString);
        // })

        // py.stdin.write(results);
        // py.stdin.end();

        console.log(results);
        console.log("DONE");

        return this.end();
    }
}

PostConcern.register();