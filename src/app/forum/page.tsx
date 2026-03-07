"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, MapPin, Calendar, ShieldAlert, Loader2, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getDeviceFingerprint, getDayKey } from '@/lib/fingerprint';

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

export default function ForumPage() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPostedToday, setHasPostedToday] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();
  const firestore = useFirestore();

  const forumQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'forum_posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
  }, [firestore]);

  const { data: posts, loading } = useCollection(forumQuery);

  useEffect(() => {
    async function checkDailyStatus() {
      if (!firestore) return;
      try {
        const fingerprint = await getDeviceFingerprint();
        const todayKey = getDayKey();
        const postDocId = `${fingerprint}_${todayKey}`;
        const postRef = doc(firestore, 'forum_posts', postDocId);
        const snap = await getDoc(postRef);
        if (snap.exists()) {
          setHasPostedToday(true);
        }
      } catch (e) {
        console.error("Failed to check daily forum status", e);
      } finally {
        setIsChecking(false);
      }
    }
    checkDailyStatus();
  }, [firestore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !state || !content) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in your name, state, and your message.",
      });
      return;
    }

    if (!firestore) return;

    setIsSubmitting(true);

    try {
      const fingerprint = await getDeviceFingerprint();
      const todayKey = getDayKey();
      const postDocId = `${fingerprint}_${todayKey}`;
      const postRef = doc(firestore, 'forum_posts', postDocId);

      // Check existence again just before submission for double safety
      const snap = await getDoc(postRef);
      if (snap.exists()) {
        setHasPostedToday(true);
        toast({
          variant: "destructive",
          title: "Daily Limit Reached",
          description: "This device has already shared a message today. Thank you for participating!",
        });
        setIsSubmitting(false);
        return;
      }

      const postData = {
        name,
        state,
        content,
        createdAt: serverTimestamp(),
        deviceId: fingerprint,
      };

      await setDoc(postRef, postData);

      setName('');
      setContent('');
      setHasPostedToday(true);
      
      toast({
        title: "Post Submitted",
        description: "Thank you for sharing your views on the Sarva project.",
      });
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        setHasPostedToday(true);
        toast({
          variant: "destructive",
          title: "Post Error",
          description: "You have already reached the daily posting limit for this device.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Civic Forum</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A space for citizens to discuss, suggest, and debate the future of civic infrastructure in India.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {isChecking ? (
            <Card className="border-dashed bg-muted/20">
              <CardContent className="py-12 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary opacity-50" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verifying eligibility...</p>
              </CardContent>
            </Card>
          ) : hasPostedToday ? (
            <Card className="border-emerald-200 bg-emerald-50/20 border-dashed">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Daily Entry Recorded</CardTitle>
                  <CardDescription className="text-xs">
                    This device has already posted today. To maintain a high signal-to-noise ratio, we limit participation to one post per day.
                  </CardDescription>
                </div>
                <div className="pt-4">
                  <p className="text-[10px] font-bold uppercase text-emerald-700">Thank you for your voice</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Join the Discussion
                </CardTitle>
                <CardDescription className="text-xs">
                  Share your views. No accounts needed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="E.g. Rajesh Kumar" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      disabled={isSubmitting}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-xs font-bold uppercase text-muted-foreground">State / UT</Label>
                    <Select onValueChange={setState} value={state} disabled={isSubmitting}>
                      <SelectTrigger className="h-9 text-sm">
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
                    <Label htmlFor="content" className="text-xs font-bold uppercase text-muted-foreground">Your Views</Label>
                    <Textarea 
                      id="content" 
                      placeholder="What do you think about the civic simulation?" 
                      className="min-h-[120px] text-sm"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded text-[10px] text-muted-foreground border">
                    <ShieldAlert className="w-3 h-3 shrink-0" />
                    <span>One post per device per day</span>
                  </div>

                  <Button type="submit" className="w-full font-bold uppercase tracking-widest text-xs h-10" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Submit Post
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h3>
            <span className="text-xs text-muted-foreground">{posts?.length || 0} entries recorded</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">Synchronizing live discussions...</p>
              </div>
            ) : posts?.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-muted-foreground italic">
                  No discussions yet. Be the first to speak up!
                </CardContent>
              </Card>
            ) : (
              posts?.map((post: any) => (
                <Card key={post.id} className="hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          <User className="w-4 h-4 text-primary opacity-60" />
                          {post.name}
                        </CardTitle>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3" />
                            {post.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Separator />

          <div className="text-center p-8 bg-muted/20 rounded-lg space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground">Forum Guidelines</p>
            <p className="text-[10px] text-muted-foreground max-w-md mx-auto italic">
              Sarva is a collaborative simulation. Please keep discussions civil, focused on civic development, and constructive. Fingerprinting identifies devices to maintain a high signal-to-noise ratio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
