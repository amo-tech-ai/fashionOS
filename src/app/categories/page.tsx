"use client";

import React from "react";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { Table, Group, ScrollArea, Pagination, TextInput, Badge, Text, ActionIcon, Tooltip } from "@mantine/core";
import { IconSearch, IconTag, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";

interface ICategory {
  id: string;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  post_count?: number;
}

export default function CategoryList() {
  const columns = React.useMemo<ColumnDef<ICategory>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Category",
        cell: function render({ getValue, row }) {
          return (
            <Group spacing="sm">
              <Badge 
                color={row.original.color || "blue"} 
                variant="light"
                size="lg"
              >
                {row.original.icon || <IconTag size={14} />}
                {getValue() as string}
              </Badge>
            </Group>
          );
        },
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
        cell: function render({ getValue }) {
          const description = getValue() as string;
          return description ? (
            <Text size="sm" color="dimmed" lineClamp={2}>
              {description}
            </Text>
          ) : (
            <Text size="sm" color="dimmed" italic>
              No description
            </Text>
          );
        },
      },
      {
        id: "post_count",
        accessorKey: "post_count",
        header: "Posts",
        cell: function render({ getValue }) {
          const count = getValue() as number || 0;
          return (
            <Badge variant="outline" color="gray">
              {count} {count === 1 ? 'post' : 'posts'}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    setPageSize,
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List
      title="Categories"
      headerButtons={
        <TextInput
          placeholder="Search categories..."
          icon={<IconSearch size={16} />}
          style={{ width: 300 }}
        />
      }
    >
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <Group spacing={4} position="right" noWrap>
                    <Tooltip label="View Details">
                      <ActionIcon variant="subtle" color="blue">
                        <ShowButton 
                          hideText 
                          recordItemId={row.original.id}
                          size="xs"
                        />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Edit Category">
                      <ActionIcon variant="subtle" color="gray">
                        <EditButton 
                          hideText 
                          recordItemId={row.original.id}
                          size="xs"
                        />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete Category">
                      <ActionIcon variant="subtle" color="red">
                        <DeleteButton 
                          hideText 
                          recordItemId={row.original.id}
                          size="xs"
                        />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
        mt="md"
      />
    </List>
  );
}