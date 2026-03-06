"use client";

import {ResourceAllocation} from '@/lib/simulation-logic';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {School, GraduationCap, Trash2, Droplets, FlaskConical} from 'lucide-react';

export function ResourceDisplay({allocation, aiSuggestion}: {allocation: ResourceAllocation, aiSuggestion?: string}) {
  const resources = [
    {label: 'New Schools', value: allocation.schools, icon: School, color: 'text-blue-600'},
    {label: 'Teachers Hired', value: allocation.teachers, icon: GraduationCap, color: 'text-indigo-600'},
    {label: 'Sanitation Workers', value: allocation.sanitationWorkers, icon: Trash2, color: 'text-emerald-600'},
    {label: 'Water Hubs', value: allocation.waterHubs, icon: Droplets, color: 'text-cyan-600'},
    {label: 'Air Quality Research', value: allocation.airResearchUnits, icon: FlaskConical, color: 'text-purple-600'},
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {resources.map((res) => (
          <Card key={res.label} className="text-center overflow-hidden">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full gap-2">
              <res.icon className={`w-8 h-8 ${res.color}`} />
              <div className="font-bold text-2xl font-code">{res.value}</div>
              <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-widest">{res.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {aiSuggestion && (
        <Card className="bg-accent/30 border-none shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Strategic AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-foreground/80 leading-relaxed">
              "{aiSuggestion}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
