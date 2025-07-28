import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { ChartData } from '../data/mockData'

interface TrafficSourcesChartProps {
  data: ChartData[]
  title?: string
  description?: string
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(210, 100%, 56%)', // Blue
  'hsl(142, 76%, 36%)',  // Green
  'hsl(38, 92%, 50%)',   // Orange
  'hsl(280, 100%, 50%)'  // Purple
]

export function TrafficSourcesChart({ 
  data, 
  title = "Traffic Sources",
  description = "Distribution of traffic sources this month"
}: TrafficSourcesChartProps) {
  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <PieChart margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              className="transition-all duration-300"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              ))}
            </Pie>
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
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '12px',
                color: 'hsl(var(--muted-foreground))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
