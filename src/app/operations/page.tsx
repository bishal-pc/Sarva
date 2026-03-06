import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {CheckCircle2, ArrowRight, School, MapPin, Layers} from 'lucide-react';

export default function OperationsPage() {
  const targets = SIMULATION_CONSTANTS.OPERATIONAL_TARGETS;

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Operational Roadmap</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The blueprint for converting virtual contributions into complete, self-sustaining civic institutions.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Sector: Guwahati</span>
              </div>
              <CardTitle className="text-2xl">Phase 1: Kamrup Metropolitan</CardTitle>
              <CardDescription>
                Our first simulated school is targeted for the Kamrup Metro district in Assam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-muted">
                {/* Target 1 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_8.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_8.description}</p>
                    <div className="bg-muted/30 p-3 rounded text-sm font-code">
                      Monthly Pool Required: ₹{targets.CLASS_8.monthlyRequirement.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Target 2 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold border-2">2</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_10.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_10.description}</p>
                    <div className="bg-muted/30 p-3 rounded text-sm font-code">
                      Monthly Pool Required: ₹{targets.CLASS_10.monthlyRequirement.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Target 3 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold border-2">3</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_12.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_12.description}</p>
                    <div className="bg-muted/30 p-3 rounded text-sm font-code">
                      Monthly Pool Required: ₹{targets.CLASS_12.monthlyRequirement.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                The Expansion Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Sarva operates on a <strong>Serial Completion Model</strong>. We do not spread resources thin across hundreds of half-finished projects. Instead, we focus on completing one institution at a time.
              </p>
              <p>
                Once a school reaches <strong>Milestone 3 (Class 12)</strong> and its monthly operational funding is secured in the virtual pool, additional funds are automatically diverted to start a new institution in a nearby district.
              </p>
              <div className="flex items-center justify-center gap-4 py-4 text-primary font-bold">
                <span>Kamrup Metro</span>
                <ArrowRight className="w-4 h-4" />
                <span>Kamrup Rural</span>
                <ArrowRight className="w-4 h-4" />
                <span>Darrang</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Standard School Unit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Classrooms</span>
                  <span className="font-bold">12–16</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Teachers (Avg)</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Sanitation Staff</span>
                  <span className="font-bold">4</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>RO Water Capacity</span>
                  <span className="font-bold">1000 LPH</span>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h5 className="text-[10px] font-bold uppercase text-muted-foreground">Monthly Expense Breakdown</h5>
                <div className="space-y-1 text-xs font-code">
                  <div className="flex justify-between">
                    <span>Salaries</span>
                    <span>75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supplies</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary text-primary-foreground p-6 rounded-lg space-y-4">
            <School className="w-8 h-8 opacity-50" />
            <h4 className="font-bold">Zero Overhead Policy</h4>
            <p className="text-xs leading-relaxed opacity-80">
              In this simulation, we assume zero administrative leakage. 100% of the virtual contribution is mapped directly to the school's operational capacity.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
