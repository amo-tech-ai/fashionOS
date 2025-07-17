 (
        <Box key={index} sx={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: 8 }}>
          <Image
            src={image.url}
            alt={image.caption}
            fit="cover"
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </Box>
      ))}
      <Card 
        shadow="sm" 
        p="lg" 
        radius="md" 
        withBorder 
        sx={{ 
          border: '2px dashed #dee2e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#ec4899'
          }
        }}
      >
        <Stack align="center" spacing="xs">
          <IconPhoto size={24} color="#ec4899" />
          <Text size="xs" color="dimmed">Add Photo</Text>
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

// Earnings Overview Component
const EarningsOverview = ({ earnings }) => {
  const data = [
    { name: 'Runway', value: earnings.runway, color: '#8b5cf6' },
    { name: 'Editorial', value: earnings.editorial, color: '#ec4899' },
    { name: 'Commercial', value: earnings.commercial, color: '#10b981' },
    { name: 'Other', value: earnings.other, color: '#f59e0b' }
  ];

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Earnings by Category</Title>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <SimpleGrid cols={2} mt="md">
        {data.map((item) => (
          <Group key={item.name} spacing="xs">
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
            <Text size="xs">{item.name}: ${item.value}</Text>
          </Group>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export const ModelDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for demonstration
  const modelStats = {
    totalShows: 45,
    designersWorked: 23,
    portfolioPhotos: 156,
    totalEarnings: 35000,
    averageRating: 4.8,
    upcomingJobs: 4
  };

  const upcomingBookings = [
    {
      id: 1,
      event: "Fashion Week Runway",
      designer: "Derek Designer",
      date: "Mar 15, 2025",
      location: "Milan, Italy",
      payment: 2500,
      status: "confirmed"
    },
    {
      id: 2,
      event: "Editorial Shoot",
      designer: "Vogue Italia",
      date: "Mar 18, 2025",
      location: "Rome Studio",
      payment: 1800,
      status: "confirmed"
    },
    {
      id: 3,
      event: "Designer Preview",
      designer: "New York Fashion",
      date: "Mar 22, 2025",
      location: "NYC",
      payment: 2000,
      status: "pending"
    }
  ];

  const portfolioImages = [
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", caption: "Runway Show" },
    { url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400", caption: "Editorial" },
    { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", caption: "Campaign" },
    { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", caption: "Headshot" },
    { url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400", caption: "Commercial" },
    { url: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400", caption: "Fashion" }
  ];

  const earningsData = {
    runway: 15000,
    editorial: 8000,
    commercial: 10000,
    other: 2000
  };

  const monthlyEarnings = [
    { month: 'Jan', earnings: 5500 },
    { month: 'Feb', earnings: 6200 },
    { month: 'Mar', earnings: 5800 },
    { month: 'Apr', earnings: 7100 },
    { month: 'May', earnings: 6500 },
    { month: 'Jun', earnings: 5900 }
  ];

  const measurements = {
    height: "5'10\" (178cm)",
    bust: "34\"",
    waist: "26\"",
    hips: "36\"",
    dress: "4 US",
    shoes: "8.5 US",
    hair: "Brown",
    eyes: "Green"
  };

  return (
    <Box p="md">
      <Group position="apart" mb="xl">
        <Title order={2}>Model Hub</Title>
        <Group>
          <Button variant="light" leftIcon={<IconFileText size={16} />}>
            Comp Card
          </Button>
          <Button leftIcon={<IconCalendarEvent size={16} />} color="pink">
            Book Me
          </Button>
        </Group>
      </Group>
      
      {/* Career Stats */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="violet">
                <IconHanger size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Shows</Text>
                <Text size="xl" weight={700}>{modelStats.totalShows}</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="blue">
                <IconUser size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Designers</Text>
                <Text size="xl" weight={700}>{modelStats.designersWorked}</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="pink">
                <IconCamera size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Photos</Text>
                <Text size="xl" weight={700}>{modelStats.portfolioPhotos}</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="green">
                <IconCurrencyDollar size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Earnings</Text>
                <Text size="xl" weight={700}>${(modelStats.totalEarnings / 1000).toFixed(0)}K</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="yellow">
                <IconStar size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Rating</Text>
                <Text size="xl" weight={700}>{modelStats.averageRating}</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={2}>
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size="lg" variant="light" color="teal">
                <IconCalendarStats size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">Upcoming</Text>
                <Text size="xl" weight={700}>{modelStats.upcomingJobs}</Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onTabChange={setActiveTab} color="pink">
        <Tabs.List>
          <Tabs.Tab value="overview" icon={<IconChartBar size={14} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="calendar" icon={<IconCalendarEvent size={14} />}>
            Calendar
          </Tabs.Tab>
          <Tabs.Tab value="portfolio" icon={<IconPhoto size={14} />}>
            Portfolio
          </Tabs.Tab>
          <Tabs.Tab value="profile" icon={<IconUser size={14} />}>
            Profile
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="xl">
          <Grid>
            {/* Booking Calendar */}
            <Grid.Col xs={12} md={8}>
              <Grid>
                {/* Upcoming Bookings */}
                <Grid.Col span={12}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Group position="apart" mb="md">
                      <Title order={4}>Upcoming Bookings</Title>
                      <Text size="sm" color="dimmed">View all</Text>
                    </Group>
                    <SimpleGrid cols={3} spacing="md">
                      {upcomingBookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </SimpleGrid>
                  </Card>
                </Grid.Col>

                {/* Monthly Earnings Chart */}
                <Grid.Col span={12}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={4} mb="md">Monthly Earnings</Title>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={monthlyEarnings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="#ec4899" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            {/* Right Sidebar */}
            <Grid.Col xs={12} md={4}>
              <Stack spacing="lg">
                {/* Earnings Overview */}
                <EarningsOverview earnings={earningsData} />

                {/* Availability */}
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Title order={4} mb="md">Availability</Title>
                  <Stack spacing="sm">
                    <Group position="apart">
                      <Text size="sm">Next Available</Text>
                      <Badge color="green">Mar 25</Badge>
                    </Group>
                    <Group position="apart">
                      <Text size="sm">Travel Ready</Text>
                      <Badge color="blue">Yes</Badge>
                    </Group>
                    <Group position="apart">
                      <Text size="sm">Passport</Text>
                      <Badge color="gray">Valid</Badge>
                    </Group>
                  </Stack>
                </Card>

                {/* Recent Reviews */}
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Title order={4} mb="md">Recent Reviews</Title>
                  <Stack spacing="md">
                    <Box>
                      <Group position="apart" mb="xs">
                        <Text size="sm" weight={500}>Derek Designer</Text>
                        <Rating value={5} readOnly size="xs" />
                      </Group>
                      <Text size="xs" color="dimmed">
                        "Professional, punctual, and amazing on the runway!"
                      </Text>
                    </Box>
                    <Box>
                      <Group position="apart" mb="xs">
                        <Text size="sm" weight={500}>Vogue Italia</Text>
                        <Rating value={5} readOnly size="xs" />
                      </Group>
                      <Text size="xs" color="dimmed">
                        "Excellent model, great to work with."
                      </Text>
                    </Box>
                  </Stack>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="calendar" pt="xl">
          <Grid>
            <Grid.Col xs={12} md={8}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Booking Calendar</Title>
                <Calendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  fullWidth
                  size="md"
                  styles={{
                    cell: {
                      border: '1px solid #e9ecef',
                    },
                    day: {
                      borderRadius: 0,
                      height: 70,
                      fontSize: 14,
                    },
                    weekday: {
                      fontSize: 14,
                      color: '#868e96',
                    },
                  }}
                  renderDay={(date) => {
                    const day = date.getDate();
                    const hasBooking = [15, 18, 22].includes(day);
                    
                    return (
                      <Box sx={{ position: 'relative', height: '100%' }}>
                        <Text>{day}</Text>
                        {hasBooking && (
                          <Badge
                            size="xs"
                            color="pink"
                            variant="filled"
                            sx={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)' }}
                          >
                            Booked
                          </Badge>
                        )}
                      </Box>
                    );
                  }}
                />
              </Card>
            </Grid.Col>

            <Grid.Col xs={12} md={4}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Selected Date</Title>
                <Text size="lg" weight={500} mb="md">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
                <Button fullWidth color="pink">
                  Mark as Available
                </Button>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="portfolio" pt="xl">
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={4}>Portfolio Gallery</Title>
              <Button size="xs" variant="light" leftIcon={<IconDownload size={14} />}>
                Download All
              </Button>
            </Group>
            <PortfolioGallery images={portfolioImages} />
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="profile" pt="xl">
          <Grid>
            <Grid.Col xs={12} md={6}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Measurements</Title>
                <Table>
                  <tbody>
                    {Object.entries(measurements).map(([key, value]) => (
                      <tr key={key}>
                        <td><Text size="sm" transform="capitalize">{key}:</Text></td>
                        <td><Text size="sm" weight={500}>{value}</Text></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Experience & Skills</Title>
                <Stack spacing="md">
                  <Box>
                    <Text size="sm" weight={500} mb="xs">Specialties</Text>
                    <Group spacing="xs">
                      <Badge>Runway</Badge>
                      <Badge>Editorial</Badge>
                      <Badge>Commercial</Badge>
                      <Badge>Fitness</Badge>
                    </Group>
                  </Box>
                  <Box>
                    <Text size="sm" weight={500} mb="xs">Experience Level</Text>
                    <Badge color="green" size="lg">Established</Badge>
                  </Box>
                  <Box>
                    <Text size="sm" weight={500} mb="xs">Languages</Text>
                    <Group spacing="xs">
                      <Badge variant="light">English</Badge>
                      <Badge variant="light">French</Badge>
                      <Badge variant="light">Italian</Badge>
                    </Group>
                  </Box>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};