import type { TableData } from '../data/mockData'

export function exportToCSV(data: TableData[], filename: string = 'campaigns-data.csv') {
  // Create CSV header
  const headers = [
    'Campaign',
    'Impressions',
    'Clicks',
    'CTR (%)',
    'Conversions',
    'Revenue ($)',
    'Status'
  ]

  // Convert data to CSV format
  const csvData = [
    headers.join(','),
    ...data.map(row => [
      `"${row.campaign}"`,
      row.impressions,
      row.clicks,
      row.ctr.toFixed(2),
      row.conversions,
      row.revenue,
      row.status
    ].join(','))
  ].join('\n')

  // Create and download file
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function exportToPDF(_data: TableData[], _filename: string = 'campaigns-report.pdf') {
  // For a real implementation, you would use a library like jsPDF
  // For now, we'll just show a notification
  alert('PDF export feature would be implemented with jsPDF library in a real application')
}
