'use client';

import * as React from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import Loader from './Loader';
import toastify from '@/utils/toast';
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
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import DeleteModal from './DeleteModal';
import EditProduct from './EditProduct';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Dashboard() {
  const columns = [
    {
      id: 'Sno',
      header: 'Sno',
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },

    {
      accessorKey: 'productName',
      header: 'Product Title',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('productName')}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Category',
      // header: ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      //     >
      //       Email
      //       <ArrowUpDown />
      //     </Button>
      //   );
      // },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('type')}</div>
      ),
    },
    {
      accessorKey: 'dateIssued',
      header: 'Date Issued',
      // header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const value = row.getValue('dateIssued');
        let date = '-';
        if (value) {
          date = new Date(value);
          date = `${String(date.getDate()).padStart(2, '0')}-${String(
            date.getMonth() + 1
          ).padStart(2, '0')}-${date.getFullYear()}`;
        }
        return <div className="capitalize">{date}</div>;

        // Format the amount as a dollar amount
        //   const formatted = new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        //   }).format(amount);

        //   return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: 'enabled',
      cell: ({ row }) => {
        const _id = row.original._id;
        return (
          <div className="relative w-full flex justify-end">
            <button
              onClick={() => toggleHide(_id)}
              className="p-2 rounded-lg transition-all hover:bg-gray-300/50 opacity-0 group-hover:opacity-100"
            >
              {!row.original.enabled ? (
                <IoEyeOffOutline size={18} />
              ) : (
                <IoEyeOutline size={18} />
              )}
            </button>
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditId(row.original._id);
                  setEditModal(true);
                }}
                className="cursor-pointer p-0"
              >
                <span className="w-full text-left px-3 py-2">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteId(row.original._id);
                  setProductTitle(row.getValue('productName'));
                  setDeleteModal(true);
                }}
                className="cursor-pointer p-0"
              >
                <span className="w-full text-left px-3 py-2">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState();
  const [originalData, setOriginalData] = React.useState();
  const [madeChanges, setMadeChanges] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [productTitle, setProductTitle] = React.useState();
  const [editId, setEditId] = React.useState();
  const [editModal, setEditModal] = React.useState(false);

  const toggleHide = (rowId) => {
    setData((prev) =>
      prev.map((row) =>
        row._id === rowId ? { ...row, enabled: !row.enabled } : row
      )
    );
  };
  const handleSaveChanges = async () => {
    await fetch('/api/products/tableData', {
      method: 'PATCH',
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toastify('success', 'Saved Changes');
          setMadeChanges(false);
          setUpdatedData([]);
        } else {
          toastify('error', "Changes can't be updated");
        }
      });
  };

  React.useEffect(() => {
    const getData = async () => {
      await fetch('/api/products/tableData', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.data) {
            setData(res.data);
            setOriginalData(res.data);
          }
        });
    };
    getData();
  }, []);

  const getUpdatedData = () => {
    if (originalData) {
      const changedData = data.filter((item) => {
        const current = originalData.find((cur) => cur._id === item._id);
        return current && JSON.stringify(current) !== JSON.stringify(item);
      });
      if (changedData && changedData.length !== 0) {
        setMadeChanges(true);
        setUpdatedData(changedData);
      } else {
        setMadeChanges(false);
      }
    }
  };

  React.useEffect(() => {
    // const currentPage = table.getState().pagination.pageIndex;
    // console.log(currentPage);
    getUpdatedData();
    // table.setPageIndex(currentPage);
  }, [data]);

  const table = useReactTable({
    data: data ?? [],
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
      pagination,
    },
  });

  return (
    <>
      {deleteModal && (
        <DeleteModal
          productTitle={productTitle}
          deleteId={deleteId}
          setDeleteModal={setDeleteModal}
        />
      )}

      {editModal && <EditProduct id={editId} setEditModal={setEditModal} />}

      <div
        className={`w-full ${
          deleteModal && 'blur-lg max-h-screen overflow-hidden'
        }`}
      >
        <div className="flex items-center py-4">
          <Input
            placeholder="Search Products"
            value={table.getColumn('productName')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('productName')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
          <div className="flex-1 text-sm text-muted-foreground"></div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex - 1,
                }));
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // table.nextPage()
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }));
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              size="sm"
              onClick={handleSaveChanges}
              disabled={!madeChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>{' '}
        <ToastContainer />
      </div>
    </>
  );
}

export default Dashboard;
