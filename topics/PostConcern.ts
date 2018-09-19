import { Topic } from "botbuilder-topical";
import fetch from "node-fetch";

export class PostConcern extends Topic {
    async onStart(result:string[]){
        const results = result.join(' ');
        let dataString = '';

        // const spawn = require('child_process').spawn;
        // const py = spawn('python', ['model_utils.py']);

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