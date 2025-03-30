"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Mic, PieChart, Plus, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinancialHealthScore } from "@/components/financial-health-score"
import { CashFlowChart } from "@/components/cash-flow-chart"
import { RecentTransactions } from "@/components/recent-transactions"

export default function DashboardPage() {
  const [isListening, setIsListening] = useState(false)

  const handleVoiceCommand = () => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleVoiceCommand} variant="outline" size="icon" className="relative">
            <Mic className={isListening ? "text-primary animate-pulse" : ""} />
            {isListening && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
              </span>
            )}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">24,563.55</div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>3.2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-50" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">8,350.00</div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>5.3% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-50" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">3,642.25</div>
              </div>
              <div className="mt-2 flex items-center text-sm text-red-500">
                <ArrowDown className="mr-1 h-3 w-3" />
                <span>2.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Investments</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">12,865.30</div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>7.8% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-7">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-80" />
            <CardHeader className="relative">
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Your income and expenses over time</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <CashFlowChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-80" />
            <CardHeader className="relative">
              <CardTitle>Financial Health</CardTitle>
              <CardDescription>AI-powered financial health score</CardDescription>
            </CardHeader>
            <CardContent className="relative flex flex-col items-center justify-center">
              <FinancialHealthScore score={78} />
              <div className="mt-6 w-full">
                <Tabs defaultValue="strengths">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="strengths">Strengths</TabsTrigger>
                    <TabsTrigger value="improvements">Improvements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="strengths" className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="h-4 w-4 text-green-500" />
                      <span>Emergency fund is well-funded</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-green-500" />
                      <span>Low credit utilization ratio</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <PieChart className="h-4 w-4 text-green-500" />
                      <span>Diversified investment portfolio</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="improvements" className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <PieChart className="h-4 w-4 text-amber-500" />
                      <span>Increase retirement contributions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-amber-500" />
                      <span>Reduce dining out expenses</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Wallet className="h-4 w-4 text-amber-500" />
                      <span>Build additional income streams</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card className="overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-80" />
          <CardHeader className="relative">
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <RecentTransactions />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

