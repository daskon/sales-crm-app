import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IntFilters {
    category?: string;
    source?: string;
    geo?: string;
    dateFrom?: string;
    dateTo?: string;
}

interface FiltersProps {
    filters: IntFilters;
    setFilters: (filters: IntFilters) => void;
}

export default function Filters ({ filters, setFilters}: FiltersProps) {

    const clearFilters = () => {
        setFilters({
            category: "",
            source: "",
            geo: "",
            dateFrom: "",
            dateTo: ""
        });
    }
    return (
        <div className="w-full rounded-lg border bg-white p-4 shadow-sm space-y-4">
            <div className="flex flex-wrap gap-4">
                <Select
                    value={filters.category || ""}
                    onValueChange={(value) => setFilters({ ...filters, category: value})}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Property">Property</SelectItem>
                        <SelectItem value="Hobby">Hobby</SelectItem>
                        <SelectItem value="Vehicle">Vehicle</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.source || ""}
                    onValueChange={(value) => setFilters({ ...filters, source: value})}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Shop">Shop</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.geo || ""}
                    onValueChange={(value) => setFilters({ ...filters, geo: value})}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="Australiya">Australiya</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <Input
                    type="date"
                    placeholder="From"
                    value={filters.dateFrom || ""}
                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value})}
                    className="w-[180px]"
                />

                <Input
                    type="date"
                    placeholder="To"
                    value={filters.dateTo || ""}
                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value})}
                    className="w-[180px]"
                />

                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="ml-auto"
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}