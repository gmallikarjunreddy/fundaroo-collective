
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  Landmark, 
  Music, 
  Film, 
  BookOpen, 
  Coffee,
  Gamepad2
} from 'lucide-react';

type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
};

const categories: Category[] = [
  { id: 'all', name: 'All Projects', icon: <></> },
  { id: 'art', name: 'Art', icon: <Palette className="w-4 h-4" /> },
  { id: 'design', name: 'Design', icon: <Coffee className="w-4 h-4" /> },
  { id: 'film', name: 'Film & Video', icon: <Film className="w-4 h-4" /> },
  { id: 'games', name: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'music', name: 'Music', icon: <Music className="w-4 h-4" /> },
  { id: 'publishing', name: 'Publishing', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'tech', name: 'Technology', icon: <Landmark className="w-4 h-4" /> },
];

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

const CategoryFilter = ({ onCategoryChange, className = "" }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className={`w-full overflow-x-auto pb-4 ${className}`}>
      <div className="flex space-x-2 min-w-max">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="rounded-full px-4 py-2 whitespace-nowrap"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.icon && <span className="mr-2">{category.icon}</span>}
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
