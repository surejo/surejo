/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Main() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-600 text-4xl md:text-6xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Surejo
            </h2>

            <p className="max-w-xl mx-auto text-lg md:text-xl text-neutral-400 text-center mb-8">
                From Side Hustle to Main Hustle—We've Got You Covered.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                    {
                        icon: <Sparkles className="text-blue-500" size={24} />,
                        title: "Streamlined Growth",
                        description: "Optimize your business potential"
                    },
                    {
                        icon: <TrendingUp className="text-green-500" size={24} />,
                        title: "Track Progress",
                        description: "Monitor your success in real-time"
                    },
                    {
                        icon: <Shield className="text-purple-500" size={24} />,
                        title: "Secure Platform",
                        description: "Your data, protected always"
                    }
                ].map((feature, index) => (
                    <div
                        key={index}
                        className={`transform transition-all duration-1000 delay-${index + 1}00 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            } p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center`}
                    >
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-neutral-400">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center relative z-50 my-10 cursor-pointer">
                <Link href="/waitlist">
                    <Button className="rounded-full group relative overflow-hidden">
                        <span className="flex items-center relative z-10">
                            Join the waitlist
                            <ArrowRight
                                size={24}
                                className="ml-2 transition-transform duration-300 group-hover:rotate-[-30deg] group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </span>
                        <span className="absolute inset-0 w-full h-full bg-black/10 scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 ease-out" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}