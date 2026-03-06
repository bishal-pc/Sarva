"use client";

import {useState, useEffect} from 'react';
import {DashboardStats} from '@/components/simulation/DashboardStats';
import {ContributionForm} from '@/components/simulation/ContributionForm';
import {ResourceDisplay} from '@/components/simulation/ResourceDisplay';
import {DistrictExpansion} from '@/components/simulation/DistrictExpansion';
import {ScalingModel} from '@/components/simulation/ScalingModel';
import {calculateAllocation, SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {proposeDistrictExpansion, DistrictExpansionOutput} from '@/ai/flows/propose-district-expansion';
import {suggestSimulatedFundAllocation} from '@/ai/flows/suggest-simulated-fund-allocation-flow';
import {Separator} from '@/components/ui/separator';
import {Github, ExternalLink, ShieldCheck, Wallet, Info} from 'lucide-react';

const INITIAL_STATS = {
  participants: 0,
  pool: 0,
};

export default function Home() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [districtData, setDistrictData] = useState<DistrictExpansionOutput | undefined>();
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const allocation = calculateAllocation(stats.pool, stats.participants);

  useEffect(() => {
    setMounted(true);
    setLastUpdated(new Date().toLocaleDateString());
    
    // Load persisted stats if any (simulating a backend with local storage for this demo)
    const savedStats = localStorage.getItem('sarva_sim_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    async function fetchAiData() {
      setLoading(true);
      try {
        const [districts, suggestion] = await Promise.all([
          proposeDistrictExpansion({totalSimulatedFunds: stats.pool}),
          suggestSimulatedFundAllocation({totalVirtualPool: stats.pool})
        ]);
        setDistrictData(districts);
        setAiSuggestion(suggestion.suggestion);
      } catch (e) {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    // Only fetch if there's some pool data or it's the first load
    if (stats.pool > 0 || !districtData) {
      fetchAiData();
    }
  }, [stats.pool]);

  const handleNewContribution = (amount: number) => {
    setStats(prev => {
      const newStats = {
        participants: prev.participants + 1,
        pool: prev.pool + amount
      };
      localStorage.setItem('sarva_sim_stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
      {/* Hero Section */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
          <ShieldCheck className="w-3 h-3" />
          Transparency Simulation
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-primary">
          Sarva Civic Simulation
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          "What could India build if citizens contributed together?"
        </p>
        <div className="bg-card p-6 rounded-lg border shadow-sm text-left border-l-4 border-l-primary">
          <p className="text-sm leading-relaxed text-foreground/80">
            <strong>This is a simulation experiment.</strong> No real money is collected or requested. 
            The purpose of this platform is to demonstrate the collective civic potential of India by converting 
            hypothetical contributions into simulated public infrastructure and services.
          </p>
        </div>
      </header>

      {/* Dashboard Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Real-time Simulation Dashboard</h2>
            <p className="text-sm text-muted-foreground">Aggregated data from {stats.participants.toLocaleString()} virtual participants.</p>
          </div>
        </div>
        
        <DashboardStats totalParticipants={stats.participants} totalPool={stats.pool} />

        {/* Progress Metric */}
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <div className="text-sm">
              <span className="font-bold">Next School Progress:</span> ₹{(stats.pool % SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement).toLocaleString()} / ₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement.toLocaleString()}
            </div>
          </div>
          <div className="text-sm font-bold text-primary flex items-center gap-2">
            ₹{allocation.remainingForNextSchool.toLocaleString()} <span className="text-[10px] uppercase font-normal text-muted-foreground">to go for next institution</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-muted-foreground/60">Simulated Public Assets</h3>
              <ResourceDisplay allocation={allocation} aiSuggestion={aiSuggestion} />
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-widest text-muted-foreground/60">National Scaling & Recruitment</h3>
              <ScalingModel 
                allocation={allocation} 
                totalParticipants={stats.participants}
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-muted-foreground/60">Growth Projection</h3>
              <DistrictExpansion data={districtData} />
            </div>
          </div>

          <aside className="space-y-8">
            <ContributionForm onSuccess={handleNewContribution} />
            
            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-wider">Setup Cost Milestones</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                    <span>Full Capacity School</span>
                    <span>₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost.toLocaleString()}</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{width: `${Math.min(100, (stats.pool / SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.setupCost) * 100)}%`}}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                    <span>Middle School Setup</span>
                    <span>₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.setupCost.toLocaleString()}</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{width: `${Math.min(100, (stats.pool / SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_8.setupCost) * 100)}%`}}></div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground italic">One-time capital expenditure per simulated institution.</p>
              </div>
              
              <Separator />

              <div className="space-y-3 font-code text-xs">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Version</span>
                  <span>v1.0.4-sim</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{mounted ? lastUpdated : 'Loading...'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Git Hash</span>
                  <span className="text-secondary">7af2b91</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Repository</span>
                  <a href="#" className="flex items-center gap-1 hover:underline text-primary">
                    sarva-sim <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Transparency / Github */}
      <section className="text-center pt-12 border-t">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Github className="w-10 h-10 opacity-20" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sarva is an open-source initiative. Our logic, aggregation algorithms, and simulation constants are fully transparent and publicly auditable. 
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            View Public Repository <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}