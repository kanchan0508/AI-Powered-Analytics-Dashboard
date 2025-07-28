import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn, formatPercentage } from "../lib/utils"
import * as Icons from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: string
  className?: string
  style?: React.CSSProperties
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
  className,
  style
}: MetricCardProps) {
  const IconComponent = (Icons as any)[icon] || Icons.BarChart3
  
  return (
    <Card className={cn("animate-fade-in card-hover group relative overflow-hidden", className)} style={style}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold group-hover:text-primary transition-colors duration-200">{value}</div>
        <div className="flex items-center text-xs">
          <span
            className={cn(
              "flex items-center font-medium",
              trend === 'up' ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {trend === 'up' ? (
              <Icons.TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <Icons.TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatPercentage(change)}
          </span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
