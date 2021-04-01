import { AzureFunction, Context } from "@azure/functions"
import imgT = require("image-thumbnail");

const blobTrigger: AzureFunction = async function (context: Context, myBlob: Buffer ): Promise<void> {
    const name:  string = context.bindingData.name;
    const elements: Array<String> = name.split("_")

    if (elements[0] != "thumb") {
        context.log(elements)
        context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
        context.log("Hey, i just got triggered by: ", context.bindingData.uri)
    
        const thumb: Buffer = await imgT(myBlob);
        context.bindings.outputBlob = thumb;
        context.log(thumb)

    } else {
        context.log("Break")
    }


};

export default blobTrigger;



