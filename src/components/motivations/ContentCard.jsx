import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "lucide-react"

function ContentCard({ content }) {

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return (
        <div className="w-full mt-2 p-5">
            <Card  className="w-full">
                <CardHeader>
                    <CardTitle>✨ {content?.title || "Daily Motivation"}</CardTitle>
                    <CardDescription className="flex gap-2 items-center text-gray-400">
                        <Calendar size={15}/>
                        {currentDate}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-foreground">
                    {
                        <CardItem title='Bible Verse'
                        content={content?.bible_content || "No verse available."}
                        subtitle={content?.bible_verse || "No verse available."} />
                    }
                    {
                        <CardItem title='Explanation'
                        content={content?.explanation || "No explanation available."} />
                    }
                    {
                        <CardItem title='Action'
                        content={content?.action || "No action available."} />
                    }
                    {
                        <CardItem title='Prayer'
                        content={content?.prayer || "No prayer available."} />
                    }
                </CardContent>
                <CardFooter className="flex flex-col justify-end gap-2">
                </CardFooter>
            </Card>
        </div>
    )
}

function CardItem({ title, content, subtitle }) {
    return (
    <div className="my-2">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {
            subtitle && <p className="text-gray-500"><small>{subtitle}</small></p>
        }
        <p className="text-sm mb-4">{content}</p>
    </div>)
}

export default ContentCard