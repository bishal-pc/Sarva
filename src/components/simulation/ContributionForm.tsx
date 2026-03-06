"use client";

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {useToast} from '@/hooks/use-toast';
import {Coins, Info, Loader2} from 'lucide-react';
import {useFirestore} from '@/firebase';
import {doc, getDoc, setDoc, increment, serverTimestamp} from 'firebase/firestore';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';
import {getDeviceFingerprint, getMonthYearKey} from '@/lib/fingerprint';

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

export function ContributionForm({onSuccess}: {onSuccess: (amount: number) => void}) {
  const [amount, setAmount] = useState<number>(SIMULATION_CONSTANTS.MIN_CONTRIBUTION);
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [hasContributed, setHasContributed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    async function checkStatus() {
      if (!firestore) return;
      try {
        const fingerprint = await getDeviceFingerprint();
        const monthKey = getMonthYearKey();
        const docId = `${fingerprint}_${monthKey}`;
        const docRef = doc(firestore, 'contributions', docId);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          setHasContributed(true);
        }
      } catch (e) {
        console.error("Fingerprint check failed", e);
      } finally {
        setIsChecking(false);
      }
    }
    checkStatus();
  }, [firestore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setIsSubmitting(true);

    try {
      const fingerprint = await getDeviceFingerprint();
      const monthKey = getMonthYearKey();
      const docId = `${fingerprint}_${monthKey}`;
      
      const contributionData = {
        amount,
        state,
        district: district || "",
        timestamp: serverTimestamp(),
        deviceId: fingerprint, // Store for transparency
      };

      const contributionRef = doc(firestore, 'contributions', docId);
      const statsRef = doc(firestore, 'stats', 'global');

      // Attempt to set the document. Security rules will fail if it exists.
      await setDoc(contributionRef, contributionData);

      // If successful, increment global simulation stats atomically
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

      setHasContributed(true);
      onSuccess(amount);
      
      toast({
        title: "Virtual Contribution Submitted",
        description: `Thank you for contributing ₹${amount} from ${state}.`,
      });
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        setHasContributed(true);
        toast({
          variant: "destructive",
          title: "Entry Already Exists",
          description: "This device has already contributed to the simulation this month.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <Card className="bg-muted/10 border-dashed">
        <CardContent className="py-12 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary opacity-50" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verifying device eligibility...</p>
        </CardContent>
      </Card>
    );
  }

  if (hasContributed) {
    return (
      <Card className="bg-muted/50 border-dashed border-primary/20">
        <CardContent className="pt-8 text-center space-y-2">
          <CardTitle className="text-xl font-black uppercase tracking-tight">Citizenship Acknowledged</CardTitle>
          <CardDescription className="text-sm">
            This device has already recorded a virtual contribution for <strong>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>. 
            <br />The simulation is limited to one entry per device monthly to maintain data integrity.
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
              disabled={isSubmitting}
            />
            <div className="flex items-start gap-2 p-3 rounded bg-blue-50/50 border border-blue-100 mt-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-800 leading-tight font-medium">
                <strong>Realistic Data Lock:</strong> Contributions are capped at <strong>₹500</strong> to ensure the simulation models realistic average citizen potential.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="text-xs font-bold uppercase text-muted-foreground">State / UT</Label>
              <Select onValueChange={setState} value={state} disabled={isSubmitting}>
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-sm font-bold uppercase tracking-widest" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Commit to Simulation
          </Button>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px bg-muted flex-1" />
            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">
              Secure Device Fingerprinting Active
            </p>
            <div className="h-px bg-muted flex-1" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
