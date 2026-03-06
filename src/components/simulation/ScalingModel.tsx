
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SIMULATION_CONSTANTS } from '@/lib/simulation-logic';
import { Globe, Users, GraduationCap, Map, ArrowRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScalingModelProps {
  citizensNeededPerSchool: number;
  totalParticipants: number;
}

export function ScalingModel({ citizensNeededPerSchool, totalParticipants }: ScalingModelProps) {
  const districts = SIMULATION_CONSTANTS.TOTAL_DISTRICTS_INDIA;
  const citizensForTen = citizensNeededPerSchool * 10;
  const citizensForAll = citizensNeededPerSchool * districts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg">National Scaling Model</CardTitle>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4 space-y-2">
                  <p className="font-bold text-xs uppercase">How we calculate this:</p>
                  <p className="text-[10px] leading-relaxed">
                    <strong>Citizens Needed</strong> = Monthly School Cost (₹22L) ÷ Avg. Virtual Contribution.
                  </p>
                  <p className="text-[10px] leading-relaxed">
                    Scaling assumes one full Class 1-12 Sarva institution per district.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Scaling from one district to every corner of India.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border">
              <span className="text-xs font-bold uppercase text-muted-foreground">To fund 1 School</span>
              <div className="text-right">
                <div className="text-lg font-code font-bold">{citizensNeededPerSchool.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Citizens Needed</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border">
              <span className="text-xs font-bold uppercase text-muted-foreground">To fund 10 Schools</span>
              <div className="text-right">
                <div className="text-lg font-code font-bold">{citizensForTen.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Citizens Needed</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <span className="text-xs font-bold uppercase text-primary">1 School in Every District</span>
              <div className="text-right">
                <div className="text-lg font-code font-bold text-primary">{citizensForAll.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">~{(citizensForAll / 10000000).toFixed(2)} Crore Citizens</div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2 border-t">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <Map className="w-4 h-4" />
              District Coverage Target: {districts}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Based on {districts} districts, providing quality education to approximately {(districts * 360 / 100000).toFixed(1)} Lakh children simultaneously (360 per school).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-orange-500" />
            <CardTitle className="text-lg">The Sarva Fellow Model</CardTitle>
          </div>
          <CardDescription>
            Recruiting India's brightest UPSC and KV aspirants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50/50 p-4 rounded-lg border border-orange-100 space-y-3">
            <h4 className="text-xs font-black uppercase text-orange-700 tracking-wider">Aspirant Pipeline</h4>
            <p className="text-xs leading-relaxed text-orange-900/80">
              Every year, millions of high-caliber graduates prepare for UPSC and KVS exams. Only a fraction are selected due to seat scarcity. Sarva recruits these toppers as **"Sarva Fellows"**.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-[11px] font-medium text-orange-800">
                <ArrowRight className="w-3 h-3 shrink-0" />
                Dignified salary (₹35k-₹55k) while they prepare.
              </li>
              <li className="flex gap-2 text-[11px] font-medium text-orange-800">
                <ArrowRight className="w-3 h-3 shrink-0" />
                Direct impact on grassroots civic development.
              </li>
              <li className="flex gap-2 text-[11px] font-medium text-orange-800">
                <ArrowRight className="w-3 h-3 shrink-0" />
                Intellectual environment suited for continued study.
              </li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg bg-muted/10">
            <h4 className="text-xs font-bold uppercase mb-2 text-muted-foreground">Impact Logic</h4>
            <p className="text-[11px] text-muted-foreground leading-tight">
              By utilizing the massive pool of qualified UPSC/KV aspirants, we solve the "quality teacher" problem while providing meaningful livelihoods to our nation's intellectual capital.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
