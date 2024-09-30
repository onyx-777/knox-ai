"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatContext } from "@/context/user-chat-context";
import { getMonthName } from "@/lib/utils";

export type ConversationSingleCustomerType = {
  domainId: string;
  domainName: string;
  domainIcon: string;
  email: string;
  createdAt: Date;
  chatRoomId: string;
  chatRoomLive: boolean;
  chatMessageSeen: boolean;
};

const columns: ColumnDef<ConversationSingleCustomerType>[] = [
  {
    id: "icon",
    header: () => <span>Icon</span>,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={row.original.domainIcon}
          alt={row.original.domainName}
        />
        <AvatarFallback>
          {row.original.domainName.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold text-lg">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Received
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="flex flex-col justify-center items-center">
          <div>{date.toLocaleTimeString()}</div>
          <div>
            {/* TODO : last received as the chatmessage last updatedAt */}
            {getMonthName(date.getMonth())} {date.getDate()}{" "}
            {date.getFullYear()}
          </div>
        </div>
      );
    },
  },
];

export function DataTable({
  data,
}: {
  data: ConversationSingleCustomerType[];
}) {
  const { chatRoomId, setChatRoomId, setDomainId } = useChatContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterType, setFilterType] = React.useState<"all" | "unread" | "read">(
    "all"
  );
  const [sortOrder, setSortOrder] = React.useState<"recent" | "older">(
    "recent"
  );
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(
    null
  );

  const filteredAndSortedData = React.useMemo(() => {
    let filtered = data;

    if (filterType === "unread") {
      filtered = filtered.filter((item) => !item.chatMessageSeen);
    } else if (filterType === "read") {
      filtered = filtered.filter((item) => item.chatMessageSeen);
    }

    if (selectedDomain) {
      filtered = filtered.filter((item) => item.domainName === selectedDomain);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [data, filterType, sortOrder, selectedDomain]);

  const table = useReactTable({
    data: filteredAndSortedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const uniqueDomains = React.useMemo(() => {
    return Array.from(new Set(data.map((item) => item.domainName)));
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 items-center justify-between py-4">
        <Input
          placeholder="Filter Email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("unread")}>
                Unread
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("read")}>
                Read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortOrder("recent")}>
                Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("older")}>
                Older
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedDomain || "All Domains"}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedDomain(null)}>
                All Domains
              </DropdownMenuItem>
              {uniqueDomains.map((domain) => (
                <DropdownMenuItem
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                >
                  {domain}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`relative hover:bg-muted/50 `}
                  onClick={() => {
                    setChatRoomId(row.original.chatRoomId);
                    setDomainId(row.original.domainId);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-5 cursor-pointer">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
