export function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
    );
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="flex gap-4 mb-2">
                {[...Array(cols)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                ))}
            </div>
            {/* Rows */}
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="flex gap-4 mb-2">
                    {[...Array(cols)].map((_, j) => (
                        <div key={j} className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function SkeletonDashboard() {
    return (
        <div className="animate-pulse">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                ))}
            </div>
            {/* Chart */}
            <div className="h-80 bg-gray-300 dark:bg-gray-600 rounded-lg mb-6"></div>
            {/* Table */}
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
    );
}

export function SkeletonForm({ fields = 4 }) {
    return (
        <div className="animate-pulse space-y-4">
            {[...Array(fields)].map((_, i) => (
                <div key={i}>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            ))}
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>
    );
}