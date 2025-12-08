import { Link } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/Components/ui/Pagination';

export default function LaravelPagination({ data, preserveScroll = true }) {
    if (!data || !data.links || data.links.length <= 3) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {data.prev_page_url ? (
                    <Link
                        href={data.prev_page_url}
                        preserveScroll={preserveScroll}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
                        Previous
                    </span>
                )}
                {data.next_page_url ? (
                    <Link
                        href={data.next_page_url}
                        preserveScroll={preserveScroll}
                        className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
                        Next
                    </span>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{data.from || 0}</span> to{' '}
                        <span className="font-medium">{data.to || 0}</span> of{' '}
                        <span className="font-medium">{data.total || 0}</span> results
                    </p>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationItem>
                                {data.prev_page_url ? (
                                    <Link href={data.prev_page_url} preserveScroll={preserveScroll}>
                                        <PaginationPrevious />
                                    </Link>
                                ) : (
                                    <PaginationPrevious className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>

                            {/* Page Numbers */}
                            {data.links.slice(1, -1).map((link, index) => {
                                // Show ellipsis for pages far from current
                                const pageNumber = index + 1;
                                const currentPage = data.current_page;
                                const lastPage = data.last_page;

                                // Always show first page, last page, current page, and pages around current
                                const shouldShow =
                                    pageNumber === 1 ||
                                    pageNumber === lastPage ||
                                    Math.abs(pageNumber - currentPage) <= 1;

                                if (!shouldShow) {
                                    // Show ellipsis if this is the first hidden page after visible ones
                                    if (
                                        (pageNumber === currentPage - 2 && currentPage > 3) ||
                                        (pageNumber === currentPage + 2 && currentPage < lastPage - 2)
                                    ) {
                                        return (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return null;
                                }

                                return (
                                    <PaginationItem key={index}>
                                        {link.url ? (
                                            <Link href={link.url} preserveScroll={preserveScroll}>
                                                <PaginationLink isActive={link.active}>
                                                    {link.label}
                                                </PaginationLink>
                                            </Link>
                                        ) : (
                                            <PaginationLink isActive={link.active}>
                                                {link.label}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                );
                            })}

                            {/* Next Button */}
                            <PaginationItem>
                                {data.next_page_url ? (
                                    <Link href={data.next_page_url} preserveScroll={preserveScroll}>
                                        <PaginationNext />
                                    </Link>
                                ) : (
                                    <PaginationNext className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
