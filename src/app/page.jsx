"use client";
import HeaderTitle from "../components/HeaderTitle";
import CTAButton from "../components/motivations/CTAButton";
import ThemeToggle from "../components/ThemeToggle";

function Home() {

    return (
        <main className="h-screen flex flex-col items-center p-4 justify-center bg-background text-foreground">
            <div className="max-w-2xl pb-30 mb-20 mt-20 m-auto">
                <HeaderTitle>Daily Sparks of Joy</HeaderTitle>
                <div className="flex justify-center my-6">
                    <CTAButton/>
                </div>
            </div>
        </main>
    )
}

export default Home;
