"use client";

import { CandlestickData, createChart, Time } from 'lightweight-charts';
import Image from 'next/image';
import { unescape } from 'querystring';
import React, { useEffect, useRef, useState } from 'react';

export function Chart({
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData<Time>[] | undefined>();

    useEffect(
        () => {
            if (!chartContainerRef?.current) {
                return;
            }

            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current?.clientWidth,
                    height: chartContainerRef.current?.clientHeight,
                });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {
                        color: '#181b27'
                    },
                    textColor: '#AAA',
                },
                grid: {
                    vertLines: { color: '#292929' },
                    horzLines: { color: '#292929' },
                },
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                crosshair: {
                    mode: 0
                },
                timeScale: {
                    timeVisible: true
                },
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                priceFormat: {
                    type: "volume"
                }
            });

            const fetchCandlestickData = async () => {
                try {
                    const res = await fetch("https://api.geckoterminal.com/api/v2/networks/solana/pools/8KUwPa5SNz7XX5dmbforNfzALUhPbouCCbX6VmfeqxBh/ohlcv/minute?aggregate=5&limit=1000", {
                        method: "GET",
                    });
                    const data = await res.json();
                    const ohlcv = data.data.attributes.ohlcv_list;
                    const parsed: CandlestickData<Time>[] = ohlcv.map((v: number[]) => {
                        /*
                            https://www.geckoterminal.com/dex-api
                            Each array contains unix timestamp, open, high, low, close and volume in USD.
                        */
                        return {
                            time: v[0],
                            open: v[1] * (10 ** 9),
                            high: v[2] * (10 ** 9),
                            low: v[3] * (10 ** 9),
                            close: v[4] * (10 ** 9),
                        };
                    });

                    parsed.reverse();

                    console.log(parsed)
                    setCandlestickData(parsed);
                } catch (error) {
                    console.log(error);
                }
            };
            if (!candlestickData) {
                fetchCandlestickData();
            }

            if (candlestickData) {
                candlestickSeries.setData(candlestickData);
            }

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        }
    );

    return (
        <div
            {...props}
        >
            <div
                className="absolute z-10 p-2 flex flex-row items-center space-x-1"
            >
                <div
                    className='relative w-6 h-6 rounded-full overflow-hidden'
                >
                    <Image
                        src="/fridge-logo.png"
                        alt=""
                        fill
                    />
                </div>
                <div
                    className='text-[#b2b5be]'
                >
                    {"FRIDGE / USD (Market Cap) - 5m"}
                </div>
            </div>
            <div
                ref={chartContainerRef}
                className="w-full h-full"
            />
        </div>
    );
}