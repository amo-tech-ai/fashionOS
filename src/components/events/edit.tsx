"use client";

import { Edit } from "@refinedev/mantine";
import { 
  TextInput, 
  Textarea, 
  NumberInput, 
  Select, 
  DateInput,
  TimeInput,
  Group,
  Stack,
  Grid,
  Title,
  Text,
  Paper,
  Divider,
  Switch,
  MultiSelect,
  Badge,
  Box
} from "@mantine/core";
import { useForm } from "@refinedev/mantine";
import { IconCalendarEvent, IconMapPin, IconUsers, IconCoin, IconPhoto } from "@tabler/icons-react";

export const EventEdit = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
    errors,
  } = useForm({
    initialValues: {
      title: "",
      description: "",
      location: "",
      date: new Date(),
      time: "",
      capacity: 0,
      ticket_price: 0,
      is_featured: false,
      event_type: "",
      status: "draft",
      organizer_id: "",
      venue_id: "",
      designers: [],
      models: [],
      sponsors: [],
      tags: [],
      image_url: "",
    },
    validate: {
      title: (value) => (value.length < 3 ? "Title must be at least 3 characters" : null),
      location: (value) => (!value ? "Location is required" : null),
      capacity: (value) => (value < 1 ? "Capacity must be at least 1" : null),
      ticket_price: (value) => (value < 0 ? "Price cannot be negative" : null),
    },
  });

  const eventData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <Stack spacing="xl">
          {/* Basic Information */}
          <Paper p="md" radius="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={4}>
                <Group spacing="xs">
                  <IconCalendarEvent size={20} />
                  Basic Information
                </Group>
              </Title>
              <Badge color={eventData?.status === 'published' ? 'green' : 'gray'}>
                {eventData?.status || 'Draft'}
              </Badge>
            </Group>
            
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Event Title"
                  placeholder="Fashion Week 2025"
                  {...getInputProps("title")}
                  error={errors.title}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Describe your fashion event..."
                  minRows={4}
                  {...getInputProps("description")}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Event Type"
                  placeholder="Select type"
                  data={[
                    { value: "runway", label: "Runway Show" },
                    { value: "exhibition", label: "Fashion Exhibition" },
                    { value: "gala", label: "Fashion Gala" },
                    { value: "popup", label: "Pop-up Show" },
                    { value: "workshop", label: "Design Workshop" },
                  ]}
                  {...getInputProps("event_type")}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  data={[
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "cancelled", label: "Cancelled" },
                    { value: "completed", label: "Completed" },
                  ]}
                  {...getInputProps("status")}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Location & Schedule */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconMapPin size={20} />
                Location & Schedule
              </Group>
            </Title>
            
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Venue Location"
                  placeholder="123 Fashion Ave, Toronto, ON"
                  {...getInputProps("location")}
                  error={errors.location}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateInput
                  label="Event Date"
                  placeholder="Select date"
                  {...getInputProps("date")}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TimeInput
                  label="Start Time"
                  placeholder="19:00"
                  {...getInputProps("time")}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Select
                  label="Venue"
                  placeholder="Select venue"
                  data={[
                    { value: "1", label: "Toronto Convention Centre" },
                    { value: "2", label: "Royal Ontario Museum" },
                    { value: "3", label: "The Carlu" },
                    { value: "4", label: "Fairmont Royal York" },
                  ]}
                  {...getInputProps("venue_id")}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Capacity & Pricing */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconUsers size={20} />
                Capacity & Pricing
              </Group>
            </Title>
            
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  label="Maximum Capacity"
                  placeholder="500"
                  min={1}
                  {...getInputProps("capacity")}
                  error={errors.capacity}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <NumberInput
                  label="Ticket Price (CAD)"
                  placeholder="150.00"
                  precision={2}
                  min={0}
                  icon={<IconCoin size={16} />}
                  {...getInputProps("ticket_price")}
                  error={errors.ticket_price}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Switch
                  label="Featured Event"
                  description="Display this event prominently on the homepage"
                  {...getInputProps("is_featured", { type: "checkbox" })}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Participants */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconUsers size={20} />
                Participants
              </Group>
            </Title>
            
            <Stack>
              <MultiSelect
                label="Featured Designers"
                placeholder="Select designers"
                data={[
                  { value: "1", label: "Alexander Wang" },
                  { value: "2", label: "Vivienne Westwood" },
                  { value: "3", label: "Marc Jacobs" },
                  { value: "4", label: "Stella McCartney" },
                ]}
                {...getInputProps("designers")}
              />
              
              <MultiSelect
                label="Models"
                placeholder="Select models"
                data={[
                  { value: "1", label: "Gigi Hadid" },
                  { value: "2", label: "Kendall Jenner" },
                  { value: "3", label: "Bella Hadid" },
                  { value: "4", label: "Naomi Campbell" },
                ]}
                {...getInputProps("models")}
              />
              
              <MultiSelect
                label="Sponsors"
                placeholder="Select sponsors"
                data={[
                  { value: "1", label: "Chanel" },
                  { value: "2", label: "Louis Vuitton" },
                  { value: "3", label: "Gucci" },
                  { value: "4", label: "Prada" },
                ]}
                {...getInputProps("sponsors")}
              />
            </Stack>
          </Paper>

          {/* Media & Tags */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconPhoto size={20} />
                Media & Tags
              </Group>
            </Title>
            
            <Stack>
              <TextInput
                label="Cover Image URL"
                placeholder="https://example.com/event-cover.jpg"
                {...getInputProps("image_url")}
              />
              
              <MultiSelect
                label="Event Tags"
                placeholder="Add tags"
                data={[
                  { value: "runway", label: "Runway" },
                  { value: "haute-couture", label: "Haute Couture" },
                  { value: "ready-to-wear", label: "Ready to Wear" },
                  { value: "sustainable", label: "Sustainable Fashion" },
                  { value: "emerging-designers", label: "Emerging Designers" },
                ]}
                searchable
                creatable
                {...getInputProps("tags")}
              />
            </Stack>
          </Paper>
        </Stack>
      </form>
    </Edit>
  );
};
