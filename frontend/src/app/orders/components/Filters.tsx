import { Input } from "@/components/ui/input";

interface IntFilters {
    category?: string;
    source?: string;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
}

interface FiltersProps {
    filters: IntFilters;
    setFilters: (filters: IntFilters) => void;
}

export default function Filters ({ filters, setFilters}: FiltersProps) {
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <Input
                placeholder="Category"
                value={filters.category || ""}
                onChange={(e) => setFilters({ ...filters, category: e.target.value})}
            />

            <Input
                placeholder="Source"
                value={filters.source || ""}
                onChange={(e) => setFilters({ ...filters, source: e.target.value})}
            />

            <Input
                placeholder="Location"
                value={filters.location || ""}
                onChange={(e) => setFilters({ ...filters, location: e.target.value})}
            />

            <Input
                placeholder="Category"
                value={filters.category || ""}
                onChange={(e) => setFilters({ ...filters, category: e.target.value})}
            />

            <Input
                type="date"
                placeholder="From"
                value={filters.dateFrom || ""}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value})}
            />

            <Input
                type="date"
                placeholder="To"
                value={filters.dateTo || ""}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value})}
            />
        </div>
    )
}