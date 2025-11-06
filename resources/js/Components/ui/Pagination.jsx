import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export function Pagination({ links, meta, className }) {
    if (!meta || meta.last_page <= 1) {
        return null;
    }

    const { current_page, last_page, from, to, total } = meta;

    return (
        <div className={cn('flex items-center justify-between px-4 py-3 sm:px-6', className)}>
            <div className="flex flex-1 justify-between sm:hidden">
                {links.prev ? (
                    <Link href={links.prev} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                        Previous
                    </span>
                )}
                {links.next ? (
                    <Link href={links.next} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                    </Link>
                ) : (
                    <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
                        Next
                    </span>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {/* First Page */}
                        {links.first && current_page > 1 ? (
                            <Link
                                href={links.first}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">First</span>
                                <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                                <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                            </span>
                        )}

                        {/* Previous Page */}
                        {links.prev ? (
                            <Link
                                href={links.prev}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </span>
                        )}

                        {/* Page Numbers */}
                        {generatePageNumbers(current_page, last_page).map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isActive = page === current_page;
                            const url = links.first.replace(/page=\d+/, `page=${page}`);

                            return isActive ? (
                                <span
                                    key={page}
                                    aria-current="page"
                                    className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    {page}
                                </span>
                            ) : (
                                <Link
                                    key={page}
                                    href={url}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    {page}
                                </Link>
                            );
                        })}

                        {/* Next Page */}
                        {links.next ? (
                            <Link
                                href={links.next}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </span>
                        )}

                        {/* Last Page */}
                        {links.last && current_page < last_page ? (
                            <Link
                                href={links.last}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Last</span>
                                <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 cursor-not-allowed">
                                <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                            </span>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}

function generatePageNumbers(currentPage, lastPage) {
    const pages = [];
    const delta = 2; // Number of pages to show on each side of current page

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(lastPage - 1, currentPage + delta);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
        pages.push('...');
    }

    // Add pages around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < lastPage - 1) {
        pages.push('...');
    }

    // Always show last page if there's more than 1 page
    if (lastPage > 1) {
        pages.push(lastPage);
    }

    return pages;
}
