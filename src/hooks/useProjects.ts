
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProjects } from '@/services/projectService';
import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  // Filter and sort projects based on activeCategory, searchQuery, and sortBy
  useEffect(() => {
    let result = [...projects];
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(
        (project) => project.category === activeCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.creator?.name?.toLowerCase().includes(query)
      );
    }
    
    // Sort projects
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'endingSoon':
        result.sort((a, b) => {
          const endDateA = new Date(a.createdAt);
          endDateA.setDate(endDateA.getDate() + Number(a.duration));
          
          const endDateB = new Date(b.createdAt);
          endDateB.setDate(endDateB.getDate() + Number(b.duration));
          
          return endDateA.getTime() - endDateB.getTime();
        });
        break;
      case 'mostFunded':
        result.sort((a, b) => {
          const percentA = a.raised ? (a.raised / a.goal) * 100 : 0;
          const percentB = b.raised ? (b.raised / b.goal) * 100 : 0;
          return percentB - percentA;
        });
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, sortBy, projects]);

  const refreshProjects = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  return {
    projects: filteredProjects,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    refreshProjects
  };
};
