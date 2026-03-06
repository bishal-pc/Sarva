"use client";

import {DistrictExpansionOutput} from '@/ai/flows/propose-district-expansion';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {MapPin} from 'lucide-react';

export function DistrictExpansion({data}: {data?: DistrictExpansionOutput}) {
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="text-primary w-5 h-5" />
          <CardTitle>District Expansion Simulation</CardTitle>
        </div>
        <CardDescription>
          {data.overallExplanation}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">District/Region</TableHead>
              <TableHead>Proposed Services</TableHead>
              <TableHead className="hidden md:table-cell">Impact Rationale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.districts.map((district, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-semibold">{district.name}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    {district.servicesProposed.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                  {district.explanation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
