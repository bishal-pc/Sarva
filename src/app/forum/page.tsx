"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, MapPin, Calendar, ShieldAlert } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

const POST_LIMIT = 5;

interface ForumPost {
  id: string;
  name: string;
  state: string;
  content: string;
  createdAt: string;
}

export default function ForumPage() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [remainingPosts, setRemainingPosts] = useState(POST_LIMIT);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing posts from local storage for simulation purposes
    const savedPosts = localStorage.getItem('sarva_forum_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    // Check rate limit
    updateRateLimit();
  }, []);

  const updateRateLimit = () => {
    const limitData = JSON.parse(localStorage.getItem('sarva_forum_limit') || '{"count": 0, "date": ""}');
    const today = new Date().toLocaleDateString();
    
    if (limitData.date !== today) {
      setRemainingPosts(POST_LIMIT);
    } else {
      setRemainingPosts(Math.max(0, POST_LIMIT - limitData.count));
    }
  };

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
      if (limitData.count >= POST_LIMIT) {
        toast({
          variant: "destructive",
          title: "Limit Reached",
          description: "You have reached the daily limit of 5 posts. Please come back tomorrow.",
        });
        return;
      }
      newCount = limitData.count + 1;
    }

    const newPost: ForumPost = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      state,
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('sarva_forum_posts', JSON.stringify(updatedPosts));
    localStorage.setItem('sarva_forum_limit', JSON.stringify({ count: newCount, date: today }));
    
    setRemainingPosts(POST_LIMIT - newCount);
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
            <span className="text-xs text-muted-foreground">{posts.length} entries recorded</span>
          </div>

          <div className="space-y-4">
            {posts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-muted-foreground italic">
                  No discussions yet. Be the first to speak up!
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
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
                            {new Date(post.createdAt).toLocaleDateString()}
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
