"use client";

import { 
  List, 
  EditButton, 
  ShowButton, 
  DeleteButton,
  DateField,
  TagField,
  BooleanField,
  CreateButton,
} from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { 
  Table, 
  Group, 
  Text, 
  ActionIcon, 
  ScrollArea,
  TextInput,
  Select,
  Badge,
  Avatar,
  Stack,
  Button,
  Card,
  Grid,
  NumberInput,
  Box,
  Flex,
  Title,
  Paper,
  Divider,
  Center,
  Loader,
  Menu,
  MultiSelect,
} from "@mantine/core";
import { 
  IconSearch, 
  IconFilter,
  IconCalendarEvent,
  IconMapPin,
  IconUsers,
  IconCoin,
  IconEdit,
  IconEye,
  IconTrash,
  IconDots,
  IconDownload,
  IconMail,
  IconCopy,
  IconStar,
  IconStarFilled,
  IconPlus,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import Link from "next/link";

export const EventList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showFilters, { toggle: toggleFilters }] = useDisclosure(false);

  const {
    getTableProps,
    getColumn,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData, isLoading },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      resource: "events",
      pagination: {
        pageSize: 10,
      },
      sorters: {
        initial: [
          {
            field: "event_date",
            order: "desc",
          },
        ],
      },
      filters: {
        permanent: [
          ...(searchTerm ? [{
            field: "title",
            operator: "contains" as const,
            value: searchTerm,
          }] : []),
          ...(statusFilter ? [{
            field: "status",
            operator: "eq" as const,
            value: statusFilter,
          }] : []),
          ...(typeFilter ? [{
            field: "event_type",
            operator: "eq" as const,
            value: typeFilter,
          }] : []),
        ],
      },
    },
  });

  const events = tableData?.data ?? [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "green";
      case "draft":
        return "gray";
      case "cancelled":
        return "red";
      case "completed":
        return "blue";
      default:
        return "gray";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "runway":
        return "🚶‍♀️";
      case "exhibition":
        return "🖼️";
      case "gala":
        return "🎭";
      case "popup":
        return "🛍️";
      case "workshop":
        return "🎨";
      case "tradeshow":
        return "🤝";
      case "conference":
        return "🎤";
      default:
        return "📅";
    }
  };

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <List
      headerButtons={
        <CreateButton>Create New Event</CreateButton>
      }
      title="Fashion Events"
    >
      <Stack spacing="lg">
        {/* Search and Filter Bar */}
        <Paper p="md" radius="md" withBorder>
          <Stack spacing="md">
            <Group position="apart">
              <TextInput
                placeholder="Search events by title..."
                icon={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                style={{ flex: 1, maxWidth: 400 }}
              />
              <Group>
                <Button
                  variant={showFilters ? "filled" : "light"}
                  leftIcon={<IconFilter size={16} />}
                  onClick={toggleFilters}
                >
                  Filters
                </Button>
                <Menu position="bottom-end" shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="light" size="lg">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconDownload size={14} />}>
                      Export to CSV
                    </Menu.Item>
                    <Menu.Item icon={<IconMail size={14} />}>
                      Send Email Blast
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>

            {/* Advanced Filters */}
            {showFilters && (
              <>
                <Divider />
                <Grid>
                  <Grid.Col span={4}>
                    <Select
                      label="Status"
                      placeholder="All statuses"
                      value={statusFilter}
                      onChange={setStatusFilter}
                      clearable
                      data={[
                        { value: "draft", label: "Draft" },
                        { value: "published", label: "Published" },
                        { value: "cancelled", label: "Cancelled" },
                        { value: "completed", label: "Completed" },
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Select
                      label="Event Type"
                      placeholder="All types"
                      value={typeFilter}
                      onChange={setTypeFilter}
                      clearable
                      data={[
                        { value: "runway", label: "Runway Show" },
                        { value: "exhibition", label: "Fashion Exhibition" },
                        { value: "gala", label: "Fashion Gala" },
                        { value: "popup", label: "Pop-up Show" },
                        { value: "workshop", label: "Design Workshop" },
                        { value: "tradeshow", label: "Trade Show" },
                        { value: "conference", label: "Fashion Conference" },
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <MultiSelect
                      label="Tags"
                      placeholder="Select tags"
                      data={[
                        { value: "runway", label: "Runway" },
                        { value: "haute-couture", label: "Haute Couture" },
                        { value: "sustainable", label: "Sustainable Fashion" },
                        { value: "emerging-designers", label: "Emerging Designers" },
                      ]}
                    />
                  </Grid.Col>
                </Grid>
              </>
            )}
          </Stack>
        </Paper>

        {/* Events Table */}
        <ScrollArea>
          <Table striped highlightOnHover {...getTableProps()}>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date & Location</th>
                <th>Attendance</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event: any) => (
                <tr key={event.id}>
                  <td>
                    <Group spacing="sm">
                      <Avatar size={40} radius="md" color="blue">
                        {getEventTypeIcon(event.event_type)}
                      </Avatar>
                      <div>
                        <Group spacing="xs">
                          <Text size="sm" weight={500}>
                            {event.title}
                          </Text>
                          {event.is_featured && (
                            <IconStarFilled size={14} style={{ color: "#fab005" }} />
                          )}
                        </Group>
                        <Text size="xs" color="dimmed">
                          {event.event_type ? event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1) : "Event"}
                        </Text>
                      </div>
                    </Group>
                  </td>
                  <td>
                    <Stack spacing={4}>
                      <Group spacing={4}>
                        <IconCalendarEvent size={14} color="#666" />
                        <Text size="xs">
                          <DateField value={event.event_date} format="MMM DD, YYYY" />
                          {event.event_time && ` at ${event.event_time}`}
                        </Text>
                      </Group>
                      <Group spacing={4}>
                        <IconMapPin size={14} color="#666" />
                        <Text size="xs" color="dimmed" lineClamp={1} style={{ maxWidth: 200 }}>
                          {event.location || "TBD"}
                        </Text>
                      </Group>
                    </Stack>
                  </td>
                  <td>
                    <Stack spacing={4} align="center">
                      <Text size="sm" weight={500}>
                        {event.current_attendance || 0} / {event.target_attendance || 0}
                      </Text>
                      <Badge 
                        size="xs" 
                        color={
                          event.current_attendance >= event.target_attendance * 0.9 
                            ? "red" 
                            : event.current_attendance >= event.target_attendance * 0.7 
                            ? "yellow" 
                            : "green"
                        }
                        variant="light"
                      >
                        {Math.round((event.current_attendance / event.target_attendance) * 100) || 0}% Full
                      </Badge>
                    </Stack>
                  </td>
                  <td>
                    <Group spacing={4}>
                      <IconCoin size={14} color="#666" />
                      <Text size="sm">
                        ${event.ticket_price ? event.ticket_price.toFixed(2) : "0.00"}
                      </Text>
                    </Group>
                  </td>
                  <td>
                    <Badge color={getStatusColor(event.status)} variant="light" size="sm">
                      {event.status}
                    </Badge>
                  </td>
                  <td>
                    <Group spacing={0} position="right">
                      <ShowButton hideText recordItemId={event.id} />
                      <EditButton hideText recordItemId={event.id} />
                      <Menu position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon variant="subtle">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item 
                            icon={<IconCopy size={14} />}
                            component={Link}
                            href={`/events/create?duplicate=${event.id}`}
                          >
                            Duplicate Event
                          </Menu.Item>
                          <Menu.Item 
                            icon={<IconMail size={14} />}
                          >
                            Send Invitations
                          </Menu.Item>
                          <Menu.Item 
                            icon={<IconDownload size={14} />}
                          >
                            Export Attendees
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item 
                            color="red" 
                            icon={<IconTrash size={14} />}
                          >
                            <DeleteButton hideText recordItemId={event.id} />
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>

        {/* Pagination */}
        {pageCount > 1 && (
          <Group position="center" mt="lg">
            <Button
              variant="default"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 1}
            >
              Previous
            </Button>
            <Text size="sm">
              Page {current} of {pageCount}
            </Text>
            <Button
              variant="default"
              onClick={() => setCurrent(current + 1)}
              disabled={current === pageCount}
            >
              Next
            </Button>
          </Group>
        )}
      </Stack>
    </List>
  );
};

const columns = [
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "event_date",
    accessorKey: "event_date",
    header: "Date",
  },
  {
    id: "location",
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    accessorKey: "id",
    header: "Actions",
  },
];