/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect } from "react"
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";

import { BackgroundLines } from "@/components/ui/background-lines"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import axios from "axios";

export function WaitlistPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        category: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post('/api/waitlist', formData);
            if(response.status !== 201) {
                throw new Error("An error occurred. Please try again.");
            }
            console.log(response.data);
            setSubmitted(true);
        } catch (error: any) {
            console.error(error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: any) => (e: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
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
                        <div className={`w-px h-12 rotate-${Math.floor(Math.random() * 360)} opacity-20 bg-gradient-to-b ${i % 4 === 0 ? 'from-blue-500' :
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
                        <ArrowLeft className="mr-2 h-4 w-4 animate-out" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            {/* Main content */}
            <div className={`transform transition-all duration-1000 w-full max-w-md px-4 py-8 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                                    value={formData.name}
                                    onChange={handleInputChange("name")}
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
                                    value={formData.email}
                                    onChange={handleInputChange("email")}
                                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="category">
                                    What are you interested in?
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange('category')({ target: { value } })}
                                >
                                    <SelectTrigger className="w-full bg-white/10 border-white/20" id="category">
                                        <SelectValue placeholder="Select Category" className="text-neutral-500"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DESIGN">Design</SelectItem>
                                        <SelectItem value="DEVELOPMENT">Development</SelectItem>
                                        <SelectItem value="WRITING">Writing</SelectItem>
                                        <SelectItem value="EDITING">Editing</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label>
                                    Who are you?
                                </Label>
                                <RadioGroup
                                    value={formData.role}
                                    onValueChange={(value) => handleInputChange('role')({ target: { value } })}
                                >
                                    <div className="flex justify-around items-center">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="FREELANCER" id="r1" />
                                            <Label htmlFor="r1">Freelancer</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CLIENT" id="r2" />
                                            <Label htmlFor="r2">Client</Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full rounded-full group relative overflow-hidden transition-colors duration-300"
                                disabled={loading || !formData.email || !formData.role || !formData.category}
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

            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
        </BackgroundLines>
    );
}