import { Card, CardContent, CardHeader } from "./ui/card"

export function LoadingSkeleton() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded shimmer" />
        <div className="h-4 w-64 bg-muted rounded shimmer" />
      </div>

      {/* Metrics Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted rounded shimmer" />
              <div className="h-4 w-4 bg-muted rounded shimmer" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-muted rounded shimmer mb-2" />
              <div className="h-3 w-32 bg-muted rounded shimmer" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-muted rounded shimmer mb-2" />
              <div className="h-4 w-48 bg-muted rounded shimmer" />
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted rounded shimmer" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <div className="h-6 w-28 bg-muted rounded shimmer mb-2" />
              <div className="h-4 w-40 bg-muted rounded shimmer" />
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted rounded shimmer" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-36 bg-muted rounded shimmer mb-2" />
          <div className="h-4 w-52 bg-muted rounded shimmer" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-6 w-32 bg-muted rounded shimmer" />
                <div className="h-6 w-20 bg-muted rounded shimmer" />
                <div className="h-6 w-16 bg-muted rounded shimmer" />
                <div className="h-6 w-12 bg-muted rounded shimmer" />
                <div className="h-6 w-20 bg-muted rounded shimmer" />
                <div className="h-6 w-24 bg-muted rounded shimmer" />
                <div className="h-6 w-16 bg-muted rounded shimmer" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
