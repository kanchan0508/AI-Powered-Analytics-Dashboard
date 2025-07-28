import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { cn, formatCurrency, formatNumber } from '../lib/utils'
import { exportToCSV, exportToPDF } from '../lib/export'
import type { TableData } from '../data/mockData'
import * as Icons from 'lucide-react'

interface CampaignsTableProps {
  data: TableData[]
  title?: string
  description?: string
}

type SortField = keyof TableData
type SortDirection = 'asc' | 'desc'

export function CampaignsTable({ 
  data, 
  title = "Campaign Performance",
  description = "Overview of all marketing campaigns"
}: CampaignsTableProps) {
  const [sortField, setSortField] = useState<SortField>('revenue')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <Icons.ArrowUpDown className="h-4 w-4" />
    }
    return sortDirection === 'asc' 
      ? <Icons.ArrowUp className="h-4 w-4" />
      : <Icons.ArrowDown className="h-4 w-4" />
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(data)}
              className="flex items-center space-x-2"
            >
              <Icons.Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToPDF(data)}
              className="flex items-center space-x-2"
            >
              <Icons.FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('campaign')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Campaign
                    <SortIcon field="campaign" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('impressions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Impressions
                    <SortIcon field="impressions" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('clicks')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Clicks
                    <SortIcon field="clicks" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('ctr')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    CTR
                    <SortIcon field="ctr" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('conversions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Conversions
                    <SortIcon field="conversions" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('revenue')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Revenue
                    <SortIcon field="revenue" />
                  </Button>
                </th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((campaign) => (
                <tr key={campaign.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium">{campaign.campaign}</td>
                  <td className="p-4">{formatNumber(campaign.impressions)}</td>
                  <td className="p-4">{formatNumber(campaign.clicks)}</td>
                  <td className="p-4">{campaign.ctr.toFixed(2)}%</td>
                  <td className="p-4">{formatNumber(campaign.conversions)}</td>
                  <td className="p-4">{formatCurrency(campaign.revenue)}</td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                        getStatusColor(campaign.status)
                      )}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} campaigns
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Icons.ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <Icons.ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
