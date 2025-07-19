import { Container, SimpleGrid, Title, Text, Button, Group, Box, AspectRatio } from '@mantine/core';
import classes from './DesignerSpotlight.module.css';

const designerData = [
  {
    id: 1,
    title: 'Midnight Lace Collection',
    designer: 'Noir Elegance',
    description: 'Exquisite black lace design with intricate detailing, perfect for a romantic evening.',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/f_auto,q_auto,w_800,ar_3:4,c_fill,g_face/v1738223985/cruise-fashion_f1gaxb.jpg',
    primaryColor: '#db2777',
  },
  {
    id: 2,
    title: 'Shadow & Light',
    designer: 'Luna Noir',
    description: 'Contemporary silhouette with classic black lace and modern styling.',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/f_auto,q_auto,w_800,ar_3:4,c_fill,g_face/v1738245024/valentine-008_hrdmes.jpg',
    primaryColor: '#db2777',
  },
  {
    id: 3,
    title: 'Pink Glamour',
    designer: 'Rose Atelier',
    description: 'Delicate lace bralette with strappy details and romantic aesthetic.',
    image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/f_auto,q_auto,w_800,ar_3:4,c_fill,g_face/v1738223082/May-fashion_kbkveb.jpg',
    primaryColor: '#db2777',
  },
];

export function DesignerSpotlight() {
  return (
    <section className={classes.section}>
      <Container size="xl">
        <Title order={2} ta="center" className={classes.sectionTitle}>
          Exclusive Collection
        </Title>
        
        <div className={classes.grid}>
          {designerData.map((designer) => (
            <Box key={designer.id} className={classes.card}>
              <div className={classes.imageWrapper}>
                <div 
                  className={classes.image}
                  style={{ 
                    backgroundImage: `url(${designer.image})`,
                  }}
                />
                <div className={classes.overlay} />
              </div>
              
              <div className={classes.content}>
                <Title order={3} className={classes.title}>
                  {designer.title}
                </Title>
                <Text className={classes.designer}>
                  By {designer.designer}
                </Text>
                <Text className={classes.description}>
                  {designer.description}
                </Text>
                
                <Group gap="xs" className={classes.buttonGroup}>
                  <Button 
                    className={classes.primaryButton}
                    fullWidth
                  >
                    Explore
                  </Button>
                  <Button 
                    className={classes.secondaryButton}
                    fullWidth
                  >
                    Details
                  </Button>
                </Group>
              </div>
            </Box>
          ))}
        </div>
      </Container>
    </section>
  );
}