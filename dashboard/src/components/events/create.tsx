"use client";

import { Create, useForm, useSelect } from "@refinedev/mantine";
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
  Stepper,
  Button,
  Box,
  Text,
  Badge,
  Alert,
  Timeline,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { 
  IconCalendarEvent, 
  IconMapPin, 
  IconUsers, 
  IconCoin,
  IconTag,
  IconBuilding,
  IconUser,
  IconPhoto,
  IconLink,
  IconInfoCircle,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const EventCreate = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    errors,
    values,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      title: "",
      description: "",
      event_date: null,
      event_time: "",
      location: "",
      venue_id: "",
      organizer_id: "",
      target_attendance: 100,
      current_attendance: 0,
      ticket_price: 0,
      status: "draft",
      event_type: "",
      is_featured: false,
      tags: [],
      image_url: "",
      registration_link: "",
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
    refineCoreProps: {
      resource: "events",
      redirect: "show",
      onMutationSuccess: () => {
        // Optional: Add notification here
      },
    },
  });

  // Venue select
  const { selectProps: venueSelectProps } = useSelect({
    resource: "venues",
    optionLabel: "name",
    optionValue: "id",
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return values.title && values.event_type && !errors.title;
      case 1:
        return values.event_date && values.location && !errors.location && !errors.event_date;
      case 2:
        return values.target_attendance > 0 && !errors.target_attendance && !errors.ticket_price;
      default:
        return true;
    }
  };

  return (
    <Create
      footerButtons={
        <Group justify="space-between" mt="xl">
          <Button 
            variant="default" 
            onClick={prevStep}
            disabled={active === 0}
          >
            Previous
          </Button>
          <Group>
            {active < 3 && (
              <Button 
                onClick={nextStep}
                disabled={!isStepValid(active)}
              >
                Next Step
              </Button>
            )}
            {active === 3 && (
              <>
                <Button 
                  variant="default"
                  onClick={() => {
                    setFieldValue("status", "draft");
                    saveButtonProps.onClick();
                  }}
                >
                  Save as Draft
                </Button>
                <Button 
                  {...saveButtonProps}
                  onClick={() => {
                    setFieldValue("status", "published");
                    saveButtonProps.onClick();
                  }}
                  loading={formLoading}
                >
                  Publish Event
                </Button>
              </>
            )}
          </Group>
        </Group>
      }
    >
      <form>
        <Stack spacing="xl">
          <Stepper active={active} onStepClick={setActive} size="sm">
            <Stepper.Step 
              label="Basic Info" 
              description="Event details"
              leftSection={<IconCalendarEvent size={18} />}
            >
              <Paper p="md" radius="md" withBorder mt="md">
                <Title order={4} mb="md">
                  Basic Event Information
                </Title>
                
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Event Title"
                      placeholder="Fashion Week 2025"
                      description="Choose a catchy title for your event"
                      {...getInputProps("title")}
                      error={errors.title}
                      withAsterisk
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Textarea
                      label="Description"
                      placeholder="Describe your fashion event..."
                      description="Provide details about what attendees can expect"
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
                      description="What kind of fashion event is this?"
                      data={[
                        { value: "runway", label: "🚶‍♀️ Runway Show" },
                        { value: "exhibition", label: "🖼️ Fashion Exhibition" },
                        { value: "gala", label: "🎭 Fashion Gala" },
                        { value: "popup", label: "🛍️ Pop-up Show" },
                        { value: "workshop", label: "🎨 Design Workshop" },
                        { value: "tradeshow", label: "🤝 Trade Show" },
                        { value: "conference", label: "🎤 Fashion Conference" },
                        { value: "other", label: "📅 Other" },
                      ]}
                      searchable
                      withAsterisk
                      {...getInputProps("event_type")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Event Image URL"
                      placeholder="https://example.com/event-image.jpg"
                      description="Add a banner image for your event"
                      leftSection={<IconPhoto size={16} />}
                      {...getInputProps("image_url")}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stepper.Step>

            <Stepper.Step 
              label="Location" 
              description="When & where"
              leftSection={<IconMapPin size={18} />}
            >
              <Paper p="md" radius="md" withBorder mt="md">
                <Title order={4} mb="md">
                  Location & Schedule
                </Title>
                
                <Grid>
                  <Grid.Col span={12}>
                    <Select
                      label="Venue"
                      placeholder="Select a venue"
                      description="Choose from available venues"
                      leftSection={<IconBuilding size={16} />}
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
                      description="Full address of the event location"
                      leftSection={<IconMapPin size={16} />}
                      {...getInputProps("location")}
                      error={errors.location}
                      withAsterisk
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <DatePicker
                      label="Event Date"
                      placeholder="Select date"
                      description="When will the event take place?"
                      value={values.event_date}
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
                      description="What time does the event start?"
                      {...getInputProps("event_time")}
                      withAsterisk
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stepper.Step>

            <Stepper.Step 
              label="Capacity" 
              description="Tickets & pricing"
              leftSection={<IconUsers size={18} />}
            >
              <Paper p="md" radius="md" withBorder mt="md">
                <Title order={4} mb="md">
                  Capacity & Pricing
                </Title>
                
                <Grid>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Target Attendance"
                      placeholder="500"
                      description="How many people can attend?"
                      min={1}
                      max={10000}
                      leftSection={<IconUsers size={16} />}
                      {...getInputProps("target_attendance")}
                      error={errors.target_attendance}
                      withAsterisk
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Ticket Price (CAD)"
                      placeholder="150.00"
                      description="Leave at 0 for free events"
                      precision={2}
                      min={0}
                      max={10000}
                      leftSection={<IconCoin size={16} />}
                      {...getInputProps("ticket_price")}
                      error={errors.ticket_price}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Registration Link"
                      placeholder="https://tickets.example.com"
                      description="Where can people register or buy tickets?"
                      leftSection={<IconLink size={16} />}
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
            </Stepper.Step>

            <Stepper.Step 
              label="Finalize" 
              description="Tags & review"
              leftSection={<IconTag size={18} />}
            >
              <Stack spacing="md" mt="md">
                <Paper p="md" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Tags & Categories
                  </Title>
                  
                  <MultiSelect
                    label="Event Tags"
                    placeholder="Add tags to help people find your event"
                    description="Select relevant tags or create new ones"
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
                    ]}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create "${query}"`}
                    {...getInputProps("tags")}
                  />
                </Paper>

                <Paper p="md" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Event Summary
                  </Title>
                  
                  <Timeline active={-1} bulletSize={24} lineWidth={2}>
                    <Timeline.Item
                      bullet={<IconCalendarEvent size={12} />}
                      title={values.title || "Untitled Event"}
                    >
                      <Text color="dimmed" size="sm">
                        {values.event_type ? values.event_type.charAt(0).toUpperCase() + values.event_type.slice(1) : "Event type not selected"}
                      </Text>
                    </Timeline.Item>

                    <Timeline.Item
                      bullet={<IconMapPin size={12} />}
                      title={values.location || "Location TBD"}
                    >
                      <Text color="dimmed" size="sm">
                        {values.event_date ? new Date(values.event_date).toLocaleDateString() : "Date TBD"} 
                        {values.event_time && ` at ${values.event_time}`}
                      </Text>
                    </Timeline.Item>

                    <Timeline.Item
                      bullet={<IconUsers size={12} />}
                      title={`${values.target_attendance} attendees`}
                    >
                      <Text color="dimmed" size="sm">
                        {values.ticket_price > 0 ? `$${values.ticket_price} per ticket` : "Free event"}
                      </Text>
                    </Timeline.Item>
                  </Timeline>

                  {values.is_featured && (
                    <Alert leftSection={<IconInfoCircle size={16} />} color="yellow" mt="md">
                      This event will be featured on the homepage
                    </Alert>
                  )}
                </Paper>
              </Stack>
            </Stepper.Step>

            <Stepper.Completed>
              <Alert leftSection={<IconCheck size={16} />} title="Event Created!" color="green" mt="md">
                Your event has been successfully created.
              </Alert>
            </Stepper.Completed>
          </Stepper>
        </Stack>
      </form>
    </Create>
  );
};