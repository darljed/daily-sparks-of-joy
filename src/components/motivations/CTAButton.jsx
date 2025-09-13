'use client';
import { Loader2Icon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useState } from "react";
function CTAButton() {
    const [ isLoading, setIsLoading ] = useState(false);


    async function handleGetMotivated () {
        try{
            setIsLoading(true);
            fetch ('/api/motivate')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data?.id){
                    window.location.href = `/sparks/${data.id}`;
                }
                setIsLoading(false);
            })
        }
        catch(error){
            console.error("Error fetching motivational quote:", error);
            setIsLoading(false);
        }

    }

    return (
        
        <Button disabled={isLoading} onClick={handleGetMotivated} variant="outline" 
        className={`cursor-pointer disabled:cursor-not-allowed border-gray-200 transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white`}>
            {
                !isLoading ? "Get Sparks" : <><Loader2Icon className="animate-spin" />Getting Sparks...</>
            }
        </Button>
    )
}

export default CTAButton
