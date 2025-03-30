"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDownLeft, ArrowUpRight, Coffee, CreditCard, Home, Search, ShoppingBag, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const transactions = [
  {
    id: "t1",
    name: "Amazon",
    category: "Shopping",
    date: "Today",
    amount: -89.99,
    icon: ShoppingBag,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
  },
  {
    id: "t2",
    name: "Starbucks",
    category: "Food & Drink",
    date: "Today",
    amount: -5.75,
    icon: Coffee,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: "t3",
    name: "Salary",
    category: "Income",
    date: "Yesterday",
    amount: 3500.0,
    icon: CreditCard,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: "t4",
    name: "Rent",
    category: "Housing",
    date: "Mar 1",
    amount: -1200.0,
    icon: Home,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
  {
    id: "t5",
    name: "Phone Bill",
    category: "Utilities",
    date: "Feb 28",
    amount: -85.0,
    icon: Smartphone,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
]

export function RecentTransactions() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <Avatar className={`h-10 w-10 ${transaction.iconBg}`}>
                <transaction.icon className={`h-5 w-5 ${transaction.iconColor}`} />
                <AvatarFallback>{transaction.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{transaction.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-right font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              {transaction.amount < 0 ? (
                <ArrowDownLeft className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

