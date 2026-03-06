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
          <ScrollArea className="h-[800px] rounded-md border p-8 bg-card shadow-sm">
            <div className="prose prose-slate max-w-none space-y-8 text-foreground/90">
              <section className="text-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-4">The Preamble</h2>
                <div className="max-w-2xl mx-auto italic leading-relaxed text-lg border-y py-8 border-primary/10">
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

              <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b pb-8">
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
              </section>

              <div className="space-y-12 py-8">
                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase">Article 1 — Name, Status, and Jurisdiction</h3>
                  <div className="space-y-2">
                    <p>1.1 The institution shall be known as Sarva Public Trust, hereinafter referred to as "Sarva".</p>
                    <p>1.2 Sarva is constituted as an irrevocable public charitable trust, non-profit in nature, established exclusively for public benefit.</p>
                    <p>1.3 Sarva shall operate within the territory of India, with its initial registered office in Guwahati, Kamrup Metropolitan District, Assam.</p>
                    <p>1.4 Sarva shall not exist for private gain, commercial profit, or personal enrichment of any individual.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase">Article 3 — Objects and Purpose (Purpose Lock)</h3>
                  <div className="space-y-2">
                    <p>3.1 Sarva shall pursue only the following objectives:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provision of free education to all children</li>
                      <li>Provision of free access to safe drinking water as public infrastructure</li>
                      <li>Implementation of clean air initiatives to reduce exposure to pollution</li>
                      <li>Maintenance of clean public spaces through dignified sanitation systems</li>
                    </ul>
                    <p>3.2 These objectives shall be carried out through four permanent constitutional wings: Sarva Shiksha (Education), Sarva Jal (Water), Sarva Vayu (Air), and Sarva Swachata (Cleanliness).</p>
                    <p>3.3 No activity outside these objectives shall be undertaken under any circumstances.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase">Article 4 — Non-Extraction and Free Access</h3>
                  <div className="space-y-2">
                    <p>4.1 Sarva shall never charge, directly or indirectly, any fee, contribution, donation, or consideration from beneficiaries.</p>
                    <p>4.2 Free access includes: no tuition/registration fees, no conditional services, no premium access, and no indirect monetization.</p>
                    <p>4.3 Any attempt to extract value from beneficiaries shall constitute gross constitutional violation.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase">Article 5 — Transparency and Public Accountability</h3>
                  <div className="space-y-2">
                    <p>5.1 Sarva shall operate with radical and continuous transparency.</p>
                    <p>5.2 Total funds received, spent, categorized expenditures, and bank balances shall be publicly accessible on a daily basis.</p>
                    <p>5.3 Transparency obligations shall not be suspended for any reason.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 uppercase">Article 10 — Immutability</h3>
                  <p className="font-semibold italic">Articles 3, 4, 5, 6, 7, and 16–24 are permanently immutable. Any action contradicting these Articles shall be void ab initio.</p>
                </section>

                <section className="bg-muted/30 p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 uppercase">Preamble Commentary</h3>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h4 className="font-bold underline">"We, the citizens..."</h4>
                      <p>Establishes citizen authority over founder authority. Anchors Sarva in moral resolve, not personality or ideology.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline">"recognizing that human dignity is inseparable..."</h4>
                      <p>Defines dignity as structural and material, not just abstract. Dignity is not charity; it is a precondition.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline">"affirm that education... are not privileges..."</h4>
                      <p>The heart of Sarva. Rejects commodification. Legally supports free access and the ban on monetization.</p>
                    </div>
                    <div>
                      <h4 className="font-bold underline">"transparency as obligation..."</h4>
                      <p>Mandatory conduct, not optional strategy. Supports the daily public ledger and Git-based verifiability.</p>
                    </div>
                  </div>
                </section>
              </div>

              <section className="pt-12 text-center text-sm text-muted-foreground border-t space-y-2">
                <p className="font-bold uppercase tracking-widest text-primary">Closing Declaration</p>
                <p className="italic">"Sarva is founded in restraint, not ambition. Its purpose is not to accumulate power, but to remove the conditions that make power necessary. This Constitution binds us not to success, but to integrity."</p>
                <p className="pt-4">Last Revised: October 2023</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
