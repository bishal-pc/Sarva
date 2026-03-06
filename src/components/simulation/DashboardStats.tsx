"use client";

import {Card, CardContent} from '@/components/ui/card';
import {Users, IndianRupee, TrendingUp} from 'lucide-react';

interface StatsProps {
  totalParticipants: number;
  totalPool: number;
}

export function DashboardStats({totalParticipants, totalPool}: StatsProps) {
  const average = totalParticipants > 0 ? totalPool / totalParticipants : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-primary/5 rounded-full text-primary">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
            <p className="text-2xl font-bold font-code">{totalParticipants.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-primary/5 rounded-full text-primary">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Virtual Pool</p>
            <p className="text-2xl font-bold font-code">₹{totalPool.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-primary/5 rounded-full text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg. Contribution</p>
            <p className="text-2xl font-bold font-code">₹{average.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
