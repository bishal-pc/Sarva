"use client";

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {MapPin, Milestone, ArrowRight, ShieldCheck, Landmark} from 'lucide-react';

const ROADMAP_PHASES = [
  {
    phase: "Phase 1: Foundation",
    title: "Public Input & Data Gathering",
    status: "Active",
    description: "Collecting virtual contribution data from millions of citizens to demonstrate macro-scale potential and validate the mathematical model.",
    icon: ShieldCheck,
  },
  {
    phase: "Phase 2: Modeling",
    title: "District Service Blueprints",
    status: "Planning",
    description: "Finalizing detailed operational and architectural blueprints for the first pilot institution in Kamrup Metropolitan, Assam.",
    icon: Milestone,
  },
  {
    phase: "Phase 3: Execution",
    title: "Pilot Implementation",
    status: "Future",
    description: "Transitioning from simulation to reality by deploying the first self-sustaining school and sanitation wing in a selected district.",
    icon: Landmark,
  },
  {
    phase: "Phase 4: Scaling",
    title: "National Expansion",
    status: "Vision",
    description: "Replicating the model across all 785+ districts in India using the Serial Completion Model and corporate partnerships.",
    icon: MapPin,
  }
];

export function DistrictExpansion() {
  return (
    <Card className="border-l-4 border-l-primary shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Milestone className="text-primary w-5 h-5" />
          <CardTitle>Growth Projection & Roadmap</CardTitle>
        </div>
        <CardDescription>
          Our strategic roadmap for transitioning from a civic simulation to a nationwide institutional reality.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROADMAP_PHASES.map((phase, idx) => (
            <div key={idx} className="relative p-6 rounded-lg bg-muted/30 border border-muted flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/5 rounded text-primary">
                  <phase.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                  phase.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                  phase.status === 'Planning' ? 'bg-blue-100 text-blue-700' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {phase.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{phase.phase}</p>
                <h4 className="font-bold text-lg leading-tight">{phase.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {phase.description}
              </p>
              {idx < ROADMAP_PHASES.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                   {/* Visual indicator for sequence if needed */}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-lg font-black text-primary">785+</div>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Target Districts</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-30" />
          <div className="text-center">
            <div className="text-lg font-black text-primary">2,700+</div>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Institutions</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-30" />
          <div className="text-center">
            <div className="text-lg font-black text-primary">0.1%</div>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Corporate Pledge</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
