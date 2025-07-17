"use client";

import { Create, useForm, useSelect } from "@refinedev/mantine";
import { 
  TextInput, 
  Textarea, 
  Select, 
  Group,
  Stack,
  Grid,
  Title,
  Paper,
  FileInput,
  Switch,
  Text
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconArticle, IconPhoto, IconTag, IconCalendar } from "@tabler/icons-react";

export default function BlogPostCreate() {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    errors,
  } = useForm({
    initialValues: {
      title: "",
      content: "",
      categoryId: "",
      status: "draft",
      featured_image: "",
      excerpt: "",
      author: "",
      publish_date: new Date(),
      is_featured: false,
      tags: [],
    },
    validate: {
      title: (value) => (value.length < 3 ? "Title must be at least 3 characters" : null),
      content: (value) => (!value ? "Content is required" : null),
      categoryId: (value) => (!value ? "Category is required" : null),
    },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <Stack spacing="xl">
          {/* Basic Information */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconArticle size={20} />
                Article Details
              </Group>
            </Title>
            
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Article Title"
                  placeholder="Enter your blog post title"
                  {...getInputProps("title")}
                  error={errors.title}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Content"
                  placeholder="Write your article content..."
                  minRows={10}
                  autosize
                  maxRows={20}
                  {...getInputProps("content")}
                  error={errors.content}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Excerpt"
                  placeholder="Brief summary of the article (optional)"
                  minRows={2}
                  maxRows={4}
                  {...getInputProps("excerpt")}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Publishing Options */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconTag size={20} />
                Publishing Options
              </Group>
            </Title>
            
            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="Category"
                  placeholder="Select a category"
                  {...categorySelectProps}
                  {...getInputProps("categoryId")}
                  error={errors.categoryId}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  data={[
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                    { value: "scheduled", label: "Scheduled" },
                  ]}
                  {...getInputProps("status")}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Author"
                  placeholder="Author name"
                  {...getInputProps("author")}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DatePicker
                  label="Publish Date"
                  placeholder="Select publish date"
                  icon={<IconCalendar size={16} />}
                  {...getInputProps("publish_date")}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Switch
                  label="Featured Post"
                  description="Display this post prominently on the homepage"
                  {...getInputProps("is_featured", { type: "checkbox" })}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Media */}
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group spacing="xs">
                <IconPhoto size={20} />
                Featured Image
              </Group>
            </Title>
            
            <FileInput
              label="Upload Image"
              accept="image/*"
              icon={<IconPhoto size={16} />}
              onChange={(file) => {
                // Handle file upload logic here
                if (file) {
                  // In real app, upload to storage and get URL
                  setFieldValue("featured_image", file.name);
                }
              }}
            />
            <Text size="xs" color="dimmed" mt={5}>
              Recommended size: 1200x630px (16:9 ratio)
            </Text>
          </Paper>
        </Stack>
      </form>
    </Create>
  );
}