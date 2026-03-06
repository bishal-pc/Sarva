"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SIMULATION_CONSTANTS, ResourceAllocation } from '@/lib/simulation-logic';
import { Globe, GraduationCap, Map, ArrowRight, Info, IndianRupee, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';

interface ScalingModelProps {
  allocation: ResourceAllocation;
  totalParticipants: number;
}

export function ScalingModel({ allocation, totalParticipants }: ScalingModelProps) {
  const [perCitizenAmount, setPerCitizenAmount] = useState([10]);
  const districts = SIMULATION_CONSTANTS.TOTAL_DISTRICTS_INDIA;
  
  // Dynamic calculations based on user input
  const amount = perCitizenAmount[0];
  const dynamicNeededClass8 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.monthlyRequirement / amount);
  const dynamicNeededClass10 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.monthlyRequirement / amount);
  const dynamicNeededClass12 = Math.ceil(SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement / amount);
  const dynamicCitizensForAll = dynamicNeededClass12 * districts;

  // Time to collect setup cost (in months)
  // To make this dynamic and show efficiency gains, we use a fixed benchmark of 1 Lakh (100,000) citizens.
  const benchmark = 100000;
  const timeClass8 = (SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.setupCost / (benchmark * amount)).toFixed(1);
  const timeClass10 = (SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_10.setupCost / (benchmark * amount)).toFixed(1);
  const timeClass12 = (SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost / (benchmark * amount)).toFixed(1);

  // National impact stats
  const totalStudents = districts * 540;
  const totalTeachers = districts * 34;
  const totalStaff = districts * 8;
  const monthlyPayroll = districts * 1865000; // Total staff + teacher monthly salary per school

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
                    <strong>Sustenance:</strong> Number of citizens required to meet the monthly operating budget at ₹{amount}/month.
                  </p>
                  <p className="text-[10px] leading-relaxed">
                    <strong>Setup Phase:</strong> Time required for a benchmark population of 1 Lakh citizens to raise the initial capital at ₹{amount}/month.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Adjust the slider to see how many citizens are needed if everyone contributes a specific monthly amount.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Interaction Slider */}
          <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                <IndianRupee className="w-3 h-3" />
                Per-Citizen Contribution
              </label>
              <span className="text-lg font-code font-black text-primary">₹{amount}</span>
            </div>
            <Slider
              value={perCitizenAmount}
              onValueChange={setPerCitizenAmount}
              max={10000}
              min={10}
              step={10}
              className="py-4"
            />
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
              <span>Min: ₹10</span>
              <span>Max: ₹10,000</span>
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
                      <Clock className="w-2 h-2" /> ~{timeClass8} Months
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
                      <Clock className="w-2 h-2" /> ~{timeClass10} Months
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
                <span className="text-xs font-bold uppercase text-muted-foreground">Full Class 12 (3 Streams)</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">Monthly: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement.toLocaleString()}/mo</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-primary/70 font-semibold italic">Setup: ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost.toLocaleString()}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-1 rounded flex items-center gap-0.5">
                      <Clock className="w-2 h-2" /> ~{timeClass12} Months
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

          <div className="pt-4 space-y-2 border-t">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <Map className="w-4 h-4" />
              District Coverage Target: {districts}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Based on {districts} districts, providing quality education to approximately {(totalStudents / 100000).toFixed(1)} Lakh children simultaneously (540 per school).
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Employing {totalTeachers.toLocaleString()} teachers and {totalStaff.toLocaleString()} non-teaching staff, paying ₹{(monthlyPayroll / 10000000).toFixed(2)} Crore in monthly salaries across India.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500 h-fit">
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
