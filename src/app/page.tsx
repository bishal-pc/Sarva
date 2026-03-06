"use client";

import {useState, useEffect} from 'react';
import {DashboardStats} from '@/components/simulation/DashboardStats';
import {ContributionForm} from '@/components/simulation/ContributionForm';
import {ResourceDisplay} from '@/components/simulation/ResourceDisplay';
import {DistrictExpansion} from '@/components/simulation/DistrictExpansion';
import {calculateAllocation} from '@/lib/simulation-logic';
import {proposeDistrictExpansion, DistrictExpansionOutput} from '@/ai/flows/propose-district-expansion';
import {suggestSimulatedFundAllocation} from '@/ai/flows/suggest-simulated-fund-allocation-flow';
import {Separator} from '@/components/ui/separator';
import {Github, ExternalLink, ShieldCheck} from 'lucide-react';

// Initial dummy data to represent state
const INITIAL_STATS = {
  participants: 12430,
  pool: 783090,
};

export default function Home() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [districtData, setDistrictData] = useState<DistrictExpansionOutput | undefined>();
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const allocation = calculateAllocation(stats.pool);

  useEffect(() => {
    setMounted(true);
    // Use fixed seed or static date for hydration consistency if needed, 
    // but useEffect is safer for real current date.
    setLastUpdated(new Date().toLocaleDateString());
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
        // Silently fail as it's a simulation
      } finally {
        setLoading(false);
      }
    }
    fetchAiData();
  }, [stats.pool]);

  const handleNewContribution = (amount: number) => {
    setStats(prev => ({
      participants: prev.participants + 1,
      pool: prev.pool + amount
    }));
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-muted-foreground/60">Simulated Public Assets</h3>
              <ResourceDisplay allocation={allocation} aiSuggestion={aiSuggestion} />
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-muted-foreground/60">Growth Projection</h3>
              <DistrictExpansion data={districtData} />
            </div>
          </div>

          <aside className="space-y-8">
            <ContributionForm onSuccess={handleNewContribution} />
            
            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider">Project Metadata</h3>
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
