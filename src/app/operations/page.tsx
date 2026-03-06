"use client";

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {SIMULATION_CONSTANTS} from '@/lib/simulation-logic';
import {ArrowRight, School, MapPin, Layers, Info} from 'lucide-react';
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

                    {/* Non-Teaching Staff */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">3. Non-Teaching Staff</h4>
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
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">4. Infrastructure & Utilities (Monthly)</h4>
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

                    {/* One-time Setup */}
                    <section className="space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-sm border-b pb-2">5. One-Time Setup Costs (Estimated ₹60-65 Lakh)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        {bd.ONE_TIME_SETUP.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 border rounded bg-muted/20">
                            <span className="text-xs font-bold uppercase text-muted-foreground">{item.item}</span>
                            <span className="font-code font-bold text-sm">₹{item.cost.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
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
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Standard School Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Total Students</span>
                  <span className="font-bold">540</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Teachers (Full)</span>
                  <span className="font-bold">33</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Support Staff</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span>Streams Offered</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h5 className="text-[10px] font-bold uppercase text-muted-foreground">Operating Cost Per Student</h5>
                <div className="text-xl font-code font-bold text-primary">₹3,815<span className="text-[10px] font-normal text-muted-foreground">/mo</span></div>
                <p className="text-[10px] text-muted-foreground italic">Significantly lower than average private institutions with comparable standards.</p>
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
