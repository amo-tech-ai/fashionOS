"use client";

import { useForm, useSelect } from "@refinedev/mantine";
import { Edit } from "@refinedev/mantine";
import { 
  TextInput, 
  Textarea, 
  NumberInput, 
  Select, 
  Group,
  Stack,
  Grid,
  Title,
  Paper,
  Switch,
  MultiSelect,
  Box,
  Loader,
  Center
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { 
  IconCalendarEvent, 
  IconMapPin, 
  IconUsers, 
  IconCoin,
  IconTag,
  IconBuilding,
  IconUser
} from "@tabler/icons-react";
import { useParams } from "next/navigation";

export const EventEdit = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    errors,
    refineCore: { queryResult, formLoading },
  } = useForm({
    refineCoreProps: {
      resource: "events",
      id: id,
      action: "edit",
    },
    initialValues: {
      title: "",
      description: "",
      event_date: null,
      event_time: "",
      location: "",
      venue_id: "",
      organizer_id: "",
      target_attendance: 0,
      current_attendance: 0,
      ticket_price: 0,
      status: "draft",
      event_type: "",
      is_featured: false,
      tags: [],
      image_url: "",
      registration_link: "",
    },
    transformValues: (values) => {
      return {
        ...values,
        event_date: values.event_date ? new Date(values.event_date).toISOString() : null,
        tags: values.tags || [],
      };
    },
    validate: {
      title: (value) => {
        if (!value || value.length < 3) {
          return "Title must be at least 3 characters";
        }
        return null;
      },
      location: (value) => (!value ? "Location is required" : null),
      event_date: (value) => (!value ? "Event date is required" : null),
      target_attendance: (value) => {
        if (!value || value < 1) {
          return "Target attendance must be at least 1";
        }
        return null;
      },
      ticket_price: (value) => {
        if (value < 0) {
          return "Ticket price cannot be negative";
        }
        return null;
      },
    },
  });

  // Venue select
  const { selectProps: venueSelectProps } = useSelect({
    resource: "venues",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: queryResult?.data?.data?.venue_id,
  });

  // Loading state
  if (formLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  const eventData = queryResult?.data?.data;

  return (
    <Edit 
      saveButtonProps={saveButtonProps}
      title={`Edit Event: ${eventData?.title || ''}`}
    >
      <form>
        <Stack spacing="xl">
          {/* Basic Information */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconCalendarEvent size={20} />
                Basic Information
              </Group>
            </Title>
            
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Event Title"
                  placeholder="Fashion Week 2025"
                  {...getInputProps("title")}
                  error={errors.title}
                  withAsterisk
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Describe your fashion event..."
                  minRows={4}
                  maxRows={8}
                  autosize
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
                    { value: "tradeshow", label: "Trade Show" },
                    { value: "conference", label: "Fashion Conference" },
                    { value: "other", label: "Other" },
                  ]}
                  searchable
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

              <Grid.Col span={12}>
                <TextInput
                  label="Event Image URL"
                  placeholder="https://example.com/event-image.jpg"
                  {...getInputProps("image_url")}
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
                <Select
                  label="Venue"
                  placeholder="Select a venue"
                  icon={<IconBuilding size={16} />}
                  searchable
                  nothingFound="No venues found"
                  {...venueSelectProps}
                  {...getInputProps("venue_id")}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  label="Location Address"
                  placeholder="123 Fashion Ave, Toronto, ON"
                  icon={<IconMapPin size={16} />}
                  {...getInputProps("location")}
                  error={errors.location}
                  withAsterisk
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DatePicker
                  label="Event Date"
                  placeholder="Select date"
                  value={getInputProps("event_date").value ? new Date(getInputProps("event_date").value) : null}
                  onChange={(value) => setFieldValue("event_date", value)}
                  error={errors.event_date}
                  withAsterisk
                  minDate={new Date()}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TimeInput
                  label="Start Time"
                  placeholder="19:00"
                  {...getInputProps("event_time")}
                  withAsterisk
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
                  label="Target Attendance"
                  placeholder="500"
                  min={1}
                  max={10000}
                  icon={<IconUsers size={16} />}
                  {...getInputProps("target_attendance")}
                  error={errors.target_attendance}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <NumberInput
                  label="Current Attendance"
                  placeholder="0"
                  min={0}
                  icon={<IconUsers size={16} />}
                  {...getInputProps("current_attendance")}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <NumberInput
                  label="Ticket Price (CAD)"
                  placeholder="150.00"
                  precision={2}
                  min={0}
                  max={10000}
                  icon={<IconCoin size={16} />}
                  {...getInputProps("ticket_price")}
                  error={errors.ticket_price}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Registration Link"
                  placeholder="https://tickets.example.com"
                  {...getInputProps("registration_link")}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Switch
                  label="Featured Event"
                  description="Display this event prominently on the homepage"
                  size="md"
                  {...getInputProps("is_featured", { type: "checkbox" })}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Tags & Categories */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconTag size={20} />
                Tags & Categories
              </Group>
            </Title>
            
            <MultiSelect
              label="Event Tags"
              placeholder="Add tags to help people find your event"
              data={[
                { value: "runway", label: "Runway" },
                { value: "haute-couture", label: "Haute Couture" },
                { value: "ready-to-wear", label: "Ready to Wear" },
                { value: "sustainable", label: "Sustainable Fashion" },
                { value: "emerging-designers", label: "Emerging Designers" },
                { value: "luxury", label: "Luxury Fashion" },
                { value: "streetwear", label: "Streetwear" },
                { value: "accessories", label: "Accessories" },
                { value: "menswear", label: "Menswear" },
                { value: "womenswear", label: "Womenswear" },
                { value: "kids", label: "Kids Fashion" },
                { value: "vintage", label: "Vintage" },
                { value: "avant-garde", label: "Avant Garde" },
                { value: "bridal", label: "Bridal" },
                { value: "swimwear", label: "Swimwear" },
                { value: "lingerie", label: "Lingerie" },
                { value: "footwear", label: "Footwear" },
                { value: "jewelry", label: "Jewelry" },
                { value: "tech-fashion", label: "Fashion Tech" },
                { value: "metaverse", label: "Metaverse Fashion" },
              ]}
              searchable
              creatable
              getCreateLabel={(query) => `+ Create "${query}"`}
              {...getInputProps("tags")}
            />
          </Paper>
        </Stack>
      </form>
    </Edit>
  );
};