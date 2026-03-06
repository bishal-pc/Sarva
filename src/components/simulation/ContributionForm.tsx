
"use client";

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {useToast} from '@/hooks/use-toast';
import {Coins, Info} from 'lucide-react';
import {useFirestore} from '@/firebase';
import {collection, doc, addDoc, setDoc, increment, serverTimestamp} from 'firebase/firestore';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

const STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const LOCAL_STORAGE_KEY = 'sarva_last_contribution';

export function ContributionForm({onSuccess}: {onSuccess: (amount: number) => void}) {
  const [amount, setAmount] = useState<number>(SIMULATION_CONSTANTS.MIN_CONTRIBUTION);
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [hasContributed, setHasContributed] = useState(false);
  const {toast} = useToast();
  const firestore = useFirestore();

  // Check rate limit on mount
  useEffect(() => {
    const lastContribution = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lastContribution) {
      const date = new Date(lastContribution);
      const now = new Date();
      // Lock if contribution was made in the current month and year
      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        setHasContributed(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check for rate limit before submission
    const lastContribution = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lastContribution) {
      const date = new Date(lastContribution);
      const now = new Date();
      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        setHasContributed(true);
        toast({
          variant: "destructive",
          title: "Limit Reached",
          description: "This device has already contributed to the simulation this month.",
        });
        return;
      }
    }

    if (!state) {
      toast({
        variant: "destructive",
        title: "State Required",
        description: "Please select your state to continue the simulation.",
      });
      return;
    }

    if (amount < SIMULATION_CONSTANTS.MIN_CONTRIBUTION || amount > SIMULATION_CONSTANTS.MAX_REALISTIC_CONTRIBUTION) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: `Please enter an amount between ₹${SIMULATION_CONSTANTS.MIN_CONTRIBUTION} and ₹${SIMULATION_CONSTANTS.MAX_REALISTIC_CONTRIBUTION}.`,
      });
      return;
    }

    if (!firestore) return;

    const contributionData = {
      amount,
      state,
      district: district || "",
      timestamp: serverTimestamp(),
    };

    const contributionsRef = collection(firestore, 'contributions');
    const statsRef = doc(firestore, 'stats', 'global');

    // 1. Log the individual anonymous contribution for the public ledger
    addDoc(contributionsRef, contributionData)
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: contributionsRef.path,
          operation: 'create',
          requestResourceData: contributionData,
        }));
      });

    // 2. Increment global simulation stats atomically
    setDoc(statsRef, {
      totalPool: increment(amount),
      totalParticipants: increment(1)
    }, { merge: true })
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: statsRef.path,
          operation: 'update',
          requestResourceData: { totalPool: amount, totalParticipants: 1 },
        }));
      });

    // 3. Set the device-level lock
    localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toISOString());
    setHasContributed(true);
    onSuccess(amount);
    
    toast({
      title: "Virtual Contribution Submitted",
      description: `Thank you for contributing ₹${amount} from ${state}${district ? `, ${district}` : ''}.`,
    });
  };

  if (hasContributed) {
    return (
      <Card className="bg-muted/50 border-dashed border-primary/20">
        <CardContent className="pt-8 text-center space-y-2">
          <CardTitle className="text-xl font-black uppercase tracking-tight">Citizenship Acknowledged</CardTitle>
          <CardDescription className="text-sm">
            You have already recorded your virtual contribution for <strong>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>. 
            <br />This device is now locked until the next simulation window.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Coins className="text-primary w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Simulation Input</span>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tighter">Submit Contribution</CardTitle>
        <CardDescription>
          What would you realistically contribute monthly if this project was real?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-xs font-bold uppercase text-muted-foreground">Monthly Virtual Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              min={SIMULATION_CONSTANTS.MIN_CONTRIBUTION}
              max={SIMULATION_CONSTANTS.MAX_REALISTIC_CONTRIBUTION}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg font-black h-12 border-primary/20 bg-primary/5"
            />
            <div className="flex items-start gap-2 p-3 rounded bg-blue-50/50 border border-blue-100 mt-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-800 leading-tight font-medium">
                <strong>Realistic Data Lock:</strong> Simulation contributions are limited to a maximum of <strong>₹500</strong> to maintain mathematical integrity based on average citizen potential.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="text-xs font-bold uppercase text-muted-foreground">State / UT</Label>
              <Select onValueChange={setState} value={state}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-xs font-bold uppercase text-muted-foreground">District (Optional)</Label>
              <Input
                id="district"
                placeholder="E.g. Kamrup"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest">
            Commit to Simulation
          </Button>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px bg-muted flex-1" />
            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">
              Anonymous Device Lock Active
            </p>
            <div className="h-px bg-muted flex-1" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
