// import { Topic, ListStyle } from "botbuilder-topical";
// import {PostConcern} from ".";

let Topic = require('botbuilder-topical').Topic;
let ListStyle = require('botbuilder-topical').ListStyle;
let PostConcern = require('.').PostConcern;



class Child extends Topic<any, ConcernSet> {

    resultBehaviors:string[] = [];
    async onStart(resultBehaviors:string[]) {
        await this.send("Are you done adding the concerns?Yes/No");
        this.resultBehaviors = resultBehaviors;
        console.log(this.resultBehaviors);
        await this.next();


    }

    async next(){
            console.log("Testing");
            if (this.context.activity.text === "Yes"){
                console.log("Right");
                await this.startChild(PostConcern, this.resultBehaviors);

            } else if (this.text === "No"){
                return;
            }

    }
    async onChildEnd(){
        return this.end();
    }
}
Child.register();
interface ConcernState {
    concerns : string[];
}
interface ConcernSet {
    recordConcerns : string[];
}
export class RecordConcern extends Topic<any, ConcernState> {
    resultBehaviors:string[] = [];
    async onStart(){
        await this.next();
        this.state.concerns = [];

    }
    async next() {

        await this.send("Please add all your concerns below, each separated by a comma.");


    }

    async onStartChild(){
        await this.startChild(Child, this.state.concerns);
    }

    async onDispatch() {
        if (this.text && this.text !== "Yes" && this.text !== "No"){
            let concerns = this.text.split(',');
            concerns.forEach( (concern: any) => {
                this.state.concerns.push(concern as string);
            })
            console.log(this.state);
            await this.startChild(Child, this.state.concerns);
        } else if (this.text === "Yes"){
            await this.startChild(Child, this.state.concerns);
        } else if (this.text === "No"){
            await this.next();
        }
    }

    async onChildEnd(){

        console.log(this.state.concerns);
        return this.end();

    }

}

RecordConcern.register();


var behaviors = ["bully", "bullying", "violent", "violence", "abuse", "sad", "depressed", "bad grades", "undereating"];
var doneWithBehaviorEntry = ["done", "finished", "move on", "stop", "end"];
