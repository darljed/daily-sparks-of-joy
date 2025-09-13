'use client';
import { useEffect, useState } from "react";
import ContentCard from "@/components/motivations/ContentCard";
import { ArrowLeftCircle, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SparksPage({ params }) {
    const [ content, setContent] = useState(null);
    const [ isLoading, setIsLoading] = useState(true);
    const [ error, setError] = useState(null);
    const [ id, setId] = useState(null);
    
    useEffect(()=> {
        const getParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        getParams();
    }, [params]);
    
    useEffect(()=> {
        if (!id) return;
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/sparks/${id}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                console.log('Fetched data:', data);
                setContent(data?.data || null);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[id]);

    return (
        <>
         <Link href="/"  className="block ml-7 mt-4">
            <Button variant="outline" className="flex items-center gap-3 cursor-pointer">
                <ArrowLeftCircle /> Back to home
            </Button>
        </Link>
        <div className="text-center">
            {
                isLoading && <div className="flex flex-row gap-3 justify-center items-center"> <Loader2Icon className="animate-spin" /> Loading...</div>
            }
            {
                error && <div className="text-red-500">Error: {error.message}</div>
            }
            {
                (!error && !isLoading && !content) && <div>No content available.</div>
            }
        </div>
        {
            content && <div className="p-2 m-auto">
                <ContentCard content={content}/>
            </div>
        }
        </>
    )
}

export default SparksPage
