
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CustomAmountInputProps {
  onSubmit: (amount: number) => void;
  isSubmitting?: boolean;
}

const CustomAmountInput = ({ onSubmit, isSubmitting = false }: CustomAmountInputProps) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate amount
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (numAmount < 100) {
      setError('Minimum amount is ₹100');
      return;
    }
    
    // Call the onSubmit function with the validated amount
    onSubmit(numAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="custom-amount">Enter Amount (₹)</Label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-muted-foreground">₹</span>
          </div>
          <Input
            id="custom-amount"
            type="number"
            placeholder="1000"
            value={amount}
            onChange={handleAmountChange}
            className="pl-8"
            min="100"
          />
        </div>
        {error && <p className="text-destructive text-sm mt-1">{error}</p>}
      </div>
      
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Suggested amounts:</p>
        <div className="grid grid-cols-3 gap-2">
          {[500, 1000, 2000, 5000, 10000, 25000].map((amt) => (
            <Button
              key={amt}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(amt.toString())}
            >
              ₹{amt.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Back this project'}
      </Button>
    </form>
  );
};

export default CustomAmountInput;
