
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, MapPin, Calendar, ShieldAlert, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

const DAILY_LIMIT = 5;

export default function ForumPage() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [content, setContent] = useState('');
  const [remainingPosts, setRemainingPosts] = useState(DAILY_LIMIT);
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
    const limitData = JSON.parse(localStorage.getItem('sarva_forum_limit') || '{"count": 0, "date": ""}');
    const today = new Date().toLocaleDateString();
    
    if (limitData.date !== today) {
      setRemainingPosts(DAILY_LIMIT);
    } else {
      setRemainingPosts(Math.max(0, DAILY_LIMIT - limitData.count));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !state || !content) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in your name, state, and your message.",
      });
      return;
    }

    const limitData = JSON.parse(localStorage.getItem('sarva_forum_limit') || '{"count": 0, "date": ""}');
    const today = new Date().toLocaleDateString();

    let newCount = 1;
    if (limitData.date === today) {
      if (limitData.count >= DAILY_LIMIT) {
        toast({
          variant: "destructive",
          title: "Limit Reached",
          description: `You have reached the daily limit of ${DAILY_LIMIT} posts. Please come back tomorrow.`,
        });
        return;
      }
      newCount = limitData.count + 1;
    }

    if (!firestore) return;

    const postData = {
      name,
      state,
      content,
      createdAt: serverTimestamp(),
    };

    const postsRef = collection(firestore, 'forum_posts');
    addDoc(postsRef, postData)
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: postsRef.path,
          operation: 'create',
          requestResourceData: postData,
        }));
      });

    localStorage.setItem('sarva_forum_limit', JSON.stringify({ count: newCount, date: today }));
    setRemainingPosts(DAILY_LIMIT - newCount);
    setName('');
    setContent('');
    
    toast({
      title: "Post Submitted",
      description: "Thank you for sharing your views on the Sarva project.",
    });
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
        {/* Post Form */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Join the Discussion
              </CardTitle>
              <CardDescription>
                Share your views. No accounts needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="E.g. Rajesh Kumar" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / UT</Label>
                  <Select onValueChange={setState} value={state}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state or UT" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Your Views / Feedback</Label>
                  <Textarea 
                    id="content" 
                    placeholder="What do you think about the civic simulation?" 
                    className="min-h-[120px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded text-[10px] text-muted-foreground border">
                  <ShieldAlert className="w-3 h-3 shrink-0" />
                  <span>Remaining today: <strong>{remainingPosts} posts</strong></span>
                </div>

                <Button type="submit" className="w-full" disabled={remainingPosts <= 0}>
                  Submit Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Post Feed */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h3>
            <span className="text-xs text-muted-foreground">{posts?.length || 0} entries recorded</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm font-medium">Synchronizing live discussions...</p>
              </div>
            ) : posts?.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-muted-foreground italic">
                  No discussions yet. Be the first to speak up!
                </CardContent>
              </Card>
            ) : (
              posts?.map((post) => (
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
              Sarva is a collaborative simulation. Please keep discussions civil, focused on civic development, and constructive. Obscene or abusive content will be automatically filtered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
