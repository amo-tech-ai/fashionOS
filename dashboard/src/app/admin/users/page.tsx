"use client";

import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Group,
  Stack,
  Badge,
  Button,
  Table,
  ActionIcon,
  TextInput,
  Select,
  Avatar,
  Divider,
} from "@mantine/core";
import {
  IconUsers,
  IconSearch,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMail,
  IconShield,
  IconBan,
} from "@tabler/icons-react";

export default function AdminUsersPage() {
  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@fashionweek.com",
      role: "organizer",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      eventsCreated: 12,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@luxurybrands.com",
      role: "sponsor",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      sponsorships: 5,
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@modelagency.com",
      role: "model",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bookings: 23,
    },
    {
      id: 4,
      name: "Alexander Petrov",
      email: "alex@couture.com",
      role: "designer",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander",
      collections: 4,
    },
    {
      id: 5,
      name: "Isabella Martinez",
      email: "isabella@grandvenue.com",
      role: "venue",
      status: "suspended",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
      venues: 2,
    },
  ];

  const roleColors: Record<string, string> = {
    admin: "red",
    organizer: "blue",
    sponsor: "green",
    model: "pink",
    designer: "purple",
    venue: "orange",
    vendor: "cyan",
    media: "yellow",
  };

  return (
    <Container size="xl" py="lg">
      <Group position="apart" mb="xl">
        <div>
          <Title order={2}>User Management</Title>
          <Text color="dimmed" size="sm">
            Manage users, roles, and permissions
          </Text>
        </div>
        <Button leftIcon={<IconPlus size={16} />} color="blue">
          Add User
        </Button>
      </Group>

      {/* Stats Cards */}
      <Grid gutter="lg" mb="xl">
        <Grid.Col span={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={600} size="xs">
                  Total Users
                </Text>
                <Text weight={700} size="xl">
                  1,284
                </Text>
              </div>
              <IconUsers size={32} color="#228be6" stroke={1.5} />
            </Group>
            <Text color="dimmed" size="xs" mt="xs">
              +12% from last month
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={600} size="xs">
                  Active Users
                </Text>
                <Text weight={700} size="xl">
                  1,156
                </Text>
              </div>
              <IconShield size={32} color="#40c057" stroke={1.5} />
            </Group>
            <Text color="dimmed" size="xs" mt="xs">
              90% of total users
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={600} size="xs">
                  New This Month
                </Text>
                <Text weight={700} size="xl">
                  142
                </Text>
              </div>
              <IconPlus size={32} color="#9c4dff" stroke={1.5} />
            </Group>
            <Text color="dimmed" size="xs" mt="xs">
              Mostly models & designers
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text color="dimmed" transform="uppercase" weight={600} size="xs">
                  Suspended
                </Text>
                <Text weight={700} size="xl">
                  23
                </Text>
              </div>
              <IconBan size={32} color="#fa5252" stroke={1.5} />
            </Group>
            <Text color="dimmed" size="xs" mt="xs">
              Pending review
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Filters */}
      <Card shadow="sm" p="md" radius="md" withBorder mb="xl">
        <Group>
          <TextInput
            placeholder="Search users..."
            icon={<IconSearch size={16} />}
            style={{ flex: 1, maxWidth: 300 }}
          />
          <Select
            placeholder="Filter by role"
            data={[
              { value: "all", label: "All Roles" },
              { value: "admin", label: "Admin" },
              { value: "organizer", label: "Organizer" },
              { value: "sponsor", label: "Sponsor" },
              { value: "model", label: "Model" },
              { value: "designer", label: "Designer" },
              { value: "venue", label: "Venue Manager" },
              { value: "vendor", label: "Vendor" },
              { value: "media", label: "Media" },
            ]}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Status"
            data={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspended" },
              { value: "pending", label: "Pending" },
            ]}
            style={{ width: 150 }}
          />
        </Group>
      </Card>

      {/* Users Table */}
      <Card shadow="sm" radius="md" withBorder>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Group spacing="sm">
                    <Avatar src={user.avatar} size={40} radius="xl" />
                    <div>
                      <Text size="sm" weight={500}>
                        {user.name}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                </td>
                <td>
                  <Badge color={roleColors[user.role]} variant="light">
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Badge
                    color={user.status === "active" ? "green" : "red"}
                    variant="light"
                  >
                    {user.status}
                  </Badge>
                </td>
                <td>
                  <Text size="sm" color="dimmed">
                    {user.eventsCreated && `${user.eventsCreated} events`}
                    {user.sponsorships && `${user.sponsorships} sponsorships`}
                    {user.bookings && `${user.bookings} bookings`}
                    {user.collections && `${user.collections} collections`}
                    {user.venues && `${user.venues} venues`}
                  </Text>
                </td>
                <td>
                  <Group spacing={0} position="right">
                    <ActionIcon color="blue" variant="subtle">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon color="gray" variant="subtle">
                      <IconMail size={16} />
                    </ActionIcon>
                    <ActionIcon color="red" variant="subtle">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Divider my="sm" />
        
        <Group position="apart" p="md">
          <Text size="sm" color="dimmed">
            Showing 5 of 1,284 users
          </Text>
          <Group spacing="xs">
            <Button variant="default" size="sm">
              Previous
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="filled" size="sm">
              2
            </Button>
            <Button variant="default" size="sm">
              3
            </Button>
            <Button variant="default" size="sm">
              Next
            </Button>
          </Group>
        </Group>
      </Card>
    </Container>
  );
}
