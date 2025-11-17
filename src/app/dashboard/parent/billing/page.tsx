"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react";
import { MOCK_INVOICES } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { Invoice } from "@/lib/types";

function BillingContent() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const pendingInvoices = invoices.filter((i) => i.status === "pending");
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const overdueInvoices = invoices.filter((i) => i.status === "overdue");

  const handlePayment = () => {
    // In production, this would integrate with Stripe
    if (selectedInvoice) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === selectedInvoice.id
            ? { ...inv, status: "paid" as const, paidDate: new Date().toISOString() }
            : inv
        )
      );
      toast.success("Payment successful! (Demo Mode - Stripe Sandbox)");
      setIsPaymentDialogOpen(false);
      setSelectedInvoice(null);
    }
  };

  const openPaymentDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };

  const getTotalPending = () => {
    return pendingInvoices.reduce((acc, inv) => acc + inv.amount, 0);
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-secondary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Payment</h1>
          <p className="text-muted-foreground mt-1">
            Manage and pay school fees online
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalPending()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingInvoices.length} invoice(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ${overdueInvoices.reduce((acc, inv) => acc + inv.amount, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overdueInvoices.length} invoice(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Year</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                ${paidInvoices.reduce((acc, inv) => acc + inv.amount, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {paidInvoices.length} invoice(s)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({pendingInvoices.length})
                </TabsTrigger>
                <TabsTrigger value="paid">Paid ({paidInvoices.length})</TabsTrigger>
                <TabsTrigger value="all">All ({invoices.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {pendingInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(invoice.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{invoice.description}</p>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Student: {invoice.studentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${invoice.amount}</p>
                      </div>
                      <Button
                        onClick={() => openPaymentDialog(invoice)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingInvoices.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No pending invoices
                  </p>
                )}
              </TabsContent>

              <TabsContent value="paid" className="space-y-4 mt-4">
                {paidInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(invoice.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{invoice.description}</p>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Paid: {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Student: {invoice.studentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-secondary">${invoice.amount}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
                {paidInvoices.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No paid invoices
                  </p>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(invoice.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{invoice.description}</p>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {invoice.status === "paid"
                            ? `Paid: ${invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : "N/A"}`
                            : `Due: ${new Date(invoice.dueDate).toLocaleDateString()}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Student: {invoice.studentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${invoice.amount}</p>
                      </div>
                      {invoice.status === "pending" ? (
                        <Button
                          onClick={() => openPaymentDialog(invoice)}
                          className="bg-accent hover:bg-accent/90"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>
                Demo Mode: Stripe Sandbox Integration
              </DialogDescription>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <span className="font-medium">{selectedInvoice.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Student:</span>
                    <span className="font-medium">{selectedInvoice.studentName}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${selectedInvoice.amount}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input
                      id="card"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" defaultValue="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <p className="font-semibold mb-1">Demo Mode</p>
                  <p>This is a Stripe Sandbox demo. No real payment will be processed.</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment} className="bg-secondary hover:bg-secondary/90">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ${selectedInvoice?.amount}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default function Billing() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <BillingContent />
    </ProtectedRoute>
  );
}
