export interface MetricData {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: string
}

export interface ChartData {
  name: string
  value: number
  date?: string
}

export interface TableData {
  id: string
  campaign: string
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  revenue: number
  status: 'active' | 'paused' | 'ended'
}

// Mock metrics data
export const metricsData: MetricData[] = [
  {
    title: 'Total Revenue',
    value: '$342,567',
    change: 12.5,
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    title: 'Active Users',
    value: '24,583',
    change: 8.2,
    trend: 'up',
    icon: 'Users'
  },
  {
    title: 'Conversions',
    value: '1,847',
    change: -2.1,
    trend: 'down',
    icon: 'Target'
  },
  {
    title: 'Growth Rate',
    value: '23.4%',
    change: 5.7,
    trend: 'up',
    icon: 'TrendingUp'
  }
]

// Mock revenue chart data (last 30 days)
export const revenueChartData: ChartData[] = [
  { name: 'Jan 1', value: 12500, date: '2024-01-01' },
  { name: 'Jan 3', value: 13200, date: '2024-01-03' },
  { name: 'Jan 5', value: 11800, date: '2024-01-05' },
  { name: 'Jan 7', value: 14500, date: '2024-01-07' },
  { name: 'Jan 9', value: 13800, date: '2024-01-09' },
  { name: 'Jan 11', value: 15200, date: '2024-01-11' },
  { name: 'Jan 13', value: 14100, date: '2024-01-13' },
  { name: 'Jan 15', value: 16300, date: '2024-01-15' },
  { name: 'Jan 17', value: 15800, date: '2024-01-17' },
  { name: 'Jan 19', value: 17200, date: '2024-01-19' },
  { name: 'Jan 21', value: 16500, date: '2024-01-21' },
  { name: 'Jan 23', value: 18100, date: '2024-01-23' },
  { name: 'Jan 25', value: 17800, date: '2024-01-25' },
  { name: 'Jan 27', value: 19500, date: '2024-01-27' },
  { name: 'Jan 29', value: 18900, date: '2024-01-29' },
  { name: 'Jan 31', value: 20300, date: '2024-01-31' }
]

// Mock user engagement data
export const userEngagementData: ChartData[] = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 }
]

// Mock conversion funnel data
export const conversionFunnelData: ChartData[] = [
  { name: 'Impressions', value: 156000 },
  { name: 'Clicks', value: 12400 },
  { name: 'Visits', value: 8900 },
  { name: 'Sign-ups', value: 2100 },
  { name: 'Purchases', value: 450 }
]

// Mock traffic sources data
export const trafficSourcesData: ChartData[] = [
  { name: 'Organic Search', value: 45 },
  { name: 'Paid Search', value: 28 },
  { name: 'Social Media', value: 15 },
  { name: 'Direct', value: 8 },
  { name: 'Email', value: 4 }
]

// Mock campaigns table data
export const campaignsTableData: TableData[] = [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    impressions: 245000,
    clicks: 12400,
    ctr: 5.06,
    conversions: 890,
    revenue: 45670,
    status: 'active'
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q1',
    impressions: 189000,
    clicks: 8900,
    ctr: 4.71,
    conversions: 567,
    revenue: 32100,
    status: 'active'
  },
  {
    id: '3',
    campaign: 'Holiday Special',
    impressions: 312000,
    clicks: 18700,
    ctr: 5.99,
    conversions: 1240,
    revenue: 78900,
    status: 'ended'
  },
  {
    id: '4',
    campaign: 'Product Launch',
    impressions: 156000,
    clicks: 9300,
    ctr: 5.96,
    conversions: 456,
    revenue: 28400,
    status: 'paused'
  },
  {
    id: '5',
    campaign: 'Retargeting Campaign',
    impressions: 89000,
    clicks: 7800,
    ctr: 8.76,
    conversions: 678,
    revenue: 41200,
    status: 'active'
  },
  {
    id: '6',
    campaign: 'Mobile App Install',
    impressions: 198000,
    clicks: 11200,
    ctr: 5.66,
    conversions: 789,
    revenue: 35600,
    status: 'active'
  }
]
