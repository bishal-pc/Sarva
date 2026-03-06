"use client";

import {ResourceAllocation} from '@/lib/simulation-logic';
import {Card, CardContent} from '@/components/ui/card';
import {School, GraduationCap, Trash2, Droplets, FlaskConical} from 'lucide-react';

export function ResourceDisplay({allocation}: {allocation: ResourceAllocation}) {
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
    </div>
  );
}
