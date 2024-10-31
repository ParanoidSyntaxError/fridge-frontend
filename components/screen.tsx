"use client";

import { Chart } from "@/components/chart";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AlignJustify, ChevronLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ScreenProps extends React.HTMLAttributes<HTMLElement> {

}

export function Screen({
    ...props
}: ScreenProps) {
    const [tab, setTab] = useState<string>("home");

    return (
        <div
            {...props}
            className={cn(
                "bg-[#0f0f0f] w-full max-w-[42rem] h-fit px-12 pt-20 pb-40 rounded-3xl border-[#121212] border-2 mx-auto",
                props.className
            )}
        >
            <div
                className="bg-white w-full border-[#121212] border-2"
            >
                <Tabs
                    defaultValue={tab}
                    value={tab}
                    className="w-full h-[58rem]"
                >
                    <TabsContent
                        value="home"
                        className="w-full h-full p-8"
                    >
                        <div
                            className="pb-12"
                        >
                            <div
                                className="relative w-36 h-16 mx-auto"
                            >
                                <Image
                                    src="/fridge-google.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <SearchBar />
                        </div>
                        <div>
                            <div
                                className="grid justify-left gap-x-12 gap-y-12 w-full text-center p-8"
                                style={{
                                    gridTemplateColumns: "repeat(auto-fit, 6rem)",
                                }}
                            >
                                <div
                                    className="flex flex-col w-24"
                                >
                                    <Button
                                        className="bg-black relative w-24 h-24 rounded-2xl overflow-hidden"
                                        onClick={() => setTab("chart")}
                                    >
                                        <Image
                                            src="/fridge-logo.png"
                                            alt=""
                                            fill
                                        />
                                    </Button>
                                    <Label
                                        className="text-lg leading-5 pt-1"
                                    >
                                        $FRIDGE Chart
                                    </Label>
                                </div>
                                <div
                                    className="flex flex-col w-24"
                                >
                                    <Link
                                        href="https://dexscreener.com/solana/8kuwpa5snz7xx5dmbfornfzaluhpbouccbx6vmfeqxbh"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Button
                                            className="bg-[#24A1DE] relative w-24 h-24 rounded-2xl"
                                        >
                                            <Image
                                                src="/telegram-logo.svg"
                                                alt=""
                                                fill
                                                className="p-0"
                                            />
                                        </Button>
                                    </Link>
                                    <Label
                                        className="text-lg leading-5 pt-1"
                                    >
                                        Telegram
                                    </Label>
                                </div>
                                <div
                                    className="flex flex-col w-24"
                                >
                                    <Link
                                        href="https://dexscreener.com/solana/8kuwpa5snz7xx5dmbfornfzaluhpbouccbx6vmfeqxbh"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Button
                                            className="bg-black relative w-24 h-24 rounded-2xl"
                                        >
                                            <Image
                                                src="/dex-screener-logo.svg"
                                                alt=""
                                                fill
                                                className="p-4"
                                            />
                                        </Button>
                                    </Link>
                                    <Label
                                        className="text-lg leading-5 pt-1"
                                    >
                                        DEX Screener
                                    </Label>
                                </div>
                                <div
                                    className="flex flex-col w-24"
                                >
                                    <Link
                                        href="https://x.com/FRIDGE1661142"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Button
                                            className="bg-black relative w-24 h-24 rounded-2xl"
                                        >
                                            <Image
                                                src="/x-logo.svg"
                                                alt=""
                                                fill
                                                className="p-4"
                                            />
                                        </Button>
                                    </Link>
                                    <Label
                                        className="text-lg leading-5 pt-1"
                                    >
                                        X
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="chart"
                        className="w-full h-full"
                    >
                        <Chart
                            className="w-full h-full"
                        />
                    </TabsContent>
                </Tabs>
                <div
                    className="w-full h-[4rem] flex flex-row items-center justify-center"
                >
                    <Button
                        variant="ghost"
                        onClick={() => setTab("home")}
                        className="rounded-full mx-auto"
                        size="icon"
                        asChild
                    >
                        <ChevronLeft
                            color="grey"
                            className="w-[3rem] h-[3rem] p-1"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setTab("home")}
                        className="rounded-full mx-auto"
                        size="icon"
                        asChild
                    >
                        <Home
                            color="grey"
                            className="w-[3rem] h-[3rem] overflow-visible p-2"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        className="rounded-full mx-auto"
                        size="icon"
                        asChild
                    >
                        <AlignJustify
                            color="grey"
                            className="w-[3rem] h-[3rem] p-2"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}