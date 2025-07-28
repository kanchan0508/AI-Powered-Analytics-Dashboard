import { useState, useEffect } from "react"
import { MetricCard } from "./metric-card"
import { RevenueChart } from "./revenue-chart"
import { UserEngagementChart } from "./user-engagement-chart"
import { TrafficSourcesChart } from "./traffic-sources-chart"
import { CampaignsTable } from "./campaigns-table"
import { Button } from "./ui/button"
import { useRealTimeData } from "../hooks/useRealTimeData"
import { 
  metricsData, 
  revenueChartData, 
  userEngagementData, 
  trafficSourcesData, 
  campaignsTableData 
} from "../data/mockData"
import * as Icons from 'lucide-react'

export function Dashboard() {
  const { isRealTime, setIsRealTime, lastUpdate, updateMetric, updateChartData } = useRealTimeData()
  const [currentMetrics, setCurrentMetrics] = useState(metricsData)
  const [currentRevenueData, setCurrentRevenueData] = useState(revenueChartData)

  useEffect(() => {
    if (isRealTime) {
      setCurrentMetrics(prev => prev.map(updateMetric))
      setCurrentRevenueData(prev => updateChartData(prev))
    }
  }, [lastUpdate, isRealTime, updateMetric, updateChartData])

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text">
            Dashboard
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome back! Here's your marketing performance overview.
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant={isRealTime ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
            className="flex items-center space-x-2 btn-hover transition-all duration-200"
          >
            <Icons.Activity className={`h-4 w-4 ${isRealTime ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isRealTime ? 'Live Updates' : 'Enable Live'}</span>
            <span className="sm:hidden">{isRealTime ? 'Live' : 'Enable'}</span>
          </Button>
          {isRealTime && (
            <span className="text-xs sm:text-sm text-muted-foreground animate-fade-in">
              <span className="hidden sm:inline">Last update: </span>
              {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={currentRevenueData} />
        </div>
        <div>
          <TrafficSourcesChart data={trafficSourcesData} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <UserEngagementChart data={userEngagementData} />
      </div>

      {/* Table Section */}
      <div className="grid gap-6">
        <CampaignsTable data={campaignsTableData} />
      </div>
    </div>
  )
}
