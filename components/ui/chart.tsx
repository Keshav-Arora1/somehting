"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("w-full", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "pointer-events-none absolute z-50 opacity-0 transition-opacity duration-100 data-[state=open]:opacity-100",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  { items: { label: string; value: (item: any) => string; color: string }[] } & React.HTMLAttributes<HTMLDivElement>
>(({ className, items, ...props }, ref) => {
  return (
    <div
      className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-sm", className)}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between space-x-2">
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className="font-medium">{item.value({ income: 0, expenses: 0 })}</span>
        </div>
      ))}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center", className)} ref={ref} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
}

const ChartLegendItem = React.forwardRef<HTMLDivElement, ChartLegendItemProps>(
  ({ className, name, color, ...props }, ref) => {
    return (
      <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props}>
        <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm font-medium">{name}</span>
      </div>
    )
  },
)
ChartLegendItem.displayName = "ChartLegendItem"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }

