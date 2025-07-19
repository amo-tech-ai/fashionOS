"use client";

import React from 'react';
import { Grid, Card, Title, Text, Group, Badge, Box, RingProgress, Progress, Stack, Table, Avatar } from "@mantine/core";
import { IconTrendingUp, IconUsers, IconTargetArrow, IconCurrencyDollar, IconChartBar, IconCalendar } from "@tabler/icons";
import { useList } from "@refinedev/core";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, FunnelChart, Funnel, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// ROI Metric Card
const ROIMetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Group position="apart">
      <div>
        <Text size="xs" transform="uppercase" weight={700} color="dimmed">
          {title}
        </Text>
        <Title order={2} mt="xs">{value}</Title>
        {subtitle && <Text size="sm" color="dimmed" mt="xs">{subtitle}</Text>}
        {trend && (
          <Text size="sm" color={trend > 0 ? "green" : "red"} mt="xs">
            {trend > 0 ? "+" : ""}{trend}% vs last event
          </Text>
        )}
      </div>
      <Box sx={(theme) => ({
        backgroundColor: theme.colors[color][0],
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
      })}>
        <Icon size={24} color={color} />
      </Box>
    </Group>
  </Card>
);

// Lead Quality Distribution
const LeadQualityWidget = ({ leadData }) => {
  const data = [
    { name: 'Hot', value: leadData.hot, color: '#fa5252' },
    { name: 'Warm', value: leadData.warm, color: '#fab005' },
    { name: 'Cold', value: leadData.cold, color: '#228be6' },
  ];

  const total = leadData.hot + leadData.warm + leadData.cold;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Lead Quality Distribution</Title>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ width: '45%' }}>
          <RingProgress
            size={160}
            thickness={20}
            sections={data.map(item => ({
              value: (item.value / total) * 100,
              color: item.color
            }))}
            label={
              <Text size="xl" align="center" weight={700}>
                {total}
                <Text size="sm" color="dimmed" weight={400}>
                  Total Leads
                </Text>
              </Text>
            }
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          {data.map((item) => (
            <Group key={item.name} position="apart" mb="sm">
              <Group>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Text size="sm">{item.name} Leads</Text>
              </Group>
              <Badge variant="light" color={item.color.replace('#', '')}>
                {item.value}
              </Badge>
            </Group>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

// Conversion Funnel
const ConversionFunnel = ({ funnelData }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Lead Conversion Funnel</Title>
      <ResponsiveContainer width="100%" height={300}>
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={funnelData}
            isAnimationActive
          >
            <LabelList position="center" fill="#fff" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </Card>
  );
};

// Event Performance Table
const EventPerformanceTable = ({ events }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Event Performance</Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Leads</th>
            <th>Conversions</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>
                <Text size="sm" weight={500}>{event.name}</Text>
              </td>
              <td>
                <Text size="sm" color="dimmed">{event.date}</Text>
              </td>
              <td>
                <Badge color="blue" variant="light">{event.leads}</Badge>
              </td>
              <td>
                <Badge color="green" variant="light">{event.conversions}</Badge>
              </td>
              <td>
                <Text size="sm" weight={700} color={event.roi > 1 ? "green" : "red"}>
                  {event.roi}x
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const SponsorDashboard = () => {
  // Mock data for demonstration
  const sponsorMetrics = {
    totalInvestment: 50000,
    totalLeads: 342,
    conversions: 23,
    roi: 4.2,
    averageDealSize: 8500
  };

  const leadData = {
    hot: 23,
    warm: 145,
    cold: 174
  };

  const leadTimelineData = [
    { day: 'Day 1', leads: 45, conversions: 2 },
    { day: 'Day 2', leads: 52, conversions: 3 },
    { day: 'Day 3', leads: 48, conversions: 2 },
    { day: 'Day 4', leads: 70, conversions: 5 },
    { day: 'Day 5', leads: 65, conversions: 4 },
    { day: 'Day 6', leads: 62, conversions: 7 },
  ];

  const funnelData = [
    { name: 'Event Attendees', value: 1500, fill: '#8884d8' },
    { name: 'Booth Visitors', value: 342, fill: '#83a6ed' },
    { name: 'Qualified Leads', value: 168, fill: '#8dd1e1' },
    { name: 'Opportunities', value: 45, fill: '#82ca9d' },
    { name: 'Conversions', value: 23, fill: '#a4de6c' },
  ];

  const eventPerformance = [
    { name: 'Fashion Week 2025', date: 'Mar 15', leads: 85, conversions: 12, roi: 5.2 },
    { name: 'Designer Showcase', date: 'Feb 20', leads: 45, conversions: 5, roi: 3.1 },
    { name: 'Trade Show', date: 'Jan 30', leads: 120, conversions: 8, roi: 2.8 },
    { name: 'VIP Preview', date: 'Jan 15', leads: 35, conversions: 3, roi: 4.5 },
  ];

  const upcomingOpportunities = [
    { name: 'Summer Fashion Gala', date: 'Apr 20', expectedAttendance: 500, category: 'Premium' },
    { name: 'Eco Fashion Summit', date: 'May 5', expectedAttendance: 300, category: 'Sustainable' },
    { name: 'Fall Collection Launch', date: 'Jun 15', expectedAttendance: 400, category: 'Seasonal' },
  ];

  return (
    <Box p="md">
      <Title order={2} mb="xl">Sponsor Dashboard</Title>
      
      {/* ROI Overview Cards */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={3}>
          <ROIMetricCard
            title="Total Investment"
            value={`$${(sponsorMetrics.totalInvestment / 1000).toFixed(0)}K`}
            icon={IconCurrencyDollar}
            color="violet"
          />
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <ROIMetricCard
            title="Total Leads"
            value={sponsorMetrics.totalLeads}
            subtitle="All events"
            icon={IconUsers}
            color="blue"
            trend={15}
          />
        </Grid.Col>        
        <Grid.Col xs={12} sm={6} md={3}>
          <ROIMetricCard
            title="Conversions"
            value={sponsorMetrics.conversions}
            subtitle="Qualified leads"
            icon={IconTargetArrow}
            color="green"
            trend={23}
          />
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <ROIMetricCard
            title="Average ROI"
            value="4.2x"
            subtitle="Across all events"
            icon={IconChartBar}
            color="orange"
            trend={8}
          />
        </Grid.Col>
      </Grid>

      {/* Additional sections would go here */}
      {/* For now, let's close the component properly */}
    </Box>
  );
};
