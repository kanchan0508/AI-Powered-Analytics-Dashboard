import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { ChartData } from '../data/mockData'

interface UserEngagementChartProps {
  data: ChartData[]
  title?: string
  description?: string
}

export function UserEngagementChart({ 
  data, 
  title = "User Engagement",
  description = "Daily active users this week"
}: UserEngagementChartProps) {
  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
