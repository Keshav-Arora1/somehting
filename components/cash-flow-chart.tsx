"use client"

import { useState } from "react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", income: 5200, expenses: 3100 },
  { month: "Feb", income: 5300, expenses: 3300 },
  { month: "Mar", income: 5150, expenses: 3400 },
  { month: "Apr", income: 5400, expenses: 3200 },
  { month: "May", income: 5800, expenses: 3500 },
  { month: "Jun", income: 6000, expenses: 3700 },
  { month: "Jul", income: 6200, expenses: 3800 },
  { month: "Aug", income: 6100, expenses: 3600 },
  { month: "Sep", income: 6300, expenses: 3500 },
  { month: "Oct", income: 6500, expenses: 3400 },
  { month: "Nov", income: 6700, expenses: 3300 },
  { month: "Dec", income: 8350, expenses: 3642 },
]

export function CashFlowChart() {
  const [focusBar, setFocusBar] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer>
        <ChartLegend className="mb-4 justify-end gap-8">
          <ChartLegendItem name="Income" color="#10b981" />
          <ChartLegendItem name="Expenses" color="#ef4444" />
        </ChartLegend>
        <ResponsiveContainer width="100%" height="100%">
          <Chart>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              onMouseMove={(state) => {
                if (state?.activeTooltipIndex !== undefined) {
                  setFocusBar(state.activeTooltipIndex.toString())
                }
              }}
              onMouseLeave={() => setFocusBar(null)}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
              <YAxis
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
                className="text-xs text-muted-foreground"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="border-border bg-background p-2 shadow-md"
                    items={[
                      {
                        label: "Income",
                        value: (value) => formatCurrency(value.income),
                        color: "#10b981",
                      },
                      {
                        label: "Expenses",
                        value: (value) => formatCurrency(value.expenses),
                        color: "#ef4444",
                      },
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                fill="url(#colorIncome)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fill="url(#colorExpenses)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </Chart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

