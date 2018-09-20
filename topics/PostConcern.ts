// import { Topic } from "botbuilder-topical";
// import fetch from "node-fetch";

let Topic = require('botbuilder-topical').Topic;

export class PostConcern extends Topic {
    async onStart(result:string[]){
        let results = result.join(' ');
        let dataString = '';

        // let spawn = require('child_process').spawn;
        // let py = spawn('python', ['model_utils.py']);

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