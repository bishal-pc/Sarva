import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {FileText} from 'lucide-react';

export default function ManifestoPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-secondary opacity-50" />
          </div>
          <CardTitle className="text-4xl font-black tracking-tight uppercase">The Sarva Manifesto</CardTitle>
          <p className="text-muted-foreground italic">"Collective action for a simulated tomorrow."</p>
        </CardHeader>
        <CardContent className="mt-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-lg bg-card shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-primary">The Core Thesis</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                India is a land of vast human potential. If millions contributed even the price of a cup of tea every month, the structural change we could witness would be unprecedented. Sarva is the mathematical proof of that possibility.
              </p>
            </div>
            <div className="p-8 border rounded-lg bg-card shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-primary">Why a Simulation?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Often, we fail to act because we cannot see the impact of our micro-contributions. By visualizing the macro-scale effects of individual virtual donations, we bridge the gap between imagination and institutional reality.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-8 text-center py-8">
            <h3 className="text-2xl font-bold tracking-tight">Our Principles</h3>
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">1</div>
                <div>
                  <h4 className="font-bold">Radical Accountability</h4>
                  <p className="text-sm text-muted-foreground">Every rupee simulated must be accounted for in a service. No overhead, no leakage, no bureaucracy—just pure conversion of contribution to civic asset.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">2</div>
                <div>
                  <h4 className="font-bold">Digital First, Citizen Centric</h4>
                  <p className="text-sm text-muted-foreground">Governance is a service. Citizens are the stakeholders. The platform must be as simple as a dashboard because that is how a nation should feel.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">3</div>
                <div>
                  <h4 className="font-bold">Transparent Algorithms</h4>
                  <p className="text-sm text-muted-foreground">The logic of resource allocation is not a secret. It is a shared formula that anyone can scrutinize, improve, and fork.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground p-12 rounded-xl text-center space-y-6">
            <h3 className="text-3xl font-black">Imagine the Impossible.</h3>
            <p className="max-w-lg mx-auto text-primary-foreground/80">
              Sarva is not a product; it is a conversation. Join the simulation and help us define what a citizen-funded India could look like.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
