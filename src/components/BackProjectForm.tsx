
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { initiatePayment } from '@/services/paymentService';
import { isAuthenticated } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

interface BackProjectFormProps {
  projectId: string;
  projectTitle: string;
  pledgeAmount?: number;
  onSuccess?: () => void;
}

const BackProjectForm = ({ 
  projectId, 
  projectTitle, 
  pledgeAmount = 0,
  onSuccess 
}: BackProjectFormProps) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(pledgeAmount || 10);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleBackProject = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please log in to back this project');
      navigate('/login', { state: { from: `/projects/${projectId}` } });
      return;
    }

    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await initiatePayment(
        projectId,
        amount,
        projectTitle,
        { name, email, phone }
      );

      if (success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error backing project:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Back this project</h3>
      
      <form onSubmit={handleBackProject}>
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="amount">Pledge amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              placeholder="Optional"
            />
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="text-sm text-muted-foreground mb-6">
          <p>By backing this project, you agree to the Terms of Use and Privacy Policy.</p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || amount <= 0}
        >
          {isSubmitting ? 'Processing...' : `Back with ₹${amount}`}
        </Button>
      </form>
    </div>
  );
};

export default BackProjectForm;
