"use client";

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {ArrowRight, School, MapPin, Layers, Info, Trash2, Sparkles, Award, Droplets, Users, Wind, Waves, FlaskConical, Bed} from 'lucide-react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

export default function OperationsPage() {
  const targets = SIMULATION_CONSTANTS.OPERATIONAL_TARGETS;
  const bd = SIMULATION_CONSTANTS.DETAILED_BREAKDOWN;

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
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Sector: Guwahati</span>
                </div>
                <CardTitle className="text-2xl">Phase 1: Kamrup Metropolitan</CardTitle>
                <CardDescription>
                  Our first simulated school is targeted for the Kamrup Metro district in Assam.
                </CardDescription>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Breakdown
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col overflow-hidden gap-0">
                  <DialogHeader className="p-6 border-b shrink-0">
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Financial & Operational Breakdown</DialogTitle>
                  </DialogHeader>
                  
                  <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-12">
                    {/* Academic Staff */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">1. Academic Staff (Class 1-10)</h4>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Level</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Monthly Salary</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bd.TEACHERS.map((t, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{t.level}</TableCell>
                              <TableCell>{t.count}</TableCell>
                              <TableCell>₹{t.salary.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-code font-bold">₹{t.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </section>

                    {/* Senior Secondary Streams */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">2. Senior Secondary Streams (Class 11-12)</h4>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Stream</TableHead>
                            <TableHead>Teachers</TableHead>
                            <TableHead>Monthly Salary</TableHead>
                            <TableHead className="text-right">Total Monthly</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bd.STREAMS.map((s, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-bold">
                                {s.name}
                                <div className="text-[10px] text-muted-foreground font-normal">{s.description}</div>
                              </TableCell>
                              <TableCell>{s.count}</TableCell>
                              <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-code font-bold">₹{s.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </section>

                    {/* Boarding & Hostel */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">3. Boarding & Hostel (300 Students)</h4>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Item</TableHead>
                            <TableHead>Unit/Count</TableHead>
                            <TableHead>Rate/Monthly</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bd.BOARDING.map((b, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{b.item}</TableCell>
                              <TableCell>{b.count}</TableCell>
                              <TableCell>₹{b.rate.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-code font-bold">₹{b.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </section>

                    {/* Non-Teaching Staff */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">4. Non-Teaching Staff</h4>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Role</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Monthly Salary</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bd.STAFF.map((s, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{s.role}</TableCell>
                              <TableCell>{s.count}</TableCell>
                              <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-code font-bold">₹{s.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </section>

                    {/* Infrastructure */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">5. Infrastructure & Utilities (Monthly)</h4>
                      <Table>
                        <TableBody>
                          {bd.INFRASTRUCTURE.map((i, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{i.item}</TableCell>
                              <TableCell className="text-right font-code font-bold">₹{i.monthly.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-primary/5 font-black">
                            <TableCell className="uppercase">Total Monthly Operating Cost (Full Capacity)</TableCell>
                            <TableCell className="text-right font-code text-primary">₹{SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement.toLocaleString()}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </section>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-muted">
                {/* Target 1 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_8.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_8.description}</p>
                    <div className="flex gap-2">
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Monthly: ₹{targets.CLASS_8.monthlyRequirement.toLocaleString()}
                      </div>
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Setup: ₹{targets.CLASS_8.setupCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target 2 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold border-2">2</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_10.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_10.description}</p>
                    <div className="flex gap-2">
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Monthly: ₹{targets.CLASS_10.monthlyRequirement.toLocaleString()}
                      </div>
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Setup: ₹{targets.CLASS_10.setupCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target 3 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold border-2">3</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{targets.CLASS_12.label}</h4>
                    <p className="text-sm text-muted-foreground">{targets.CLASS_12.description}</p>
                    <div className="flex gap-2">
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Monthly: ₹{targets.CLASS_12.monthlyRequirement.toLocaleString()}
                      </div>
                      <div className="bg-muted/30 p-2 rounded text-[10px] font-code">
                        Setup: ₹{targets.CLASS_12.setupCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* ... rest of the file ... */}
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

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-emerald-500" />
                Sarva Swachata: The Cleanliness Wing
              </CardTitle>
              <CardDescription>
                Systematic allocation of surplus funds for dignified urban sanitation and community accountability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                As educational institutions reach self-sustaining virtual funding, surplus contributions are directed to the **Sarva Swachata** wing. This wing focuses on transforming the physical health and dignity of our towns through structured civic maintenance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-foreground">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Dignified Sanitation Force
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Appointing full-time, salaried sanitation workers with fair wages and protective equipment. We move from informal waste handling to a respected, professionalized civic force.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Street-Level Organization
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every town is mapped into specific street sectors. Teams are organized and assigned specific streets and drains, ensuring 100% coverage and clear accountability for cleanliness.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-foreground">
                    <Droplets className="w-4 h-4 text-emerald-600" />
                    Drainage & Infrastructure
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Regular desilting and maintenance of public drains to prevent waterlogging and health hazards. We ensure that the "invisible" infrastructure of our city remains clean and functional.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-foreground">
                    <Award className="w-4 h-4 text-emerald-600" />
                    Recognition & Incentives
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Streets that maintain standard cleanliness benchmarks receive collective recognition. Residents are incentivized through public accolades and simulated "Model Street" credits.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-900">Surplus Impact Strategy</p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    When the virtual pool exceeds local educational needs, the simulation automatically prioritizes the "Sarva Swachata" model, ensuring that children studying in Sarva schools also live in a clean, hygienic environment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-400 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wind className="w-5 h-5 text-blue-400" />
                  Sarva Vayu: Clean Air Research
                </CardTitle>
                <CardDescription className="text-xs">
                  Advanced R&D for air purifying and pollution reduction technologies.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  With education and cleanliness secured, secondary surplus is diverted to **Sarva Vayu**. This wing funds research into low-cost air purification systems and pollution-reducing urban furniture.
                </p>
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold uppercase text-foreground flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-blue-500" />
                    Current R&D Focus
                  </h5>
                  <ul className="text-[10px] text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Hyper-local air monitoring networks</li>
                    <li>Bio-filter wall installations for schools</li>
                    <li>Smog-reduction street lighting modules</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Waves className="w-5 h-5 text-cyan-500" />
                  Sarva Jal: Harvesting Zones
                </CardTitle>
                <CardDescription className="text-xs">
                  Developing community-scale rainwater harvesting and water security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The final tier of surplus funding activates **Sarva Jal**, which focuses on water sovereignty. We transform public land into functional water harvesting zones that recharge local aquifers.
                </p>
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold uppercase text-foreground flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-cyan-500" />
                    Infrastructure Targets
                  </h5>
                  <ul className="text-[10px] text-muted-foreground space-y-1 list-disc list-inside">
                    <li>School-based filtration & storage systems</li>
                    <li>Public "Jal Kendras" (Water Hubs)</li>
                    <li>Integrated urban aquifer recharge wells</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Standard School Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Total Students</span>
                  <span className="font-bold">540</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Boarding Students</span>
                  <span className="font-bold text-primary">300</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Teachers (Full)</span>
                  <span className="font-bold">34</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Support & Mess Staff</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Streams Offered</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h5 className="text-[10px] font-bold uppercase text-muted-foreground">Operating Cost Per Student</h5>
                <div className="text-xl font-code font-bold text-primary">₹6,707<span className="text-[10px] font-normal text-muted-foreground">/mo</span></div>
                <p className="text-[10px] text-muted-foreground italic">Inclusive of boarding, food, and high-quality Class 1-12 education.</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary text-primary-foreground p-6 rounded-lg space-y-4">
            <Bed className="w-8 h-8 opacity-50" />
            <h4 className="font-bold">Holistic Boarding Model</h4>
            <p className="text-xs leading-relaxed opacity-80">
              The boarding model ensures that children from remote areas have access to quality education, safe housing, and nutritious meals at zero cost to their families.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
