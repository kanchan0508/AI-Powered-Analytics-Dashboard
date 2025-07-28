import { useState, useEffect } from 'react'
import type { MetricData, ChartData } from '../data/mockData'

export function useRealTimeData() {
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates every 5 seconds when enabled
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [isRealTime])

  // Function to add random variation to metrics
  const updateMetric = (metric: MetricData): MetricData => {
    if (!isRealTime) return metric

    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    const baseValue = parseFloat(metric.value.replace(/[$,%K]/g, ''))
    const newValue = baseValue * (1 + variation)
    
    let formattedValue: string
    if (metric.value.includes('$')) {
      formattedValue = `$${Math.round(newValue).toLocaleString()}`
    } else if (metric.value.includes('%')) {
      formattedValue = `${newValue.toFixed(1)}%`
    } else if (metric.value.includes('K')) {
      formattedValue = `${(newValue / 1000).toFixed(1)}K`
    } else {
      formattedValue = Math.round(newValue).toLocaleString()
    }

    return {
      ...metric,
      value: formattedValue,
      change: metric.change + (Math.random() - 0.5) * 2
    }
  }

  // Function to add new data point to charts
  const updateChartData = (data: ChartData[]): ChartData[] => {
    if (!isRealTime) return data

    // Add a new data point and remove the oldest one
    const newData = [...data]
    const lastPoint = newData[newData.length - 1]
    const variation = (Math.random() - 0.5) * 0.2
    const newValue = lastPoint.value * (1 + variation)

    newData.push({
      name: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.round(newValue)
    })

    // Keep only the last 16 data points
    return newData.slice(-16)
  }

  return {
    isRealTime,
    setIsRealTime,
    lastUpdate,
    updateMetric,
    updateChartData
  }
}
