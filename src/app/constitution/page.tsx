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
          <CardTitle className="text-4xl font-black tracking-tight uppercase underline underline-offset-8 decoration-primary/20">The Sarva Constitution</CardTitle>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Supreme Governing Document of the Sarva Public Trust</p>
        </CardHeader>
        <CardContent className="mt-8">
          <ScrollArea className="h-[800px] rounded-md border p-8 bg-card shadow-sm">
            <div className="prose prose-slate max-w-none space-y-12 text-foreground/90">
              <section className="text-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-4">The Preamble</h2>
                <div className="max-w-2xl mx-auto italic leading-relaxed text-lg border-y py-8 border-primary/10 space-y-4">
                  <p>
                    We, the citizens resolved to constitute a just and humane society, recognizing that human dignity is inseparable from certain basic conditions, affirm that education, safe drinking water, clean air, and clean public spaces are not privileges to be purchased, but essential foundations of civilized life.
                  </p>
                  <p>
                    Conscious that the denial of these essentials through wealth, power, or circumstance undermines the moral legitimacy of society, we hereby establish Sarva as an irrevocable public trust, to secure these conditions free at the point of use, through collective responsibility, restraint of personal ambition, and permanent dedication to the common good.
                  </p>
                  <p>
                    Sarva shall function with transparency as obligation, with non-extraction as principle, and with its constitution as supreme authority above individuals and convenience.
                  </p>
                  <p>
                    This institution is constituted not in opposition to the State, but in fidelity to its highest constitutional purpose. In this resolve, we bind ourselves and our successors to the enduring service of human dignity, civic responsibility, and the common good.
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b pb-8">
                <div>• Purpose lock</div>
                <div>• Four wings</div>
                <div>• Non-extraction</div>
                <div>• Radical transparency</div>
                <div>• Public ledger & Git-based verifiability</div>
                <div>• Child protection</div>
                <div>• Labour dignity</div>
                <div>• Replication</div>
                <div>• Political restraint</div>
                <div>• Founder limitation</div>
                <div>• Immutability</div>
                <div>• Asset lock</div>
              </section>

              <div className="space-y-12 py-8">
                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 1 — Name, Status, and Jurisdiction</h3>
                  <div className="space-y-2">
                    <p>1.1 The institution shall be known as Sarva Public Trust, hereinafter referred to as "Sarva".</p>
                    <p>1.2 Sarva is constituted as an irrevocable public charitable trust, non-profit in nature, established exclusively for public benefit.</p>
                    <p>1.3 Sarva shall operate within the territory of India, with its initial proposed office in Guwahati, Kamrup Metropolitan District, Assam.</p>
                    <p>1.4 Sarva shall not exist for private gain, commercial profit, or personal enrichment of any individual.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 2 — Constitutional Preamble</h3>
                  <div className="space-y-4">
                    <p>Sarva is founded on the recognition that human dignity requires certain non-negotiable conditions.</p>
                    <p>Education, safe drinking water, clean air, and clean public spaces are not commodities, privileges, or rewards. They are preconditions of a civilized society.</p>
                    <p>When access to these essentials is determined by wealth, society fails its moral duty.</p>
                    <p>Therefore, in the exercise of collective responsibility and restraint of personal ambition, Sarva is established as a public trust dedicated to guaranteeing these essentials free at the point of use, without extraction, exploitation, discrimination, or monetization.</p>
                    <p>This Constitution binds all founders, trustees, custodians, employees, affiliates, and successors of Sarva, present and future.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 3 — Objects and Purpose (Purpose Lock)</h3>
                  <div className="space-y-2">
                    <p>3.1 Sarva shall pursue only the following objectives:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provision of free education to all children</li>
                      <li>Provision of free access to safe drinking water as public infrastructure</li>
                      <li>Implementation of clean air initiatives to reduce exposure to pollution</li>
                      <li>Maintenance of clean public spaces through dignified sanitation systems</li>
                    </ul>
                    <p>3.2 These objectives shall be carried out through four permanent constitutional wings:</p>
                    <ul className="list-none pl-6 space-y-1 italic">
                      <li>• Sarva Gyan — Education</li>
                      <li>• Sarva Jal — Drinking Water</li>
                      <li>• Sarva Vayu — Clean Air</li>
                      <li>• Sarva Swachata — Cleanliness</li>
                    </ul>
                    <p>3.3 No activity outside these objectives shall be undertaken under any circumstances.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 4 — Non-Extraction and Free Access</h3>
                  <div className="space-y-2">
                    <p>4.1 Sarva shall never charge, directly or indirectly, any fee, contribution, donation, or consideration from beneficiaries.</p>
                    <p>4.2 Free access includes, without limitation: no tuition or registration fees, no conditional services, no premium access, and no indirect monetization.</p>
                    <p>4.3 Any attempt to extract value from beneficiaries shall constitute gross constitutional violation.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 5 — Transparency and Public Accountability</h3>
                  <div className="space-y-2">
                    <p>5.1 Sarva shall operate with radical and continuous transparency.</p>
                    <p>5.2 The following shall be publicly accessible on a daily basis:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Total funds received</li>
                      <li>Total funds spent</li>
                      <li>Categorized expenditures</li>
                      <li>Current bank balances</li>
                    </ul>
                    <p>5.3 Transparency obligations shall not be suspended for any reason, including emergencies, political pressure, or financial stress.</p>
                    <p>5.4 Transparency shall be implemented in a manner that protects personal and sensitive data.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 6 — Data Ethics and Child Protection</h3>
                  <div className="space-y-2">
                    <p>6.1 Sarva shall collect only minimal data necessary for lawful operations.</p>
                    <p>6.2 Sarva shall never publicly disclose: Names or identities of children, identifiable photographs, biometric data, or personal histories or profiling.</p>
                    <p>6.3 Children shall never be used for fundraising optics, publicity, labour, or political messaging.</p>
                    <p>6.4 Sarva shall comply with all applicable child protection laws and coordinate with lawful child welfare authorities.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 7 — Labour Dignity and Cleanliness Ethics</h3>
                  <div className="space-y-2">
                    <p>7.1 All sanitation and maintenance work under Sarva Swachata shall be performed by paid adult workers.</p>
                    <p>7.2 No child shall handle waste, drains, or sanitation equipment.</p>
                    <p>7.3 Sanitation workers shall be provided fair wages, protective equipment, and safe and dignified working conditions.</p>
                    <p>7.4 Cleanliness shall never be enforced through humiliation, coercion, or shaming.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 8 — Trustees and Governance</h3>
                  <div className="space-y-2">
                    <p>8.1 Sarva shall have a minimum of five (5) Trustees.</p>
                    <p>8.2 Trustees shall act solely as custodians, not owners.</p>
                    <p>8.3 Trustees shall serve without remuneration, derive no personal benefit, and avoid conflicts of interest.</p>
                    <p>8.4 Trustees may be removed only for proven misconduct, financial impropriety, or constitutional violation.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 9 — Limitation of Founder Powers</h3>
                  <div className="space-y-2">
                    <p>9.1 The Founder shall hold no unilateral authority to amend, dissolve, or redirect Sarva.</p>
                    <p>9.2 The Founder shall be bound by this Constitution equally with all others.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4 bg-primary/5 p-4 rounded-r-lg">Article 10 — Immutability and Amendment Prohibition</h3>
                  <div className="space-y-2">
                    <p>10.1 The following Articles are permanently immutable: Article 3 (Purpose), Article 4 (Non-Extraction), Article 5 (Transparency), Article 6 (Child Protection), Article 7 (Labour Dignity), and Articles 16–24 (Public Record & Transparency System).</p>
                    <p className="font-bold italic">10.2 Any action contradicting these Articles shall be void ab initio.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 11 — Asset Lock</h3>
                  <div className="space-y-2">
                    <p>11.1 All assets of Sarva are permanently dedicated to public charitable use.</p>
                    <p>11.2 Assets shall not be sold, transferred, mortgaged, or privatized for personal or commercial benefit.</p>
                    <p>11.3 Upon dissolution, assets shall vest only in another public charitable trust with identical non-extractive objectives.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 12 — Replication and Affiliation</h3>
                  <div className="space-y-2">
                    <p>12.1 Sarva may permit replication only by individuals or groups who accept this Constitution without modification.</p>
                    <p>12.2 Replicated units shall remain subject to central transparency standards, ethical oversight, and public accountability.</p>
                    <p>12.3 Sarva reserves the right to revoke affiliation upon constitutional violation.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 13 — Political Neutrality and Future Expression</h3>
                  <div className="space-y-2">
                    <p>13.1 Sarva shall not function as a political party.</p>
                    <p>13.2 Sarva may engage in civic education and public discourse consistent with its objectives.</p>
                    <p>13.3 Any future political expression shall require separation from operational services, continued non-extraction, and full transparency.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 14 — Dissolution</h3>
                  <div className="space-y-2">
                    <p>14.1 Sarva may be dissolved only by lawful judicial process.</p>
                    <p>14.2 Upon dissolution, all assets shall irrevocably transfer to another public charitable trust with identical constitutional principles.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Article 15 — Supremacy of the Constitution</h3>
                  <div className="space-y-2">
                    <p>15.1 This Constitution is the supreme governing document of Sarva.</p>
                    <p>15.2 No policy, rule, resolution, or directive may override it.</p>
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 uppercase border-l-4 border-primary pl-4">Articles 16–24 — Public Record and Version Transparency</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p><strong>16.1</strong> Sarva shall maintain a publicly accessible digital record of all public-facing documents.</p>
                      <p><strong>17.1</strong> Sarva shall designate a single canonical public source-of-truth for all public-facing content.</p>
                      <p><strong>18.1</strong> All changes shall be traceable to a public record showing what changed, when it changed, and a verifiable reference.</p>
                      <p><strong>19.1</strong> Sarva shall publicly display date and time of last update and reference to the corresponding public change record.</p>
                      <p><strong>20.1</strong> Sarva shall not rely on any single private platform as the sole guarantor of its public record.</p>
                      <p><strong>21.1</strong> No person associated with Sarva shall modify public-facing content without publication and traceability.</p>
                      <p><strong>22.1</strong> The canonical public record shall constitute admissible evidence of Sarva’s intent, policy, and conduct.</p>
                      <p><strong>24.1</strong> Articles 16–23 are fundamental and immutable.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-muted/50 p-8 rounded-lg border-l-8 border-primary">
                  <h3 className="text-2xl font-black mb-6 uppercase text-center">Preamble Commentary</h3>
                  <div className="space-y-8 text-sm leading-relaxed">
                    <div>
                      <h4 className="font-bold underline uppercase mb-2">"We, the citizens..."</h4>
                      <p>Establishes citizen authority over founder authority. Anchors Sarva in moral resolve, not personality or ideology. Legally, this clarifies that Sarva derives legitimacy from civic responsibility, not personality.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline uppercase mb-2">"human dignity is inseparable..."</h4>
                      <p>Defines dignity as structural and material, not just abstract. Dignity is not charity; it is a precondition. This becomes the philosophical basis for non-extraction.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline uppercase mb-2">"not privileges to be purchased..."</h4>
                      <p>The heart of Sarva. Rejects commodification. Legally supports free access, the ban on monetization, and the asset lock.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline uppercase mb-2">"transparency as obligation..."</h4>
                      <p>Mandatory conduct, not optional strategy. Supports the daily public ledger and Git-based verifiability. Transparency is not optional, strategic, or reputational—it is mandatory conduct.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline uppercase mb-2">"fidelity to highest constitutional purpose..."</h4>
                      <p>This confirms that Sarva functions in harmony with the highest ideals of the nation, ensuring its focus remains solely on the realization of human dignity and the common good.</p>
                    </div>
                  </div>
                </section>
              </div>

              <section className="pt-12 text-center text-sm text-muted-foreground border-t space-y-4">
                <div className="space-y-2">
                  <p className="font-black uppercase tracking-[0.2em] text-primary text-base">Closing Declaration</p>
                  <p className="italic text-lg max-w-xl mx-auto leading-tight">
                    "Sarva is founded in restraint, not ambition. Its purpose is not to accumulate power, but to remove the conditions that make power necessary. This Constitution binds us not to success, but to integrity."
                  </p>
                </div>
                <p className="pt-8 font-code text-xs">Document Version: 1.0.4-immutable • Last Revised: 07 March 2026</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
