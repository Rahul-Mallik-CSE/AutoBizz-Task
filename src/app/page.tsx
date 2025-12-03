/** @format */

"use client";

function DashboardContent() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Sales Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and analyze your sales data with powerful filters
          </p>
        </div>

        {/* Error States */}
      </div>
    </main>
  );
}

export default function Page() {
  return <DashboardContent />;
}
