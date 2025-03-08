
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BackProjectForm from '@/components/BackProjectForm';
import { useQueryClient } from '@tanstack/react-query';

interface BackProjectProps {
  projectId: string;
  projectTitle: string;
}

const BackProject = ({ projectId, projectTitle }: BackProjectProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    // Close the dialog
    setOpen(false);
    
    // Invalidate the project query to refresh the data
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    queryClient.invalidateQueries({ queryKey: ['project', projectId] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Back this project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Back "{projectTitle}"</DialogTitle>
        </DialogHeader>
        <BackProjectForm
          projectId={projectId}
          projectTitle={projectTitle}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BackProject;
