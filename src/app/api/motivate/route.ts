import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextResponse } from "next/server";
import { systemPrompt } from "../../../prompts/system";
import { createClient } from "@/lib/supabaseClient";

export async function GET() {
    const modelId = process.env.AWS_BEDROCK_MODEL_ID!;
    const client = new BedrockRuntimeClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    const userMessage = "Provide me with a motivational message based on a bible verse.";
    const conversation = [
        {
            role: 'user',
            content: [{
                type: 'text',
                text: systemPrompt
            }]
        },
        {
            role: "user",
            content: [{ type: "text", text: userMessage }],
        },
    ];
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
            ...conversation
        ],
    };

    let sparkId: number | null = null;
    
    try{
        // Invoke Claude with the payload and wait for the response.
        const command = new InvokeModelCommand({
            contentType: "application/json",
            body: JSON.stringify(payload),
            modelId,
        });
        const apiResponse = await client.send(command);
        // Decode and return the response(s)
        
        const responseBody = JSON.parse(new TextDecoder().decode(apiResponse.body));
        const text = responseBody.content[0].text;
        console.log("Model response:", text);

        // Parse the response to JSON
        const textObj = JSON.parse(text);
        
        // Save to Supabase
        const supabase = createClient();
        const { error, data } = await supabase
            .from('sparks')
            .insert({ 
                title: textObj?.title || 'N/A',
                bible_verse: textObj?.bible_verse || 'N/A',
                bible_content: textObj?.bible_content || 'N/A',
                explanation: textObj?.explanation || 'N/A',
                action: textObj?.action || 'N/A',
                prayer: textObj?.prayer || 'N/A'
             })
             .select();
        
        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error?.message);
        }

        if(data && data[0]){
            sparkId = data[0].id;
        }
        
    }
    catch(error){
        console.error("Error invoking model:", error);
        return NextResponse.json({ error: "An error occurred while creating the response." });
    }
    
    if(sparkId){
        return NextResponse.json({ message: "Data created", id: sparkId });
    }
    
    return NextResponse.json({ error: "No data created" });
}