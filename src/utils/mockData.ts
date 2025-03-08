
// Mock projects data
export const mockProjects = [
  {
    _id: '1',
    title: 'The Minimal Desk Clock: Elegant Simplicity for Your Workspace',
    creator: { name: 'Thomas Designs', fullName: 'Thomas Designs' },
    description: 'A beautifully crafted timepiece that combines minimalist aesthetics with precise functionality.',
    coverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
    raised: 42000,
    goal: 50000,
    duration: 30,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    story: 'Our minimal desk clock combines elegant design with precision timekeeping. Perfect for any workspace.',
    featured: true,
    backers: 156,
    daysLeft: 15
  },
  {
    _id: '2',
    title: 'Eco-friendly Backpack: Adventure Sustainably',
    creator: { name: 'Green Ventures', fullName: 'Green Ventures' },
    description: 'A durable backpack made from recycled materials with innovative storage solutions.',
    coverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
    category: 'Fashion',
    raised: 18500,
    goal: 30000,
    duration: 45,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    story: 'Our backpacks are made from 100% recycled materials, helping you adventure responsibly.',
    featured: false,
    backers: 87,
    daysLeft: 40
  },
  {
    _id: '3',
    title: 'Sound Waves: Immersive Audio Headphones',
    creator: { name: 'Audio Innovations', fullName: 'Audio Innovations' },
    description: 'Next-generation headphones with spatial audio technology for an unparalleled listening experience.',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'Technology',
    raised: 85000,
    goal: 100000,
    duration: 30,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    story: 'Experience music like never before with our revolutionary spatial audio technology.',
    featured: false,
    backers: 342,
    daysLeft: 10
  },
  {
    _id: '4',
    title: 'Illustrated Urban Fantasy Novel Series',
    creator: { name: 'Fantasia Publishing', fullName: 'Fantasia Publishing' },
    description: 'A richly illustrated series of novels exploring magical realism in contemporary urban settings.',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
    category: 'Publishing',
    raised: 12000,
    goal: 20000,
    duration: 60,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    story: 'Dive into a world where magic meets the modern city in our illustrated novel series.',
    featured: false,
    backers: 76,
    daysLeft: 45
  },
  {
    _id: '5',
    title: 'Ceramic Handcrafted Tableware Collection',
    creator: { name: 'Clay Studios', fullName: 'Clay Studios' },
    description: 'Artisan-made ceramic plates, bowls, and mugs with unique glazes and minimalist design.',
    coverImage: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    raised: 28000,
    goal: 35000,
    duration: 40,
    createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    story: 'Each piece in our tableware collection is handcrafted with care by skilled artisans.',
    featured: false,
    backers: 124,
    daysLeft: 18
  }
];

// Mock user data
export const mockUser = {
  _id: 'user123',
  name: 'Demo User',
  email: 'demo@example.com',
  token: 'mock-token-12345',
  isAdmin: false
};
