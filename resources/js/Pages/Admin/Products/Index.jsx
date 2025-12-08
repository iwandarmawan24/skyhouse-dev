import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Badge } from "@/Components/ui/Badge";
import { Slider } from "@/Components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/Dialog";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { DataTable } from "@/Components/DataTable";
import { createColumns, ViewProductDialog } from "./columns";
import LaravelPagination from "@/Components/LaravelPagination";

export default function Index({ products, filters, filterOptions }) {
    console.log('Component props:', { products, filters, filterOptions });

    // Ensure filterOptions has valid defaults
    const safeFilterOptions = {
        ...filterOptions,
        priceRange: {
            min: Number(filterOptions?.priceRange?.min) || 0,
            max: Number(filterOptions?.priceRange?.max) || 100000000000,
        },
        cities: filterOptions?.cities || [],
        provinces: filterOptions?.provinces || [],
    };

    const { flash } = usePage().props;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [viewProduct, setViewProduct] = useState(null);
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

    const [localFilters, setLocalFilters] = useState({
        types: filters?.types ? filters.types.split(',').filter(Boolean) : [],
        statuses: filters?.statuses ? filters.statuses.split(',').filter(Boolean) : [],
        cities: filters?.cities ? filters.cities.split(',').filter(Boolean) : [],
        provinces: filters?.provinces ? filters.provinces.split(',').filter(Boolean) : [],
        search: filters?.search || "",
        min_price: filters?.min_price || safeFilterOptions.priceRange.min,
        max_price: filters?.max_price || safeFilterOptions.priceRange.max,
    });

    // Local state for slider (to prevent too many requests)
    const [priceRange, setPriceRange] = useState(() => {
        const min = Number(filters?.min_price) || safeFilterOptions.priceRange.min;
        const max = Number(filters?.max_price) || safeFilterOptions.priceRange.max;
        console.log('Initial price range:', { min, max, safeFilterOptions, filters });
        return [min, max];
    });

    // Sync priceRange when filterOptions changes
    useEffect(() => {
        const min = safeFilterOptions.priceRange.min;
        const max = safeFilterOptions.priceRange.max;

        // Only update if values are valid numbers
        if (!isNaN(min) && !isNaN(max) && min < max) {
            setPriceRange([
                Number(filters?.min_price) || min,
                Number(filters?.max_price) || max,
            ]);
        }
    }, [safeFilterOptions.priceRange.min, safeFilterOptions.priceRange.max, filters?.min_price, filters?.max_price]);

    const handlePriceRangeChange = (newValues) => {
        console.log('Price range change:', newValues);
        // Validate that all values are valid numbers
        if (Array.isArray(newValues)) {
            const validValues = newValues.filter(v => typeof v === 'number' && !isNaN(v));
            if (validValues.length === newValues.length) {
                setPriceRange(newValues);
            }
        }
    };

    const handleDelete = (uid) => {
        router.delete(`/admin/products/${uid}`, {
            onSuccess: () => {
                setShowDeleteConfirm(null);
            },
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        // Convert arrays to comma-separated strings for URL
        const filterParams = {
            search: newFilters.search,
            types: newFilters.types.join(','),
            statuses: newFilters.statuses.join(','),
            cities: newFilters.cities.join(','),
            provinces: newFilters.provinces.join(','),
            min_price: newFilters.min_price,
            max_price: newFilters.max_price,
        };

        router.get("/admin/products", filterParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleFilter = (key, value) => {
        const currentValues = localFilters[key];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        handleFilterChange(key, newValues);
    };

    const clearFilters = () => {
        const defaultMin = safeFilterOptions.priceRange.min;
        const defaultMax = safeFilterOptions.priceRange.max;

        setLocalFilters({
            types: [],
            statuses: [],
            cities: [],
            provinces: [],
            search: "",
            min_price: defaultMin,
            max_price: defaultMax,
        });
        setPriceRange([defaultMin, defaultMax]);
        router.get("/admin/products", {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFilter = (key, value) => {
        const newValues = localFilters[key].filter(v => v !== value);
        handleFilterChange(key, newValues);
    };

    const applyAdvancedFilter = () => {
        const newFilters = {
            ...localFilters,
            min_price: priceRange[0],
            max_price: priceRange[1],
        };
        setLocalFilters(newFilters);

        const filterParams = {
            search: newFilters.search,
            types: newFilters.types.join(','),
            statuses: newFilters.statuses.join(','),
            cities: newFilters.cities.join(','),
            provinces: newFilters.provinces.join(','),
            min_price: newFilters.min_price,
            max_price: newFilters.max_price,
        };

        router.get("/admin/products", filterParams, {
            preserveState: true,
            preserveScroll: true,
        });

        setShowAdvancedFilter(false);
    };

    const formatPrice = (price) => {
        const numPrice = Number(price);
        if (isNaN(numPrice)) {
            return 'Rp 0';
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numPrice);
    };

    const hasAdvancedFilters = localFilters.cities.length > 0 ||
        localFilters.provinces.length > 0 ||
        localFilters.min_price !== safeFilterOptions.priceRange.min ||
        localFilters.max_price !== safeFilterOptions.priceRange.max;

    const columns = createColumns(setShowDeleteConfirm, setViewProduct);

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your property listings and inventory
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/products/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Link>
                    </Button>
                </div>

                {/* Filters Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Search and Filter Buttons */}
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search by name, location, or city..."
                                            value={localFilters.search}
                                            onChange={(e) =>
                                                handleFilterChange("search", e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Type Filter Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Type
                                            {localFilters.types.length > 0 && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    {localFilters.types.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.types.includes('house')}
                                            onCheckedChange={() => toggleFilter('types', 'house')}
                                        >
                                            House
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.types.includes('apartment')}
                                            onCheckedChange={() => toggleFilter('types', 'apartment')}
                                        >
                                            Apartment
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.types.includes('land')}
                                            onCheckedChange={() => toggleFilter('types', 'land')}
                                        >
                                            Land
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Status Filter Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Status
                                            {localFilters.statuses.length > 0 && (
                                                <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                                    {localFilters.statuses.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('active')}
                                            onCheckedChange={() => toggleFilter('statuses', 'active')}
                                        >
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('sold')}
                                            onCheckedChange={() => toggleFilter('statuses', 'sold')}
                                        >
                                            Sold
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={localFilters.statuses.includes('inactive')}
                                            onCheckedChange={() => toggleFilter('statuses', 'inactive')}
                                        >
                                            Inactive
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Advanced Filter Button */}
                                <Button
                                    variant="outline"
                                    className="gap-2"
                                    onClick={() => setShowAdvancedFilter(true)}
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Advanced
                                    {hasAdvancedFilters && (
                                        <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0">
                                            ✓
                                        </Badge>
                                    )}
                                </Button>
                            </div>

                            {/* Active Filters */}
                            {(localFilters.types.length > 0 || localFilters.statuses.length > 0 || localFilters.cities.length > 0 || localFilters.provinces.length > 0 || localFilters.search || hasAdvancedFilters) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>

                                    {/* Type badges */}
                                    {localFilters.types.map((type) => (
                                        <Badge key={type} variant="secondary" className="gap-1">
                                            Type: {type.charAt(0).toUpperCase() + type.slice(1)}
                                            <button
                                                onClick={() => removeFilter('types', type)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}

                                    {/* Status badges */}
                                    {localFilters.statuses.map((status) => (
                                        <Badge key={status} variant="secondary" className="gap-1">
                                            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                                            <button
                                                onClick={() => removeFilter('statuses', status)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}

                                    {/* City badges */}
                                    {localFilters.cities.map((city) => (
                                        <Badge key={city} variant="secondary" className="gap-1">
                                            City: {city}
                                            <button
                                                onClick={() => removeFilter('cities', city)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}

                                    {/* Province badges */}
                                    {localFilters.provinces.map((province) => (
                                        <Badge key={province} variant="secondary" className="gap-1">
                                            Province: {province}
                                            <button
                                                onClick={() => removeFilter('provinces', province)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}

                                    {/* Price range badge */}
                                    {(localFilters.min_price !== filterOptions.priceRange.min || localFilters.max_price !== filterOptions.priceRange.max) && (
                                        <Badge variant="secondary" className="gap-1">
                                            Price: {formatPrice(localFilters.min_price)} - {formatPrice(localFilters.max_price)}
                                        </Badge>
                                    )}

                                    {/* Clear all button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="h-6 px-2 text-xs"
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Products DataTable */}
                <Card>
                    <CardContent className="pt-6">
                        <DataTable
                            columns={columns}
                            data={products.data || []}
                        />
                    </CardContent>
                </Card>

                {/* Pagination */}
                {products.data && products.data.length > 0 && (
                    <LaravelPagination data={products} />
                )}
            </div>

            {/* Advanced Filter Dialog */}
            <Dialog open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Advanced Filters</DialogTitle>
                        <DialogDescription>
                            Refine your search with additional filters
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Price Range Slider */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">Price Range</Label>
                            <div className="space-y-3">
                                {console.log('Rendering slider with:', {
                                    min: safeFilterOptions.priceRange.min,
                                    max: safeFilterOptions.priceRange.max,
                                    value: priceRange
                                })}
                                <Slider
                                    min={safeFilterOptions.priceRange.min}
                                    max={safeFilterOptions.priceRange.max}
                                    step={100000000}
                                    value={priceRange}
                                    onValueChange={handlePriceRangeChange}
                                    className="w-full"
                                />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {formatPrice(priceRange[0])}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {formatPrice(priceRange[1])}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* City Filter */}
                        <div className="space-y-3">
                            <Label className="text-base font-semibold">City</Label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                                {safeFilterOptions.cities.map((city) => (
                                    <div key={city} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`city-${city}`}
                                            checked={localFilters.cities.includes(city)}
                                            onChange={() => toggleFilter('cities', city)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <label
                                            htmlFor={`city-${city}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {city}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Province Filter */}
                        <div className="space-y-3">
                            <Label className="text-base font-semibold">Province</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {safeFilterOptions.provinces.map((province) => (
                                    <div key={province} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`province-${province}`}
                                            checked={localFilters.provinces.includes(province)}
                                            onChange={() => toggleFilter('provinces', province)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <label
                                            htmlFor={`province-${province}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {province}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowAdvancedFilter(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={applyAdvancedFilter}>
                            Apply Filters
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Product Dialog */}
            <ViewProductDialog
                product={viewProduct}
                open={!!viewProduct}
                onOpenChange={() => setViewProduct(null)}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!showDeleteConfirm}
                onOpenChange={() => setShowDeleteConfirm(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action
                            cannot be undone and will also delete all associated images.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDelete(showDeleteConfirm)}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
