"use client";

import { FC, useEffect, useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-09-01", desktop: 222 },
  { date: "2024-09-02", desktop: 97 },
  { date: "2024-09-03", desktop: 167 },
  { date: "2024-09-04", desktop: 242 },
  { date: "2024-09-05", desktop: 373 },
  { date: "2024-09-06", desktop: 301 },
  { date: "2024-09-07", desktop: 245 },
  { date: "2024-09-08", desktop: 409 },
  { date: "2024-09-09", desktop: 59 },
  { date: "2024-09-10", desktop: 261 },
  { date: "2024-09-11", desktop: 327 },
  { date: "2024-09-12", desktop: 292 },
  { date: "2024-09-13", desktop: 342 },
  { date: "2024-09-14", desktop: 137 },
  { date: "2024-09-15", desktop: 120 },
  { date: "2024-09-16", desktop: 138 },
  { date: "2024-09-17", desktop: 446 },
  { date: "2024-09-18", desktop: 364 },
  { date: "2024-09-19", desktop: 243 },
  { date: "2024-09-20", desktop: 89 },
  { date: "2024-09-21", desktop: 137 },
  { date: "2024-09-22", desktop: 224 },
  { date: "2024-09-23", desktop: 138 },
  { date: "2024-09-24", desktop: 387 },
  { date: "2024-09-25", desktop: 215 },
  { date: "2024-09-26", desktop: 75 },
  { date: "2024-09-27", desktop: 383 },
  { date: "2024-09-28", desktop: 122 },
  { date: "2024-09-29", desktop: 315 },
  { date: "2024-09-30", desktop: 454 },
  { date: "2024-10-01", desktop: 165 },
  { date: "2024-10-02", desktop: 293 },
  { date: "2024-10-03", desktop: 247 },
  { date: "2024-10-04", desktop: 385 },
  { date: "2024-10-05", desktop: 481 },
  { date: "2024-10-06", desktop: 498 },
  { date: "2024-10-07", desktop: 388 },
  { date: "2024-10-08", desktop: 149 },
  { date: "2024-10-09", desktop: 227 },
  { date: "2024-10-10", desktop: 293 },
  { date: "2024-10-11", desktop: 335 },
  { date: "2024-10-12", desktop: 197 },
  { date: "2024-10-13", desktop: 197 },
  { date: "2024-10-14", desktop: 448 },
  { date: "2024-10-15", desktop: 473 },
  { date: "2024-10-16", desktop: 338 },
  { date: "2024-10-17", desktop: 499 },
  { date: "2024-10-18", desktop: 315 },
  { date: "2024-10-19", desktop: 235 },
  { date: "2024-10-20", desktop: 177 },
  { date: "2024-10-21", desktop: 82 },
  { date: "2024-10-22", desktop: 81 },
  { date: "2024-10-23", desktop: 252 },
  { date: "2024-10-24", desktop: 294 },
  { date: "2024-10-25", desktop: 201 },
  { date: "2024-10-26", desktop: 213 },
  { date: "2024-10-27", desktop: 420 },
  { date: "2024-10-28", desktop: 233 },
  { date: "2024-10-29", desktop: 78 },
  { date: "2024-10-30", desktop: 340 },
  { date: "2024-10-31", desktop: 178 },
  { date: "2024-11-01", desktop: 178 },
  { date: "2024-11-02", desktop: 470 },
  { date: "2024-11-03", desktop: 103 },
  { date: "2024-11-04", desktop: 439 },
  { date: "2024-11-05", desktop: 88 },
  { date: "2024-11-06", desktop: 294 },
  { date: "2024-11-07", desktop: 323 },
  { date: "2024-11-08", desktop: 385 },
  { date: "2024-11-09", desktop: 438 },
  { date: "2024-11-10", desktop: 155 },
  { date: "2024-11-11", desktop: 92 },
  { date: "2024-11-12", desktop: 492 },
  { date: "2024-11-13", desktop: 81 },
  { date: "2024-11-14", desktop: 426 },
  { date: "2024-11-15", desktop: 307 },
  { date: "2024-11-16", desktop: 371 },
  { date: "2024-11-17", desktop: 475 },
  { date: "2024-11-18", desktop: 107 },
  { date: "2024-11-19", desktop: 341 },
  { date: "2024-11-20", desktop: 408 },
  { date: "2024-11-21", desktop: 169 },
  { date: "2024-11-22", desktop: 317 },
  { date: "2024-11-23", desktop: 480 },
  { date: "2024-11-24", desktop: 132 },
  { date: "2024-11-25", desktop: 141 },
  { date: "2024-11-26", desktop: 434 },
  { date: "2024-11-27", desktop: 448 },
  { date: "2024-11-28", desktop: 149 },
  { date: "2024-11-29", desktop: 103 },
  { date: "2024-11-30", desktop: 446 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface SalesLinesProps {
  sales: {
    date: string | undefined;
    income: number;
  }[];
}

export const SalesLines: FC<SalesLinesProps> = ({ sales }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const [data, setData] = useState(sales);

  useEffect(() => {
    setData(sales);
  }, [sales]);

  console.log(sales);

  const filteredData = data.filter((item) => {
    const date = new Date(item.date ?? "");

    const referenceDate = new Date().toISOString().split("T")[0];

    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);

    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  console.log(filteredData);

  return (
    <>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger
          className="my-4 w-[160px] sm:ml-auto md:mb-4"
          aria-label="Seleccionar rango de tiempo"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            Últimos 3 meses
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Últimos 30 días
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Últimos 7 días
          </SelectItem>
        </SelectContent>
      </Select>

      <ChartContainer
        config={chartConfig}
        className="max-h-[560px] min-h-80 w-full"
      >
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("es-CO", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis tickLine axisLine={false} tickMargin={8} tickCount={4} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("es-CO", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="income"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};
