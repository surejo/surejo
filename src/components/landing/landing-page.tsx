/* eslint-disable react/no-unescaped-entities */
import { BackgroundLines } from "@/components/ui/background-lines";
import Main from "./main";

export function LandingBackground() {


    return (
        <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4 bg-gradient-to-b from-black to-neutral-900">
            
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

            <Main />

            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
        </BackgroundLines>
    );
}
