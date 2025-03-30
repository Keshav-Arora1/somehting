"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FinancialHealthScoreProps {
  score: number
}

export function FinancialHealthScore({ score }: FinancialHealthScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)

    return () => clearTimeout(timer)
  }, [score])

  // Calculate color based on score
  const getColor = (score: number) => {
    if (score < 40) return "#ef4444" // red
    if (score < 70) return "#f59e0b" // amber
    return "#10b981" // green
  }

  const color = getColor(score)
  const circumference = 2 * Math.PI * 45 // 45 is the radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        {/* Background circle */}
        <svg className="absolute inset-0" width="160" height="160" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
        </svg>

        {/* Progress circle */}
        <svg className="absolute inset-0 -rotate-90" width="160" height="160" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {animatedScore}
            </motion.div>
            <div className="text-xs text-muted-foreground">Health Score</div>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-between text-xs">
        <span className="text-red-500">Poor</span>
        <span className="text-amber-500">Good</span>
        <span className="text-green-500">Excellent</span>
      </div>
    </div>
  )
}

