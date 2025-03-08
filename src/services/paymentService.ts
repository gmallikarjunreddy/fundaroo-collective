
import { toast } from 'sonner';
import { donateToProject } from './projectService';

// Razorpay payment types
interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

// Razorpay test credentials
const RAZORPAY_KEY_ID = 'rzp_test_ZIsj6ZGng5SmuV'; // Updated with the correct test key

// Check if Razorpay is loaded
const isRazorpayLoaded = (): boolean => {
  return typeof (window as any).Razorpay !== 'undefined';
};

// Load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isRazorpayLoaded()) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      toast.error('Payment gateway failed to load. Please try again later.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiatePayment = async (
  projectId: string,
  amount: number,
  projectTitle: string,
  backerInfo: { name?: string; email?: string; phone?: string } = {}
): Promise<boolean> => {
  try {
    console.log(`Initiating payment for project ${projectId}: ₹${amount}`);
    
    // Load Razorpay script if not already loaded
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) return false;

    return new Promise((resolve) => {
      // Convert amount to paise (Razorpay uses currency's smallest unit)
      const amountInPaise = amount * 100;

      const options: PaymentOptions = {
        key: RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Fundaroo',
        description: `Backing ${projectTitle}`,
        image: 'https://via.placeholder.com/150', // Your logo URL
        handler: async function (response) {
          try {
            console.log('Payment successful:', response);
            
            // In production, you would verify the payment on your server
            // For test mode, we'll just update the project's raised amount
            const result = await donateToProject(projectId, amount);
            
            if (result.success) {
              toast.success(`You've successfully backed this project with ₹${amount}!`);
              resolve(true);
            } else {
              toast.error('Something went wrong with recording your donation.');
              resolve(false);
            }
          } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('An error occurred while processing your payment.');
            resolve(false);
          }
        },
        prefill: {
          name: backerInfo.name || '',
          email: backerInfo.email || '',
          contact: backerInfo.phone || ''
        },
        theme: {
          color: '#4F46E5' // Primary color
        }
      };

      try {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error('Error opening Razorpay:', error);
        toast.error('Failed to open payment window. Please try again.');
        resolve(false);
      }
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    toast.error('Failed to initiate payment. Please try again later.');
    return false;
  }
};
