"use client";

import React from "react";
import { List, DateField, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { Table, Group, ScrollArea, Pagination, TextInput, Badge, Avatar, Text } from "@mantine/core";
import { IconSearch, IconArticle } from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";

interface IBlogPost {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published";
  categories: { id: string; title: string };
  createdAt: string;
  author?: string;
  featured_image?: string;
}

export default function BlogPostList() {
  const columns = React.useMemo<ColumnDef<IBlogPost>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        cell: function render({ getValue, row }) {
          return (
            <Group spacing="sm">
              {row.original.featured_image ? (
                <Avatar src={row.original.featured_image} size="sm" radius="md">
                  <IconArticle size={16} />
                </Avatar>
              ) : (
                <Avatar color="blue" size="sm" radius="md">
                  <IconArticle size={16} />
                </Avatar>
              )}
              <Text weight={500} size="sm">
                {getValue() as string}
              </Text>
            </Group>
          );
        },
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content Preview",
        cell: function render({ getValue }) {
          const content = getValue() as string;
          const preview = content?.substring(0, 100) + (content?.length > 100 ? "..." : "");
          return (
            <Text size="sm" color="dimmed" lineClamp={2}>
              {preview}
            </Text>
          );
        },
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "categories",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<any>()?.id
            );

            return category?.title ? (
              <Badge variant="outline" color="grape">
                {category.title}
              </Badge>
            ) : (
              <Text size="sm" color="dimmed">-</Text>
            );
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: function render({ getValue }) {
          const status = getValue() as string;
          return (
            <Badge
              color={status === "published" ? "green" : "gray"}
              variant="light"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="MMM DD, YYYY" />;
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
    refineCoreProps: {
      meta: {
        select: "*, categories(id,title)",
      },
    },
  });

  const { data: categoryData } = useMany({
    resource: "categories",
    ids:
      tableData?.data?.map((item) => item?.categories?.id).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <List
      title="Blog Posts"
      headerButtons={
        <TextInput
          placeholder="Search posts..."
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
                <th>Actions</th>
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
                    <ShowButton hideText recordItemId={row.original.id} />
                    <EditButton hideText recordItemId={row.original.id} />
                    <DeleteButton hideText recordItemId={row.original.id} />
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