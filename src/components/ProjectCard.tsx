
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface ProjectCardProps {
  id: string;
  title: string;
  creator: string;
  description: string;
  imageSrc: string;
  category: string;
  raised: number;
  goal: number;
  daysLeft: number;
  featured?: boolean;
}

const ProjectCard = ({
  id,
  title,
  creator,
  description,
  imageSrc,
  category,
  raised,
  goal,
  daysLeft,
  featured = false
}: ProjectCardProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-value', `${percentage}%`);
    }
  }, [percentage]);

  return (
    <Link 
      to={`/project/${id}`} 
      className={`flex flex-col hover-lift group rounded-xl overflow-hidden shadow-subtle bg-card border border-border/40
        ${featured ? 'lg:col-span-2 md:flex-row md:h-[360px]' : 'h-full'}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'h-48'}`}>
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs bg-black/70 text-white backdrop-blur-xs">
            {category}
          </span>
        </div>
      </div>
      
      <div className={`p-6 flex flex-col flex-grow justify-between ${featured ? 'md:w-1/2' : ''}`}>
        <div>
          <p className="text-sm text-muted-foreground mb-2">{creator}</p>
          <h3 className="font-medium text-xl mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span>₹{raised.toLocaleString()} raised</span>
            <span>{percentage}%</span>
          </div>
          
          <div 
            ref={progressRef}
            className="h-1.5 bg-secondary rounded-full progress-bar overflow-hidden mb-4"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
            role="progressbar"
          ></div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{daysLeft} days left</span>
            {featured && <span>₹{Math.round(goal / 1000)}K goal</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
