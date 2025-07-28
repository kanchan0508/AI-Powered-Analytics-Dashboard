import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { ChartData } from '../data/mockData'

interface RevenueChartProps {
  data: ChartData[]
  title?: string
  description?: string
}

export function RevenueChart({ 
  data, 
  title = "Revenue Overview",
  description = "Daily revenue for the last 30 days"
}: RevenueChartProps) {
  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
            <XAxis 
              dataKey="name" 
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontSize: '12px',
              }}
              labelStyle={{ 
                color: 'hsl(var(--popover-foreground))',
                fontWeight: '500'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ 
                r: 6, 
                stroke: 'hsl(var(--primary))', 
                strokeWidth: 2,
                fill: 'hsl(var(--background))'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
