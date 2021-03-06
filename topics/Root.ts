import { Topic } from "botbuilder-topical";
import { RecordConcern } from ".";

export class Root extends Topic {

    async onStart() {
        await this.send("Hi, I'm Lightkeeper, and I'm here to help you help a child. Would you like to profile a student? Yes/No");

    }

    async onDispatch() {


        /**if (!this.text || this.context.activity.text === "No"){
            return;
        }**/
        if (await this.dispatchToChild())
            return;
        if (this.text){
            if (this.text === "Yes"){

                await this.startChild(RecordConcern);
            } else {
                await this.send("Thank you!");
            }
        }





       /**var input: string = `${this.text}`;
        if (await this.dispatchToChild()) {
            return;
        } else if (this.endBehaviorEntry(input) == true) {
            await this.send("It looks like you are done adding traits for this student -- thanks!");
        } else {
            this.send(`You entered ${input}`);
            if (this.findBehaviors(input) == true) {
                this.send("Great! I'm adding this behavior to your list.");
                await this.startChild(RecordConcern);
            } else {
                this.send("That behavior isn't part of our standard set of problematic behaviors, but I will add it to the list.");
                await this.startChild(RecordConcern);
            }
        }
        **/

    }


    async onChildEnd(){
        await this.send("Thank you");
        this.end();
        // needed to prevent events from triggering user-targeted output.
        /*if (this.context.activity.type !== 'message') {
            return;
        } else {
            if (this.context.activity.text === "yes"){
                await this.startChild(RecordConcern);
            } else if (this.context.activity.text === "no") {
                this.send("Great! there are a few other things I can help you with.");
                await this.startChild(Help);
            }
            await this.dispatchToChild;
        }*/
    }

    /*
    async onChildEnd(child: Topic) {
        if (child instanceof Help) {
            this.onStart();
        } else if (child instanceof RecordConcern) {
            await this.startChild(Insights);
        } else {
            this.onStart();
        }
    }
    */



    /* async onChildEnd() {
        await this.send(`Please add another concern, or var me know if you are finished.`);
    } */

}

Root.register();
