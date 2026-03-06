import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Landmark, AlertCircle, Calendar} from 'lucide-react';

export default function LedgerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter">Public Simulation Ledger</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete transparency on the non-monetary nature of the Sarva Simulation project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Total Real Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-code font-bold">₹0.00</div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-code font-bold">Simulation</div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-code font-bold">6–12 Months</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-secondary" />
            Verification Status
          </CardTitle>
          <CardDescription>
            Audit details for the current simulation window.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-6 bg-muted/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Non-Monetary Declaration
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This platform does not possess, manage, or solicit actual currency. Any amounts displayed on the dashboard are purely representational based on user inputs. No bank accounts, payment gateways, or wallets are integrated into this system.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Simulation Roadmap
            </h3>
            <div className="relative border-l-2 border-primary/20 ml-2 pl-6 space-y-8">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="font-bold">Phase 1: Public Input Gathering (Current)</div>
                <p className="text-sm text-muted-foreground">Collecting virtual contribution data to model potential scale.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-muted border-4 border-background" />
                <div className="font-bold opacity-50">Phase 2: District Modeling</div>
                <p className="text-sm text-muted-foreground opacity-50">Deep-dive into specific state-level service allocation logic.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-muted border-4 border-background" />
                <div className="font-bold opacity-50">Phase 3: Impact Report</div>
                <p className="text-sm text-muted-foreground opacity-50">Final simulation results shared with civic planning experts.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
