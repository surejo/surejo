/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from "react"
import { BackgroundLines } from "@/components/ui/background-lines"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function WaitlistPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4 bg-gradient-to-b from-black to-neutral-900">
            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    >
                        <div className={`w-px h-12 rotate-${Math.floor(Math.random() * 360)} opacity-20 bg-gradient-to-b ${
                            i % 4 === 0 ? 'from-blue-500' :
                            i % 4 === 1 ? 'from-purple-500' :
                            i % 4 === 2 ? 'from-green-500' :
                            'from-red-500'
                        } to-transparent`} />
                    </div>
                ))}
            </div>

            {/* Back button */}
            <div className="absolute top-8 left-8">
                <Link href="/">
                    <Button variant="ghost" className="text-neutral-400 hover:text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            {/* Main content */}
            <div className="w-full max-w-md px-4 py-8">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-600 text-3xl md:text-4xl font-sans mb-6 relative z-20 font-bold tracking-tight">
                    Join the Waitlist
                </h2>

                {!submitted ? (
                    <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-1">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                            <Button 
                                type="submit"
                                className="w-full rounded-full group relative overflow-hidden transition-colors duration-300"
                                disabled={loading}
                            >
                                <span className="flex items-center justify-center relative z-10">
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-400 border-t-white" />
                                    ) : (
                                        <>
                                            Join Now
                                            <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </>
                                    )}
                                </span>
                                <span className="absolute inset-0 w-full h-full bg-black/10 scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 ease-out" />
                            </Button>
                        </form>
                    </Card>
                ) : (
                    <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-semibold text-white">Thank You!</h3>
                            <p className="text-neutral-400">
                                You're on the list! We'll notify you when we launch.
                            </p>
                            <Link href="/">
                                <Button variant="ghost" className="text-neutral-400 hover:text-white">
                                    Return to Home
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </div>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
        </BackgroundLines>
    );
}