"use client";

import AddPaymentMethodDialog from "@/components/profile/AddPaymentMethodDialog";
import ProfileDrawer from "@/components/profile/ProfileDrawer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  usePaymentMethods,
  type PaymentMethod,
  type PaymentMethodInput,
} from "@/hooks/usePaymentMethods";
import {
  ArrowLeft,
  Pencil,
  Type,
  MessageSquare,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Card brand icons from public folder
const CARD_ICONS: Record<string, string> = {
  visa: "/visa.svg",
  mastercard: "/mastercard.svg",
  amex: "/amex.svg",
  discover: "/discover.svg",
  diners: "/diners.svg",
  jcb: "/jcb.svg",
  unionpay: "/unionpay.svg",
  placeholder: "/generic.svg",
};

const getCardDisplayName = (cardType: string): string => {
  const names: Record<string, string> = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
    diners: "Diners Club",
    jcb: "JCB",
    unionpay: "UnionPay",
  };
  return names[cardType] || "Card";
};

export default function PaymentMethodsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || "en";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const {
    paymentMethods,
    isLoading,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
  } = usePaymentMethods();

  const handleAddPaymentMethod = (method: PaymentMethodInput) => {
    addPaymentMethod(method);
  };

  const handleUpdatePaymentMethod = (
    id: string,
    updates: Partial<PaymentMethodInput>,
  ) => {
    updatePaymentMethod(id, updates);
  };

  const handleCardClick = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleBackToList = () => {
    setSelectedMethod(null);
  };

  const handleEditFromDetail = () => {
    if (selectedMethod) {
      setEditingMethod(selectedMethod);
      setIsDialogOpen(true);
    }
  };

  const handleRemoveFromDetail = () => {
    if (selectedMethod) {
      removePaymentMethod(selectedMethod.id);
      setSelectedMethod(null);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // If we were editing from detail view, refresh the selected method
      if (editingMethod && selectedMethod) {
        const updated = paymentMethods.find((m) => m.id === selectedMethod.id);
        if (updated) setSelectedMethod(updated);
      }
      setTimeout(() => setEditingMethod(null), 200);
    }
  };

  const handleDrawerItemClick = (item: "personal-info" | "payment-methods") => {
    if (item === "personal-info") {
      router.push(`/${locale}/profile`);
    }
  };

  if (isLoading) {
    return (
      <>
        <ProfileHeader
          userInitial="J"
          userName="Loading..."
          userEmail=""
          onMenuClick={() => setIsDrawerOpen(true)}
        />
        <div className="min-h-screen bg-[#f0f4f9] dark:bg-[#1f1f1f] p-4 md:p-8">
          <div className="max-w-[850px] mx-auto">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96 mb-6" />
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        activeItem="payment-methods"
        onItemClick={handleDrawerItemClick}
      />

      <div className="min-h-screen bg-[#f0f4f9] dark:bg-[#1f1f1f]">
        <div className={selectedMethod ? "max-w-[1050px] mx-auto p-4 md:p-8 flex flex-col min-h-[calc(100vh-80px)] justify-center" : "max-w-[950px] mx-auto p-4 md:p-8"}>
          {/* ─── DETAIL VIEW ─── */}
          {selectedMethod ? (
            <>
              {/* Two-column layout with header inside */}
              <div className="bg-[#f0f4f9] dark:bg-[#2d2d2d] rounded-2xl overflow-hidden border border-[#dadce0] dark:border-gray-700 shadow-sm">
                {/* Back arrow + title bar */}
                <div className="px-6 py-4 border-b border-[#dadce0] dark:border-gray-700 bg-white dark:bg-[#2d2d2d]">
                  <button
                    onClick={handleBackToList}
                    className="flex items-center gap-3 group"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#5f6368] dark:text-gray-400 group-hover:text-[#202124] dark:group-hover:text-white transition-colors" />
                    <span className="text-[15px] text-[#202124] dark:text-white font-normal">
                      {t("payment_method_details")}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-3 md:gap-4 p-3 md:p-4">
                {/* ── LEFT: Card/Bank info + actions ── */}
                <div className="p-6 md:p-8 bg-white dark:bg-[#3c3c3c] rounded-xl md:rounded-2xl">
                  {/* Large card/bank image */}
                  <div className="mb-6">
                    {selectedMethod.type === "bank" ? (
                      <div className="w-[240px] h-[155px] rounded-xl bg-[#dadce0] dark:bg-[#5f6368] flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-20 h-20 text-white"
                        >
                          <path d="M12 2L3 7v2h18V7l-9-5z" fill="currentColor" />
                          <path
                            d="M5 10v7h2v-7H5zM9 10v7h2v-7H9zM13 10v7h2v-7h-2zM17 10v7h2v-7h-2z"
                            fill="currentColor"
                          />
                          <path d="M3 19v2h18v-2H3z" fill="currentColor" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-[240px] h-[155px] rounded-xl bg-white dark:bg-gray-700 border border-[#dadce0] dark:border-gray-600 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            selectedMethod.cardType
                              ? CARD_ICONS[selectedMethod.cardType] ||
                                CARD_ICONS.placeholder
                              : CARD_ICONS.placeholder
                          }
                          alt={selectedMethod.cardType || "card"}
                          width={210}
                          height={140}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name •••• last4 */}
                  <h2 className="text-[22px] font-normal text-[#202124] dark:text-white mb-1">
                    {selectedMethod.name ||
                      getCardDisplayName(selectedMethod.cardType || "")}{" "}
                    •••• {selectedMethod.last4}
                  </h2>

                  {/* Expiry */}
                  {selectedMethod.expiry && (
                    <p className="text-[14px] text-[#5f6368] dark:text-gray-400 mb-6">
                      {t("expires_on")} {selectedMethod.expiry}
                    </p>
                  )}

                  {/* Action items */}
                  <div className="space-y-1 mt-6">
                    {/* Edit */}
                    <button
                      onClick={handleEditFromDetail}
                      className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors text-left"
                    >
                      <Pencil className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                      <span className="text-[14px] text-[#202124] dark:text-white">
                        {t("edit")}
                      </span>
                    </button>

                    {/* Add nickname */}
                    <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors text-left">
                      <Type className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                      <span className="text-[14px] text-[#202124] dark:text-white">
                        {t("add_nickname")}
                      </span>
                    </button>

                    {/* Send feedback */}
                    <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors text-left">
                      <MessageSquare className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                      <span className="text-[14px] text-[#202124] dark:text-white">
                        {t("send_feedback")}
                      </span>
                    </button>

                    {/* Remove */}
                    <button
                      onClick={handleRemoveFromDetail}
                      className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors text-left"
                    >
                      <Trash2 className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                      <span className="text-[14px] text-[#202124] dark:text-white">
                        {t("remove_payment_method")}
                      </span>
                    </button>
                  </div>

                  {/* Google Pay logo */}
                  <div className="mt-8 flex justify-end">
                    <svg
                      viewBox="0 0 150 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[22px] w-auto"
                    >
                      {/* G */}
                      <path
                        d="M17.72 14.28c0-.94-.08-1.84-.24-2.7H9.04v5.1h4.88c-.2 1.12-.84 2.08-1.8 2.72v2.24h2.92c1.7-1.56 2.68-3.88 2.68-7.36z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9.04 23.56c2.44 0 4.48-.8 5.98-2.18l-2.92-2.24c-.8.54-1.84.86-3.06.86-2.36 0-4.36-1.58-5.06-3.72H.96v2.32c1.48 2.92 4.52 4.96 8.08 4.96z"
                        fill="#34A853"
                      />
                      <path
                        d="M3.98 16.28a5.7 5.7 0 010-3.64V10.3H.96a9.5 9.5 0 000 8.3l3.02-2.32z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9.04 8.92c1.32 0 2.52.46 3.46 1.34l2.6-2.58C13.5 6.18 11.46 5.36 9.04 5.36 5.48 5.36 2.44 7.4.96 10.3l3.02 2.34c.7-2.14 2.7-3.72 5.06-3.72z"
                        fill="#EA4335"
                      />
                      {/* P */}
                      <text
                        x="24"
                        y="22"
                        fontSize="18"
                        fontFamily="system-ui, sans-serif"
                        fontWeight="500"
                        className="fill-[#5f6368] dark:fill-gray-400"
                      >
                        Pay
                      </text>
                    </svg>
                  </div>
                </div>

                {/* ── RIGHT: Transactions (empty state) ── */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px] md:min-h-0 bg-white dark:bg-[#3c3c3c] rounded-xl md:rounded-2xl">
                  {/* Empty transaction illustration */}
                  <div className="mb-5">
                    <svg
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
                    >
                      {/* Document / receipt — tilted */}
                      <g transform="translate(100, 96) rotate(-12)">
                        {/* Document shadow */}
                        <rect
                          x="-24"
                          y="-38"
                          width="52"
                          height="68"
                          rx="4"
                          className="fill-[#c8d3e8] dark:fill-[#3a4055]"
                          transform="translate(2, 2)"
                        />
                        {/* Document body */}
                        <rect
                          x="-24"
                          y="-38"
                          width="52"
                          height="68"
                          rx="4"
                          className="fill-white dark:fill-[#4a4f5a]"
                        />
                        {/* Folded corner */}
                        <path
                          d="M16 -38 L28 -38 L28 -26 C24 -26 20 -28 16 -32 C16 -36 16 -38 16 -38Z"
                          className="fill-[#e0e6f2] dark:fill-[#3c4252]"
                        />

                        {/* Blue horizontal lines */}
                        <rect x="-16" y="-22" width="26" height="3" rx="1.5" className="fill-[#a8c4f5] dark:fill-[#5a7ab8]" />
                        <rect x="-16" y="-14" width="20" height="3" rx="1.5" className="fill-[#bdd0f7] dark:fill-[#4d6da8]" />
                        <rect x="-16" y="-6" width="23" height="3" rx="1.5" className="fill-[#bdd0f7] dark:fill-[#4d6da8]" />
                        <rect x="-16" y="2" width="16" height="3" rx="1.5" className="fill-[#cddaf5] dark:fill-[#445e98]" />
                        <rect x="-16" y="10" width="20" height="3" rx="1.5" className="fill-[#cddaf5] dark:fill-[#445e98]" />
                        <rect x="-16" y="18" width="12" height="3" rx="1.5" className="fill-[#cddaf5] dark:fill-[#445e98]" />
                      </g>

                      {/* Pen — angled, overlapping bottom-right of document */}
                      <g transform="translate(118, 118) rotate(-50)">
                        {/* Pen barrel */}
                        <rect x="-2.5" y="-30" width="5" height="24" rx="1.5" className="fill-[#7baaf7] dark:fill-[#6d9de8]" />
                        {/* Pen grip ring */}
                        <rect x="-3" y="-8" width="6" height="3" rx="1" className="fill-[#5b8ed4] dark:fill-[#4a7cc0]" />
                        {/* Pen tip */}
                        <path d="M-2.5 -5 L0 3 L2.5 -5Z" className="fill-[#5f6368] dark:fill-[#9aa0a6]" />
                        {/* Pen cap */}
                        <rect x="-2.5" y="-34" width="5" height="5" rx="2" className="fill-[#5b8ed4] dark:fill-[#4a7cc0]" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[#5f6368] dark:text-gray-400 text-center font-normal">
                    {t("no_transactions")}
                  </p>
                </div>
                </div>
              </div>
            </>
          ) : (
            /* ─── LIST VIEW ─── */
            <>
              {/* Page Header */}
              <h1 className="text-[40px] font-normal text-[#202124] dark:text-white mb-2">
                {t("profile_payment_methods") || "Payment methods"}
              </h1>
              <p className="text-base text-[#5f6368] dark:text-gray-400 mb-6">
                {t("payment_methods_desc") ||
                  "Add, view, and manage payment methods saved in your Wallet"}
              </p>

              {/* Add Payment Method Button */}
              {paymentMethods.length !== 0 && (
                <Button
                  onClick={() => {
                    setEditingMethod(null);
                    setIsDialogOpen(true);
                  }}
                  className="bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full mb-8 hover:shadow-md"
                >
                  {t("add_payment_method") || "Add payment method"}
                </Button>
              )}

              {/* Payment Methods List or Empty State */}
              {paymentMethods.length === 0 ? (
                <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-12 text-center">
                  <div className="mx-auto mb-6 relative">
                    <Image
                      src="/fop_empty.svg"
                      alt="No payment methods"
                      className="mx-auto"
                      width={200}
                      height={200}
                    />
                  </div>

                  <h2 className="text-xl font-medium text-[#202124] dark:text-white mb-2">
                    {t("no_payment_methods") || "No payment methods yet"}
                  </h2>
                  <p className="text-[#5f6368] dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {t("no_payment_methods_desc") ||
                      "Add a payment method so you can make faster, easier payments"}
                  </p>
                  <Button
                    onClick={() => {
                      setEditingMethod(null);
                      setIsDialogOpen(true);
                    }}
                    className="bg-[#1c62bd] hover:bg-[#1557b0] text-white font-medium px-6 h-10 rounded-full hover:shadow-md"
                  >
                    {t("add_payment_method") || "Add payment method"}
                  </Button>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl p-6 space-y-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleCardClick(method)}
                      className="w-full flex items-center p-4 bg-[#f8f9fa] dark:bg-[#3c4043] rounded-2xl hover:bg-[#d6d8da] dark:hover:bg-[#4a4d51] transition-colors cursor-pointer text-left"
                    >
                      {/* Card / Bank Icon */}
                      {method.type === "bank" ? (
                        <div className="w-[100px] h-[68px] rounded-lg bg-[#dadce0] dark:bg-[#5f6368] flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-9 h-9 text-white"
                          >
                            <path
                              d="M12 2L3 7v2h18V7l-9-5z"
                              fill="currentColor"
                            />
                            <path
                              d="M5 10v7h2v-7H5zM9 10v7h2v-7H9zM13 10v7h2v-7h-2zM17 10v7h2v-7h-2z"
                              fill="currentColor"
                            />
                            <path d="M3 19v2h18v-2H3z" fill="currentColor" />
                          </svg>
                        </div>
                      ) : (
                        <div className="rounded overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center mr-4">
                          <Image
                            src={
                              method.cardType
                                ? CARD_ICONS[method.cardType] ||
                                  CARD_ICONS.placeholder
                                : CARD_ICONS.placeholder
                            }
                            alt={method.cardType || "card"}
                            width={130}
                            height={130}
                            className="object-contain"
                          />
                        </div>
                      )}

                      {/* Card Info */}
                      <div className="flex-1">
                        <div className="text-xl font-medium text-[#202124] dark:text-white">
                          {method.name ||
                            getCardDisplayName(method.cardType || "")}{" "}
                          •••• {method.last4}
                        </div>
                        <div className="text-sm text-[#5f6368] dark:text-gray-400">
                          {method.expiry}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AddPaymentMethodDialog
        isOpen={isDialogOpen}
        onOpenChange={handleDialogClose}
        onAdd={handleAddPaymentMethod}
        onUpdate={handleUpdatePaymentMethod}
        editingMethod={editingMethod}
      />
    </>
  );
}
