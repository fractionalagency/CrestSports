import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Barcelona',
    slug: 'barcelona',
    description: 'Classic and modern Barça jerseys for culers worldwide.',
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/barca25.png',
  },
  {
    name: 'Manchester United',
    slug: 'manchester-united',
    description: 'Iconic Red Devils kits across eras.',
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/ronaldo07black1.png',
  },
  {
    name: 'Real Madrid',
    slug: 'real-madrid',
    description: 'Los Blancos staples from past and present.',
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/realMadrid11_1.jpeg',
  },
  {
    name: 'Paris Saint-Germain',
    slug: 'psg',
    description: 'PSG statement kits from the Neymar era.',
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/psg18.jpg',
  },
  {
    name: 'Manchester City',
    slug: 'manchester-city',
    description: 'Cityzens away and special editions.',
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/mancity25away.jpg',
  },
];

type SeedProduct = Omit<Prisma.ProductCreateInput, 'category'> & { categorySlug: string };

const products: SeedProduct[] = [
  {
    name: 'Barcelona Home 2025-26 Pedri',
    slug: 'barcelona-home-2025-26-pedri',
    description: '2025/26 home kit featuring Pedri; lightweight knit and breathable side panels.',
    price: 5299,
    salePrice: 4899,
    sku: 'BAR-2526-HOME-PEDRI',
    stock: 80,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/barca25.png',
    images: [
      'https://nirvik30.github.io/jerseycatalog/barca25.png',
      'https://nirvik30.github.io/jerseycatalog/barca25_pedrib.png',
      'https://nirvik30.github.io/jerseycatalog/barcahome.jpg',
      'https://nirvik30.github.io/jerseycatalog/barcahomepedri.jpg',
    ],
    isActive: true,
    isFeatured: true,
    metadata: { rating: 4.8, discountPercentage: 8 },
    categorySlug: 'barcelona',
  },
  {
    name: 'Manchester United 07 Black Ronaldo',
    slug: 'manchester-united-07-black-ronaldo',
    description: '2007 black away inspired kit with Ronaldo detailing and retro collar.',
    price: 4899,
    salePrice: 4499,
    sku: 'MU-07-BLACK-RONALDO',
    stock: 70,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/ronaldo07black1.png',
    images: [
      'https://nirvik30.github.io/jerseycatalog/ronaldo07black1.png',
      'https://nirvik30.github.io/jerseycatalog/ronaldo07black2.png',
      'https://nirvik30.github.io/jerseycatalog/ronaldo07blackf1.jpg',
      'https://nirvik30.github.io/jerseycatalog/ronaldo07blackf2.jpg',
    ],
    isActive: true,
    isFeatured: true,
    metadata: { rating: 4.7, discountPercentage: 8 },
    categorySlug: 'manchester-united',
  },
  {
    name: 'Real Madrid 2011 Ronaldo',
    slug: 'real-madrid-2011-ronaldo',
    description: '2011 classic home white with Ronaldo print and gold trim.',
    price: 4699,
    salePrice: 4299,
    sku: 'RM-2011-RONALDO',
    stock: 75,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/realMadrid11_1.jpeg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/realMadrid11_1.jpeg',
      'https://nirvik30.github.io/jerseycatalog/realMadrid11_3.jpeg',
      'https://nirvik30.github.io/jerseycatalog/realhome11f.jpg',
      'https://nirvik30.github.io/jerseycatalog/realhome11b.jpg',
    ],
    isActive: true,
    isFeatured: true,
    metadata: { rating: 4.6, discountPercentage: 7 },
    categorySlug: 'real-madrid',
  },
  {
    name: 'Manchester United 98/99 Beckham',
    slug: 'manchester-united-98-99-beckham',
    description: 'Treble-season inspired Beckham kit with vintage crest.',
    price: 4599,
    salePrice: 4199,
    sku: 'MU-9899-BECKHAM',
    stock: 65,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/manutd_98.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/manutd_98.jpg',
      'https://nirvik30.github.io/jerseycatalog/manutd_retro98-99.jpg',
      'https://nirvik30.github.io/jerseycatalog/utd98.jpg',
      'https://nirvik30.github.io/jerseycatalog/utd98beckham.jpg',
    ],
    isActive: true,
    isFeatured: false,
    metadata: { rating: 4.5, discountPercentage: 5 },
    categorySlug: 'manchester-united',
  },
  {
    name: 'Barcelona 09 Home',
    slug: 'barcelona-09-home',
    description: '2009 home stripe kit with subtle yellow trim and Messi-era fit.',
    price: 4499,
    salePrice: 4099,
    sku: 'BAR-09-HOME',
    stock: 60,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/barca09home.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/barca09home.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca09messi.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca09f.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca09b.jpg',
    ],
    isActive: true,
    isFeatured: false,
    metadata: { rating: 4.6, discountPercentage: 6 },
    categorySlug: 'barcelona',
  },
  {
    name: 'Manchester United 2003-04 Ronaldo',
    slug: 'manchester-united-2003-04-ronaldo',
    description: 'Early Ronaldo era kit with classic V-neck detailing.',
    price: 4399,
    salePrice: 3999,
    sku: 'MU-0304-RONALDO',
    stock: 70,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/manutd03.jpeg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/manutd03.jpeg',
      'https://nirvik30.github.io/jerseycatalog/manutd03ronaldo.jpeg',
      'https://nirvik30.github.io/jerseycatalog/manutd03f.jpeg',
      'https://nirvik30.github.io/jerseycatalog/manutd03b.jpeg',
    ],
    isActive: true,
    isFeatured: false,
    metadata: { rating: 4.5, discountPercentage: 5 },
    categorySlug: 'manchester-united',
  },
  {
    name: 'Real Madrid 2017 Purple Kit Ronaldo',
    slug: 'real-madrid-2017-purple-ronaldo',
    description: '2017 purple away kit with Ronaldo lettering and breathable mesh.',
    price: 4599,
    salePrice: 4199,
    sku: 'RM-2017-PURPLE',
    stock: 85,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/madrid2017purple.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/madrid2017purple.jpg',
      'https://nirvik30.github.io/jerseycatalog/madridpurple.jpg',
      'https://nirvik30.github.io/jerseycatalog/madridpurplef.jpg',
      'https://nirvik30.github.io/jerseycatalog/madridpurpleb.jpg',
    ],
    isActive: true,
    isFeatured: true,
    metadata: { rating: 4.6, discountPercentage: 6 },
    categorySlug: 'real-madrid',
  },
  {
    name: 'PSG 2018 Neymar Kit',
    slug: 'psg-2018-neymar',
    description: '2018 PSG kit with Neymar print; slim fit with breathable mesh back.',
    price: 4499,
    salePrice: 4099,
    sku: 'PSG-2018-NEYMAR',
    stock: 65,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/psg18.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/psg18.jpg',
      'https://nirvik30.github.io/jerseycatalog/psg18neymar.jpg',
      'https://nirvik30.github.io/jerseycatalog/psg18f.jpg',
      'https://nirvik30.github.io/jerseycatalog/psg18b.jpg',
    ],
    isActive: true,
    isFeatured: false,
    metadata: { rating: 4.4, discountPercentage: 5 },
    categorySlug: 'psg',
  },
  {
    name: 'Manchester City Away Kit 2025/26',
    slug: 'manchester-city-away-2025-26',
    description: '25/26 away kit with modern graphic and lightweight fabric.',
    price: 4699,
    salePrice: 4299,
    sku: 'MC-2526-AWAY',
    stock: 90,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/mancity25away.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/mancity25away.jpg',
      'https://nirvik30.github.io/jerseycatalog/mancity25foden.jpg',
      'https://nirvik30.github.io/jerseycatalog/mancity25awayf.jpg',
      'https://nirvik30.github.io/jerseycatalog/mancity25awayb.jpg',
    ],
    isActive: true,
    isFeatured: true,
    metadata: { rating: 4.5, discountPercentage: 6 },
    categorySlug: 'manchester-city',
  },
  {
    name: 'Barcelona 1999 Retro Rivaldo',
    slug: 'barcelona-1999-retro-rivaldo',
    description: 'Retro 1999 Rivaldo kit with classic collar and vintage crest.',
    price: 4399,
    salePrice: 3999,
    sku: 'BAR-1999-RIVALDO',
    stock: 55,
    imageUrl: 'https://nirvik30.github.io/jerseycatalog/barca99.jpg',
    images: [
      'https://nirvik30.github.io/jerseycatalog/barca99.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca99rivaldo.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca99f.jpg',
      'https://nirvik30.github.io/jerseycatalog/barca99b.jpg',
    ],
    isActive: true,
    isFeatured: false,
    metadata: { rating: 4.5, discountPercentage: 5 },
    categorySlug: 'barcelona',
  },
];

async function main() {
  console.log('Seeding categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log('Seeding products...');
  for (const product of products) {
    const { categorySlug, ...productData } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...productData,
        category: { connect: { slug: categorySlug } },
      },
      create: {
        ...productData,
        category: { connect: { slug: categorySlug } },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
