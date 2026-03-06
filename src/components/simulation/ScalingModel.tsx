
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SIMULATION_CONSTANTS, ResourceAllocation } from '@/lib/simulation-logic';
import { Globe, GraduationCap, Map, ArrowRight, Info, IndianRupee, Clock, Zap, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface ScalingModelProps {
  allocation: ResourceAllocation;
  totalParticipants: number;
}

export function ScalingModel({ allocation, totalParticipants }: ScalingModelProps) {
  const [perCitizenAmount, setPerCitizenAmount] = useState([500]);
  const districts = SIMULATION_CONSTANTS.TOTAL_DISTRICTS_INDIA;
  
  // Dynamic calculations based on scaling input
  const amount = perCitizenAmount[0];
  const dynamicNeededClass8 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.monthlyRequirement / amount);
  const dynamicNeededClass10 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.monthlyRequirement / amount);
  const dynamicNeededClass12 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement / amount);
  const dynamicCitizensForAll = dynamicNeededClass12 * districts;

  // Current community impact (Total Participants * Scaling Amount)
  const currentMonthlyPool = totalParticipants * amount;
  const fullSchoolsFunded = Math.floor(currentMonthlyPool / SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement);
  const remainingForNext = SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement - (currentMonthlyPool % SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement);

  // Helper function to calculate setup time based on the required sustenance group
  function calculateSetupTime(setupCost: number, citizensNeeded: number) {
    // Logic: once a group of 'citizensNeeded' exists, their monthly pool equals the milestone requirement
    const monthlyPool = citizensNeeded * amount;
    return setupCost / monthlyPool;
  }

  const timeClass8 = calculateSetupTime(
    SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.setupCost,
    dynamicNeededClass8
  );

  const timeClass10 = calculateSetupTime(
    SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.setupCost,
    dynamicNeededClass10
  );

  const timeClass12 = calculateSetupTime(
    SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost,
    dynamicNeededClass12
  );

  // National impact stats
  const totalStudents = districts * 540;
  const totalTeachers = districts * 34;
  const totalStaff = districts * 12;
  const monthlyPayroll = districts * (SIMULATION_CONSTANTS.DETAILED_BREAKDOWN.TEACHERS.reduce((acc, t) => acc + t.total, 0) + 
                                     SIMULATION_CONSTANTS.DETAILED_BREAKDOWN.STREAMS.reduce((acc, s) => acc + s.total, 0) + 
                                     SIMULATION_CONSTANTS.DETAILED_BREAKDOWN.STAFF.reduce((acc, s) => acc + s.total, 0));

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
                  <p className="font-bold text-xs uppercase">Calculation Logic:</p>
                  <p className="text-[10px] leading-relaxed">
                    <strong>Sustenance:</strong> Total citizens required to meet the monthly operating budget at ₹{amount}/month.
                  </p>
                  <p className="text-[10px] leading-relaxed">
                    <strong>Setup Phase:</strong> Estimated months for the <u>required sustenance group</u> to raise the setup capital at ₹{amount}/month.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Adjust the slider or enter an amount to see the scaling potential.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Interaction Control */}
          <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex justify-between items-end mb-2">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <IndianRupee className="w-3 h-3" />
                  Monthly Scaling Level
                </label>
                <p className="text-[10px] text-muted-foreground italic">Hypothetical contribution per citizen</p>
              </div>
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                <Input 
                  type="number"
                  value={amount}
                  onChange={(e) => setPerCitizenAmount([Math.min(10000, Math.max(1, Number(e.target.value)))])}
                  className="pl-7 font-code font-black text-right text-lg h-10 border-primary/20"
                />
              </div>
            </div>
            <Slider
              value={perCitizenAmount}
              onValueChange={setPerCitizenAmount}
              max={SIMULATION_CONSTANTS.MAX_CONTRIBUTION}
              min={SIMULATION_CONSTANTS.MIN_CONTRIBUTION}
              step={10}
              className="py-4"
            />
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
              <span>Min: ₹{SIMULATION_CONSTANTS.MIN_CONTRIBUTION}</span>
              <span>Visualization Max: ₹{SIMULATION_CONSTANTS.MAX_CONTRIBUTION.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Milestone 1 */}
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-muted-foreground">Class 1-8 Milestone</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Monthly: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.monthlyRequirement.toLocaleString()}/mo</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-primary/70 font-semibold italic">Setup: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.setupCost.toLocaleString()}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-1 rounded flex items-center gap-0.5">
                      <Clock className="w-2 h-2" /> ~{timeClass8.toFixed(1)} Months
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-code font-bold">{dynamicNeededClass8.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Citizens Needed</div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-muted-foreground">Class 1-10 Milestone</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Monthly: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.monthlyRequirement.toLocaleString()}/mo</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-primary/70 font-semibold italic">Setup: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.setupCost.toLocaleString()}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-1 rounded flex items-center gap-0.5">
                      <Clock className="w-2 h-2" /> ~{timeClass10.toFixed(1)} Months
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-code font-bold">{dynamicNeededClass10.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Citizens Needed</div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-muted-foreground">Full Class 12 + Boarding</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Monthly: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement.toLocaleString()}/mo</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-primary/70 font-semibold italic">Setup: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost.toLocaleString()}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-1 rounded flex items-center gap-0.5">
                      <Clock className="w-2 h-2" /> ~{timeClass12.toFixed(1)} Months
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-code font-bold">{dynamicNeededClass12.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Citizens Needed</div>
              </div>
            </div>

            {/* Total National Goal */}
            <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest">1 School in Every District</span>
              <div className="text-right">
                <div className="text-2xl font-code font-black">{dynamicCitizensForAll.toLocaleString()}</div>
                <div className="text-[10px] uppercase font-medium opacity-80">
                  ~{(dynamicCitizensForAll / 10000000).toFixed(2)} Crore Citizens
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Current Community Impact Section */}
        <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-emerald-50/20">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-emerald-500" />
              <CardTitle className="text-lg">Current Community Impact</CardTitle>
            </div>
            <CardDescription className="text-xs">
              What our current {totalParticipants.toLocaleString()} simulation participants could fund at ₹{amount}/month.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Monthly Pool</p>
                <p className="text-2xl font-code font-black text-emerald-700">₹{currentMonthlyPool.toLocaleString()}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Full Schools Funded</p>
                <p className="text-2xl font-code font-black text-emerald-700">{fullSchoolsFunded}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-muted-foreground">Progress to Next Institution</span>
                <span className="text-emerald-700">₹{(currentMonthlyPool % SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement).toLocaleString()} / ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{width: `${Math.min(100, ((currentMonthlyPool % SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement) / SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement) * 100)}%`}}
                ></div>
              </div>
              <p className="text-[9px] text-muted-foreground italic text-center">
                Need ₹{remainingForNext.toLocaleString()} more in the monthly pool to fund an additional school.
              </p>
            </div>

            {fullSchoolsFunded > 0 && (
              <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                  <strong>Simulation Tip:</strong> At this scaling level, our current virtual community is strong enough to sustain <strong>{fullSchoolsFunded}</strong> full-capacity Class 12 boarding institutions every single month.
                </p>
              </div>
            )}
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
                Every year, millions of high-caliber graduates prepare for UPSC and KVS exams. Sarva recruits these toppers as **"Sarva Fellows"**.
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
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/10">
              <h4 className="text-xs font-bold uppercase mb-2 text-muted-foreground">Impact Logic</h4>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Utilizing qualified UPSC/KV aspirants solves the "quality teacher" problem while providing livelihoods to intellectual capital.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="pt-2 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase px-2">
            <Map className="w-4 h-4" />
            National Reach: {districts} Districts
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed px-2">
            Scaling to one school per district would serve {(totalStudents / 100000).toFixed(1)} Lakh children and pay ₹{(monthlyPayroll / 10000000).toFixed(2)} Crore in monthly salaries.
          </p>
        </div>
      </div>
    </div>
  );
}
