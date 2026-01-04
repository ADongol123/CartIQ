"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentChatUIProps {
  total: number;
  onPaymentComplete: (paymentData: any) => void;
  primaryColor?: string;
}

export function PaymentChatUI({
  total,
  onPaymentComplete,
  primaryColor = "#0070f3",
}: PaymentChatUIProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("billing.")) {
      const billingField = field.split(".")[1];
      setPaymentData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value,
        },
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard";
    if (num.startsWith("3")) return "American Express";
    return "Card";
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      setTimeout(() => {
        onPaymentComplete(paymentData);
      }, 2000);
    }, 3000);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          paymentData.cardNumber.replace(/\s/g, "").length >= 13 &&
          paymentData.expiryDate.length === 5 &&
          paymentData.cvv.length >= 3 &&
          paymentData.cardholderName.length > 0
        );
      case 2:
        return (
          paymentData.email.includes("@") &&
          paymentData.billingAddress.street.length > 0 &&
          paymentData.billingAddress.city.length > 0 &&
          paymentData.billingAddress.zipCode.length > 0
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-green-600" />
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Secure Payment
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold">
          Complete Your Purchase
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total:{" "}
          <span className="font-bold text-lg" style={{ color: primaryColor }}>
            ${total.toFixed(2)}
          </span>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? "text-white" : "bg-gray-200 text-gray-500"
                }`}
                style={step >= stepNum ? { backgroundColor: primaryColor } : {}}
                animate={{ scale: step === stepNum ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
              </motion.div>
              {stepNum < 3 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    step > stepNum ? "bg-current" : "bg-gray-200"
                  }`}
                  style={step > stepNum ? { color: primaryColor } : {}}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg">Payment Details</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your card information
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "cardNumber",
                        formatCardNumber(e.target.value)
                      )
                    }
                    maxLength={19}
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {paymentData.cardNumber && (
                    <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                      {getCardType(paymentData.cardNumber)}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) =>
                      handleInputChange(
                        "expiryDate",
                        formatExpiryDate(e.target.value)
                      )
                    }
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) =>
                      handleInputChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={paymentData.cardholderName}
                  onChange={(e) =>
                    handleInputChange("cardholderName", e.target.value)
                  }
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg">Billing Information</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your billing details
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={paymentData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="123 Main St"
                  value={paymentData.billingAddress.street}
                  onChange={(e) =>
                    handleInputChange("billing.street", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={paymentData.billingAddress.city}
                    onChange={(e) =>
                      handleInputChange("billing.city", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    value={paymentData.billingAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange("billing.zipCode", e.target.value)
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg">Review & Confirm</h3>
                <p className="text-sm text-muted-foreground">
                  Please review your payment details
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Card</span>
                  <span className="text-sm font-medium">
                    **** **** **** {paymentData.cardNumber.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="text-sm font-medium">
                    {paymentData.cardholderName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm font-medium">
                    {paymentData.email}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span style={{ color: primaryColor }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="font-bold text-xl mb-2">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Your order has been confirmed and you'll receive an email
                receipt shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
                disabled={isProcessing}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              disabled={!isStepValid() || isProcessing}
              className="flex-1"
              style={{ backgroundColor: primaryColor }}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : step === 3 ? (
                "Complete Payment"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
