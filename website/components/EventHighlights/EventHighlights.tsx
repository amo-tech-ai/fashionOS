import { AspectRatio, Button, Container, SimpleGrid, Text, Title, Box } from '@mantine/core';
import { useState } from 'react';
import classes from './EventHighlights.module.css';

const eventData = [
  {
    title: 'Runway Collection',
    description: 'Exclusive haute couture from world-renowned designers featuring cutting-edge fashion',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738245076/April-fashion_doxyuk.jpg',
  },
  {
    title: 'Luxury Lingerie',
    description: 'Intimate apparel showcase featuring premium fabrics and sophisticated designs',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738223985/cruise-fashion_f1gaxb.jpg',
  },
  {
    title: 'Backstage Glamour',
    description: 'Behind-the-scenes moments capturing the essence of fashion week',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738223082/May-fashion_kbkveb.jpg',
  }
];

export function EventHighlights() {
  const [activeSlide, setActiveSlide] = useState(0);

  const cards = eventData.map((event, index) => (
    <Box 
      key={event.title} 
      className={classes.cardContainer}
      data-active={index === activeSlide}
    >
      <AspectRatio ratio={16/10} className={classes.aspectRatio}>
        <div 
          className={classes.backgroundImage}
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className={classes.overlay} />
          <div className={classes.content}>
            <div className={classes.textContent}>
              <Title order={3} className={classes.cardTitle}>
                {event.title}
              </Title>
              <Text className={classes.cardDescription}>
                {event.description}
              </Text>
            </div>
            <Button 
              variant="outline" 
              className={classes.learnMoreButton}
              fullWidth
            >
              Learn More
            </Button>
          </div>
        </div>
      </AspectRatio>
    </Box>
  ));

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className={classes.section}>
      <Container size="xl" py={80}>
        <Title order={2} ta="center" mb={50} className={classes.sectionTitle}>
          Event Highlights
        </Title>
        
        {/* Desktop Grid */}
        <SimpleGrid 
          cols={{ base: 1, sm: 2, md: 3 }} 
          spacing="xl"
          className={classes.desktopGrid}
        >
          {cards}
        </SimpleGrid>

        {/* Mobile Carousel */}
        <div className={classes.mobileCarousel}>
          <div 
            className={classes.carouselTrack}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {cards}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className={classes.pagination}>
          {eventData.map((_, index) => (
            <button
              key={index}
              className={`${classes.dot} ${index === activeSlide ? classes.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
