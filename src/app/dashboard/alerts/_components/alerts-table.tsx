'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AlertsTableProps {
  data: Alert[];
}

export function AlertsTable({ data }: AlertsTableProps) {
  const getRiskBadgeVariant = (riskLevel: Alert['riskLevel']) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'Delivered':
        return 'text-yellow-500';
      case 'Read':
        return 'text-green-500';
      case 'Sent':
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">{alert.timestamp}</TableCell>
              <TableCell>{alert.area}</TableCell>
              <TableCell>
                <Badge variant={getRiskBadgeVariant(alert.riskLevel)}>{alert.riskLevel}</Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
              <TableCell>
                <span className={cn('font-semibold', getStatusColor(alert.status))}>{alert.status}</span>
              </TableCell>
               <TableCell>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Resend Alert</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
