import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Scale} from 'lucide-react';

export default function ConstitutionPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Scale className="w-12 h-12 text-primary opacity-50" />
          </div>
          <CardTitle className="text-4xl font-black tracking-tight uppercase">The Sarva Constitution</CardTitle>
          <div className="h-1 w-24 bg-primary mx-auto" />
        </CardHeader>
        <CardContent className="mt-8">
          <ScrollArea className="h-[600px] rounded-md border p-8 bg-card shadow-sm">
            <div className="prose prose-slate max-w-none space-y-8 text-foreground/90">
              <section>
                <h2 className="text-xl font-bold border-b pb-2 mb-4">Preamble</h2>
                <p className="italic leading-relaxed">
                  We, the virtual participants of the Sarva Simulation, in order to demonstrate the power of collective civic action, hereby establish this framework of simulated governance and public service.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">Article I: Non-Monetary Nature</h3>
                <p>
                  Section 1: The Sarva Simulation shall never collect, store, or process real currency. 
                </p>
                <p>
                  Section 2: All participation is voluntary and purely informational. No legal or financial obligations are created through the use of this platform.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">Article II: Transparency and Truth</h3>
                <p>
                  Section 1: Every algorithm used to calculate simulated public services must be open-source and documented.
                </p>
                <p>
                  Section 2: Real-time data aggregation shall be publicly visible to all without authentication.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">Article III: The Public Goods</h3>
                <p>
                  Section 1: The simulation prioritizes the modeling of foundational infrastructure: Education, Sanitation, Water, and Environment.
                </p>
                <p>
                  Section 2: Service allocation models must aim for equitable distribution across simulated districts, reflecting population density and regional needs.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">Article IV: Privacy and Anonymity</h3>
                <p>
                  Section 1: No personal identification data (PII) shall be collected.
                </p>
                <p>
                  Section 2: Users participate through anonymous virtual contributions, restricted only to ensure simulation integrity.
                </p>
              </section>

              <section className="pt-12 text-center text-sm text-muted-foreground border-t">
                <p>Ratified virtually by the Sarva Simulation Project Team.</p>
                <p>Last Revised: October 2023</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
