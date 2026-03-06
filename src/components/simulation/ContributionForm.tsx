"use client";

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {useToast} from '@/hooks/use-toast';
import {Coins} from 'lucide-react';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function ContributionForm({onSuccess}: {onSuccess: (amount: number) => void}) {
  const [amount, setAmount] = useState<number>(SIMULATION_CONSTANTS.MIN_CONTRIBUTION);
  const [state, setState] = useState<string>("");
  const [hasContributed, setHasContributed] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const lastContribution = localStorage.getItem('sarva_last_contribution');
    if (lastContribution) {
      const date = new Date(lastContribution);
      const now = new Date();
      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        setHasContributed(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < SIMULATION_CONSTANTS.MIN_CONTRIBUTION || amount > SIMULATION_CONSTANTS.MAX_CONTRIBUTION) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: `Please enter an amount between ₹${SIMULATION_CONSTANTS.MIN_CONTRIBUTION} and ₹${SIMULATION_CONSTANTS.MAX_CONTRIBUTION}.`,
      });
      return;
    }

    localStorage.setItem('sarva_last_contribution', new Date().toISOString());
    setHasContributed(true);
    onSuccess(amount);
    toast({
      title: "Virtual Contribution Submitted",
      description: `Thank you for contributing ₹${amount} to the simulation.`,
    });
  };

  if (hasContributed) {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6 text-center">
          <CardTitle className="text-lg mb-2">Thank you for participating!</CardTitle>
          <CardDescription>
            You have already submitted your virtual contribution for this month. 
            Come back next month to simulate again.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Coins className="text-secondary w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Simulation Input</span>
        </div>
        <CardTitle>Submit Virtual Contribution</CardTitle>
        <CardDescription>
          What would you realistically contribute monthly if this project was real?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monthly Virtual Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              min={SIMULATION_CONSTANTS.MIN_CONTRIBUTION}
              max={SIMULATION_CONSTANTS.MAX_CONTRIBUTION}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg font-semibold"
            />
            <p className="text-[10px] text-muted-foreground">
              Min: ₹{SIMULATION_CONSTANTS.MIN_CONTRIBUTION} | Max: ₹{SIMULATION_CONSTANTS.MAX_CONTRIBUTION}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State (Optional)</Label>
            <Select onValueChange={setState} value={state}>
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Submit to Simulation
          </Button>
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
            No real money is collected. This is for research and demonstration only.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
