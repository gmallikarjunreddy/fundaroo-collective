
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjectById, donateToProject } from '@/services/projectService';
import { toast } from 'sonner';

export const useProjectDetails = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => {
      if (!projectId) throw new Error('Project ID is required');
      return getProjectById(projectId);
    },
    enabled: !!projectId,
    meta: {
      onError: (error: any) => {
        console.error('Error fetching project details:', error);
        toast.error('Failed to load project details');
      }
    }
  });

  const donation = useMutation({
    mutationFn: ({ amount }: { amount: number }) => {
      if (!projectId) throw new Error('Project ID is required');
      return donateToProject(projectId, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Error making donation:', error);
      toast.error('Failed to process your donation');
    }
  });

  // Calculate days left
  const calculateDaysLeft = () => {
    if (!project) return 0;
    
    const createdDate = new Date(project.createdAt);
    const endDate = new Date(createdDate);
    endDate.setDate(createdDate.getDate() + project.duration);
    
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate funding percentage
  const calculateFundingPercentage = () => {
    if (!project || project.goal === 0) return 0;
    return Math.min(Math.round((project.raised / project.goal) * 100), 100);
  };

  return {
    project,
    isLoading,
    error,
    daysLeft: project ? calculateDaysLeft() : 0,
    fundingPercentage: project ? calculateFundingPercentage() : 0,
    donate: donation.mutate,
    isDonating: donation.isPending
  };
};
