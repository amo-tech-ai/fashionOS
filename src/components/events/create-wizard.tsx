"use client";

import { Create, useStepsForm } from "@refinedev/mantine";
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
  Stepper,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import {
  IconCalendarEvent,
  IconMapPin,
  IconUsers,
  IconCoin,
  IconTag,
  IconCheck,
} from "@tabler/icons-react";

export const EventCreateWizard = () => {
  const {
    current,
    steps,
    form: {
      getInputProps,
      setFieldValue,
      errors,
      values,
    },
    gotoStep,
    saveButtonProps,
  } = useStepsForm({
    initialValues: {
      // Step 1 - Basic Info
      title: "",
      description: "",
      event_type: "runway",
      status: "draft",
      
      // Step 2 - Location & Schedule
      location: "",
      date: new Date(),
      time: "",
      
      // Step 3 - Capacity & Pricing
      capacity: 100,
      ticket_price: 0,
      is_featured: false,
      
      // Step 4 - Tags & Settings
      organizer_id: "",
      venue_id: "",
      tags: [],
    },
    validate: (values) => {
      switch (current) {
        case 0:
          return {
            title: values.title.length < 3 ? "Title must be at least 3 characters" : null,
            description: !values.description ? "Description is required" : null,
          };
        case 1:
          return {
            location: !values.location ? "Location is required" : null,
            time: !values.time ? "Time is required" : null,
          };
        case 2:
          return {
            capacity: values.capacity < 1 ? "Capacity must be at least 1" : null,
            ticket_price: values.ticket_price < 0 ? "Price cannot be negative" : null,
          };
        default:
          return {};
      }
    },
    stepsProps: {
      totalSteps: 4,
      initialStep: 0,
    },
  });

  const stepTitles = [
    "Basic Information",
    "Location & Schedule",
    "Capacity & Pricing", 
    "Tags & Settings"
  ];

  return (
    <Create
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
      title="Create Event"
      footerButtons={
        <Group position="apart" mt="xl">
          <Button
            variant="default"
            onClick={() => gotoStep(current - 1)}
            disabled={current === 0}
          >
            Previous
          </Button>
          {current < steps.length - 1 ? (
            <Button onClick={() => gotoStep(current + 1)}>
              Next
            </Button>
          ) : (
            <Button {...saveButtonProps} leftIcon={<IconCheck size={16} />}>
              Create Event
            </Button>
          )}
        </Group>
      }
    >
      <Stack spacing="xl">
        <Stepper active={current} onStepClick={gotoStep} breakpoint="sm">
          {stepTitles.map((title, index) => (
            <Stepper.Step
              key={index}
              label={title}
              description={`Step ${index + 1}`}
            />
          ))}
          <Stepper.Completed>
            <Text size="sm" color="dimmed" align="center">
              Review your event details and click "Create Event"
            </Text>
          </Stepper.Completed>
        </Stepper>

        <Paper p="md" radius="md" withBorder style={{ position: "relative" }}>
          <LoadingOverlay visible={false} />
          
          {/* Step 1: Basic Information */}
          {current === 0 && (
            <>
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
                    placeholder="Toronto Fashion Week 2025"
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
                    error={errors.description}
                    required
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
                    ]}
                    {...getInputProps("status")}
                  />
                </Grid.Col>
              </Grid>
            </>
          )}

          {/* Step 2: Location & Schedule */}
          {current === 1 && (
            <>
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
                  <DatePicker
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
                    error={errors.time}
                    required
                  />
                </Grid.Col>
              </Grid>
            </>
          )}

          {/* Step 3: Capacity & Pricing */}
          {current === 2 && (
            <>
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
            </>
          )}

          {/* Step 4: Tags & Settings */}
          {current === 3 && (
            <>
              <Title order={4} mb="md">
                <Group spacing="xs">
                  <IconTag size={20} />
                  Tags & Categories
                </Group>
              </Title>
              
              <Stack spacing="md">
                <MultiSelect
                  label="Event Tags"
                  placeholder="Add tags"
                  data={[
                    { value: "runway", label: "Runway" },
                    { value: "haute-couture", label: "Haute Couture" },
                    { value: "ready-to-wear", label: "Ready to Wear" },
                    { value: "sustainable", label: "Sustainable Fashion" },
                    { value: "emerging-designers", label: "Emerging Designers" },
                    { value: "luxury", label: "Luxury Fashion" },
                    { value: "streetwear", label: "Streetwear" },
                    { value: "accessories", label: "Accessories" },
                  ]}
                  searchable
                  creatable
                  {...getInputProps("tags")}
                />
                
                {/* Event Summary */}
                <Paper p="md" radius="sm" withBorder bg="gray.0">
                  <Title order={5} mb="sm">Event Summary</Title>
                  <Stack spacing="xs">
                    <Text size="sm">
                      <strong>Title:</strong> {values.title || "Not set"}
                    </Text>
                    <Text size="sm">
                      <strong>Type:</strong> {values.event_type}
                    </Text>
                    <Text size="sm">
                      <strong>Location:</strong> {values.location || "Not set"}
                    </Text>
                    <Text size="sm">
                      <strong>Date:</strong> {values.date?.toLocaleDateString() || "Not set"}
                    </Text>
                    <Text size="sm">
                      <strong>Capacity:</strong> {values.capacity} guests
                    </Text>
                    <Text size="sm">
                      <strong>Price:</strong> ${values.ticket_price.toFixed(2)} CAD
                    </Text>
                  </Stack>
                </Paper>
              </Stack>
            </>
          )}
        </Paper>
      </Stack>
    </Create>
  );
};
