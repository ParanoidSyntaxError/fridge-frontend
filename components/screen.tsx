"use client";

import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AlignJustify, ChevronLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import CalendarHighlights from "./calendar-highlights";

export function Screen({
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const [tab, setTab] = useState<string>("home");

    const [time, setTime] = useState<string>("");
    const [hour12, setHour12] = useState<string>("");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString([], {
            minute: "numeric",
            hour: "numeric",
        }).replace(/AM|PM/, ''));
        setHour12(new Date().toLocaleTimeString().includes("AM") ? "AM" : "PM");
    });

    return (
        <div
            {...props}
            className={cn(
                "bg-[#0f0f0f] w-full max-w-[42rem] h-fit px-12 pt-20 pb-40 rounded-3xl border-[#121212] border-2 mx-auto",
                props.className
            )}
        >
            <div
                className="bg-[#EBE2D9] w-full border-[#121212] border-2"
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
                            className="flex flex-wrap gap-4"
                        >
                            <div
                                className="bg-white w-48 h-16 drop-shadow flex justify-center items-center"
                            >
                                <div
                                    className="flex flex-row items-end"
                                >
                                    <div
                                        className="text-4xl"
                                    >
                                        {time}
                                    </div>
                                    <div
                                        className="text-base"
                                    >
                                        {hour12}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="bg-white w-fit h-fit drop-shadow"
                            >
                                <CalendarHighlights/>
                            </div>
                            <div
                                className="bg-white drop-shadow"
                            >
                                <ScrollArea
                                    className="text-left p-2"
                                >
                                    <div
                                        className="px-3 py-2 text-xl"
                                    >
                                        Shortcuts
                                    </div>
                                    <div
                                        className="flex flex-col space-y-1"
                                    >
                                        <Link
                                            href=""
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full h-full justify-start py-2"
                                            >
                                                <Image
                                                    src="telegram-logo.svg"
                                                    alt=""
                                                    width={32}
                                                    height={32}
                                                    className="bg-[#24A1DE] p-1 rounded-full"
                                                />
                                                <div className="text-lg">
                                                    Telegram
                                                </div>
                                            </Button>
                                        </Link>
                                        <Link
                                            href=""
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full h-full justify-start py-2"
                                            >
                                                <Image
                                                    src="dex-screener-logo.svg"
                                                    alt=""
                                                    width={32}
                                                    height={32}
                                                    className="bg-black p-1 rounded-full"
                                                />
                                                <div className="text-lg">
                                                    DEX Screener
                                                </div>
                                            </Button>
                                        </Link>
                                        <Link
                                            href=""
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full h-full justify-start py-2"
                                            >
                                                <Image
                                                    src="x-logo.svg"
                                                    alt=""
                                                    width={32}
                                                    height={32}
                                                    className="bg-black p-1 rounded-full"
                                                />
                                                <div className="text-lg">
                                                    Twitter
                                                </div>
                                            </Button>
                                        </Link>
                                    </div>
                                </ScrollArea>
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