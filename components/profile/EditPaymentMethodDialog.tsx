"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  PaymentMethod,
  PaymentMethodInput,
} from "@/hooks/usePaymentMethods";
import { cn } from "@/lib/utils";
import { ChevronDown, Info, MapPin, Pencil, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

/* ─── Card brand icons ─── */
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
    maestro: "Maestro",
  };
  return names[cardType] || "Card";
};

/* ─── Countries list ─── */
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "BD", name: "Bangladesh" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "NG", name: "Nigeria" },
  { code: "ZA", name: "South Africa" },
  { code: "PK", name: "Pakistan" },
  { code: "PH", name: "Philippines" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "VE", name: "Venezuela" },
  { code: "TR", name: "Turkey" },
  { code: "RU", name: "Russia" },
  { code: "EG", name: "Egypt" },
  { code: "ID", name: "Indonesia" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "MY", name: "Malaysia" },
  { code: "SG", name: "Singapore" },
  { code: "NZ", name: "New Zealand" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "GR", name: "Greece" },
  { code: "PT", name: "Portugal" },
  { code: "IE", name: "Ireland" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Peru" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "PR", name: "Puerto Rico" },
];

/* ─── Floating Label Input ─── */
function FloatingField({
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  className,
  disabled,
  autoFocus,
  maxLength,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel";
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0 mt-2">{icon}</div>}
        <div className="flex-1">
          <div
            className={cn(
              "relative border-b-2 transition-colors duration-200",
              error
                ? "border-[#d93025]"
                : focused
                  ? "border-[#1a73e8]"
                  : "border-[#dadce0] dark:border-gray-600",
            )}
          >
            <label
              className={cn(
                "absolute left-0 transition-all duration-200 pointer-events-none",
                isActive ? "top-0 text-[11px]" : "top-5 text-[15px]",
                error
                  ? "text-[#d93025]"
                  : focused
                    ? "text-[#1a73e8]"
                    : "text-[#5f6368] dark:text-gray-400",
              )}
            >
              {label}
            </label>
            <input
              type={type}
              inputMode={inputMode}
              autoComplete={autoComplete}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              autoFocus={autoFocus}
              maxLength={maxLength}
              className={cn(
                "w-full pt-5 pb-2 text-[15px] bg-transparent outline-none text-[#202124] dark:text-white",
                disabled && "opacity-60 cursor-not-allowed",
              )}
            />
          </div>
          {error && (
            <p className="mt-1 text-[12px] text-[#d93025] whitespace-nowrap">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Edit Dialog ─── */
interface EditPaymentMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, updates: Partial<PaymentMethodInput>) => void;
  editingMethod: PaymentMethod | null;
}

export default function EditPaymentMethodDialog({
  isOpen,
  onOpenChange,
  onUpdate,
  editingMethod,
}: EditPaymentMethodDialogProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Card-specific fields
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvc, setCvc] = useState("");

  // Shared fields
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("US");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // UI state
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Errors
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [expiryError, setExpiryError] = useState("");

  const isCard = editingMethod?.type === "card";
  const selectedCountry =
    COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  // Populate form when editingMethod changes
  useEffect(() => {
    if (editingMethod && isOpen) {
      setName(editingMethod.name || "");
      setNickname(editingMethod.nickname || "");
      setCountry(editingMethod.country || "US");
      setAddressLine1(editingMethod.addressLine1 || "");
      setAddressLine2(editingMethod.addressLine2 || "");
      setCity(editingMethod.city || "");
      setPostalCode(editingMethod.postalCode || "");

      if (editingMethod.type === "card" && editingMethod.expiry) {
        const parts = editingMethod.expiry.split("/");
        setMm(parts[0] || "");
        setYy(parts[1] || "");
      } else {
        setMm("");
        setYy("");
      }
      setCvc("");

      // Clear errors
      setNameError("");
      setAddressError("");
      setCityError("");
      setCvcError("");
      setExpiryError("");
    }
  }, [editingMethod, isOpen]);

  // Close country dropdown on outside click
  useEffect(() => {
    if (!isCountryOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isCountryOpen]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const validate = (): boolean => {
    let hasError = false;

    if (name.trim().length === 0) {
      setNameError(t("name_required"));
      hasError = true;
    } else {
      setNameError("");
    }

    if (addressLine1.trim().length === 0) {
      setAddressError(t("address_required"));
      hasError = true;
    } else {
      setAddressError("");
    }

    if (city.trim().length === 0) {
      setCityError(t("city_required"));
      hasError = true;
    } else {
      setCityError("");
    }

    return !hasError;
  };

  const handleUpdate = () => {
    if (!validate() || !editingMethod) return;

    const updates: Partial<PaymentMethodInput> = {
      name: name.trim(),
      nickname: nickname.trim() || undefined,
      country,
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    };

    // If card and expiry was changed
    if (isCard && mm && yy) {
      updates.expiry = `${mm}/${yy}`;
    }

    onUpdate(editingMethod.id, updates);
    handleClose();
  };

  if (!editingMethod) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        hideClose
        className="sm:max-w-[480px] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* ─── Header ─── */}
        <div className="sticky top-0 z-10 px-6 pt-5 pb-4 bg-white dark:bg-[#1f1f1f] flex items-center justify-between">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-normal text-[#202124] dark:text-white">
              {t("update_payment_method")}
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={handleClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-[#5f6368] dark:text-gray-400" />
          </button>
        </div>

        {/* ─── Scrollable body ─── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-6">
          {isCard ? (
            /* ═══════════════════════════════════════
               CARD EDIT FORM
               ═══════════════════════════════════════ */
            <div className="space-y-5">
              {/* ── Non-editable card info ── */}
              <div className="flex items-center gap-3 py-2">
                <div className="w-[40px] h-[26px] rounded overflow-hidden flex items-center justify-center bg-white dark:bg-gray-700 border border-[#dadce0] dark:border-gray-600">
                  <Image
                    src={
                      editingMethod.cardType
                        ? CARD_ICONS[editingMethod.cardType] ||
                          CARD_ICONS.placeholder
                        : CARD_ICONS.placeholder
                    }
                    alt={editingMethod.cardType || "card"}
                    width={36}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-[15px] text-[#202124] dark:text-white font-normal">
                  {getCardDisplayName(editingMethod.cardType || "")} ••••{" "}
                  {editingMethod.last4}
                </span>
              </div>

              {/* ── MM / YY / CVC row ── */}
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-[13px] text-[#5f6368] dark:text-gray-400 mr-1">
                    #
                  </span>
                  <div className="w-[50px]">
                    <div
                      className={cn(
                        "border-b-2 transition-colors",
                        expiryError
                          ? "border-[#d93025]"
                          : "border-[#dadce0] dark:border-gray-600",
                      )}
                    >
                      <label className="block text-[10px] text-[#5f6368] dark:text-gray-400 mb-0.5">
                        MM
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={mm}
                        onChange={(e) =>
                          setMm(e.target.value.replace(/\D/g, "").slice(0, 2))
                        }
                        maxLength={2}
                        className="w-full text-[15px] bg-transparent outline-none text-[#202124] dark:text-white pb-1"
                      />
                    </div>
                  </div>
                  <span className="text-[#5f6368] dark:text-gray-400 mt-3">
                    /
                  </span>
                  <div className="w-[50px]">
                    <div
                      className={cn(
                        "border-b-2 transition-colors",
                        expiryError
                          ? "border-[#d93025]"
                          : "border-[#dadce0] dark:border-gray-600",
                      )}
                    >
                      <label className="block text-[10px] text-[#5f6368] dark:text-gray-400 mb-0.5">
                        AA
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={yy}
                        onChange={(e) =>
                          setYy(e.target.value.replace(/\D/g, "").slice(0, 2))
                        }
                        maxLength={2}
                        className="w-full text-[15px] bg-transparent outline-none text-[#202124] dark:text-white pb-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-4 w-[70px]">
                  <div
                    className={cn(
                      "border-b-2 transition-colors",
                      cvcError
                        ? "border-[#d93025]"
                        : "border-[#dadce0] dark:border-gray-600",
                    )}
                  >
                    <label className="block text-[10px] text-[#5f6368] dark:text-gray-400 mb-0.5">
                      CVC
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cvc}
                      onChange={(e) =>
                        setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
                      className="w-full text-[15px] bg-transparent outline-none text-[#202124] dark:text-white pb-1"
                    />
                  </div>
                  <p className="text-[11px] text-[#d93025] mt-1">
                    {t("cvc_required")}
                  </p>
                </div>
              </div>

              {/* ── Cardholder name ── */}
              <FloatingField
                label={t("cardholder_name")}
                value={name}
                onChange={(v) => {
                  setName(v);
                  setNameError("");
                }}
                error={nameError}
                icon={
                  <Pencil className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                }
              />

              {/* ── Country / Region selector ── */}
              <div className="relative" ref={countryDropdownRef}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400 flex-shrink-0 mt-1" />
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="flex-1 flex items-center justify-between pb-2 border-b-2 border-[#dadce0] dark:border-gray-600 text-left hover:border-[#5f6368] transition-colors"
                  >
                    <span className="flex items-center gap-2 text-[15px] text-[#202124] dark:text-white">
                      <ReactCountryFlag
                        countryCode={country}
                        svg
                        style={{ width: "20px", height: "15px" }}
                      />
                      {selectedCountry.name} ({country})
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-[#5f6368] transition-transform duration-200",
                        isCountryOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {isCountryOpen && (
                  <div className="absolute z-20 left-7 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-[#dadce0] dark:border-gray-600">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountry(c.code);
                          setIsCountryOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2",
                          country === c.code
                            ? "bg-blue-50 dark:bg-blue-900/20 text-[#1a73e8]"
                            : "text-[#202124] dark:text-white",
                        )}
                      >
                        <ReactCountryFlag
                          countryCode={c.code}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                        {c.name} ({c.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Address fields ── */}
              <div className="ml-7 space-y-5">
                <FloatingField
                  label={t("address_line_1_label")}
                  value={addressLine1}
                  onChange={(v) => {
                    setAddressLine1(v);
                    setAddressError("");
                  }}
                  error={addressError}
                />
                <FloatingField
                  label={t("address_line_2_label")}
                  value={addressLine2}
                  onChange={setAddressLine2}
                />
                <FloatingField
                  label={t("city")}
                  value={city}
                  onChange={(v) => {
                    setCity(v);
                    setCityError("");
                  }}
                  error={cityError}
                />
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FloatingField
                      label={t("postal_code")}
                      value={postalCode}
                      onChange={setPostalCode}
                    />
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-2"
                    aria-label="Info"
                    tabIndex={-1}
                  >
                    <Info className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* ── Card nickname (optional) ── */}
              <FloatingField
                label={t("card_nickname")}
                value={nickname}
                onChange={setNickname}
                icon={
                  <Pencil className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                }
              />
            </div>
          ) : (
            /* ═══════════════════════════════════════
               BANK EDIT FORM
               ═══════════════════════════════════════ */
            <div className="space-y-5">
              {/* ── Non-editable bank info ── */}
              <div className="flex items-center gap-3 py-2">
                <div className="w-[40px] h-[26px] rounded bg-[#dadce0] dark:bg-[#5f6368] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M12 2L3 7v2h18V7l-9-5z" fill="currentColor" />
                    <path
                      d="M5 10v7h2v-7H5zM9 10v7h2v-7H9zM13 10v7h2v-7h-2zM17 10v7h2v-7h-2z"
                      fill="currentColor"
                    />
                    <path d="M3 19v2h18v-2H3z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[15px] text-[#202124] dark:text-white font-normal">
                  {editingMethod.name} •••• {editingMethod.last4}
                </span>
              </div>

              {/* ── Account holder name ── */}
              <div className="relative">
                <FloatingField
                  label={t("account_holder_name")}
                  value={name}
                  onChange={(v) => {
                    setName(v);
                    setNameError("");
                  }}
                  error={nameError}
                  icon={
                    <Pencil className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                  }
                />
                <button
                  type="button"
                  className="absolute right-0 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Info"
                  tabIndex={-1}
                >
                  <Info className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                </button>
              </div>

              {/* ── Country / Region selector ── */}
              <div className="relative" ref={countryDropdownRef}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400 flex-shrink-0 mt-1" />
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="flex-1 flex items-center justify-between pb-2 border-b-2 border-[#dadce0] dark:border-gray-600 text-left hover:border-[#5f6368] transition-colors"
                  >
                    <span className="flex items-center gap-2 text-[15px] text-[#202124] dark:text-white">
                      <ReactCountryFlag
                        countryCode={country}
                        svg
                        style={{ width: "20px", height: "15px" }}
                      />
                      {selectedCountry.name} ({country})
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-[#5f6368] transition-transform duration-200",
                        isCountryOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {isCountryOpen && (
                  <div className="absolute z-20 left-7 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#2d2d2d] rounded-lg shadow-lg border border-[#dadce0] dark:border-gray-600">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountry(c.code);
                          setIsCountryOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2",
                          country === c.code
                            ? "bg-blue-50 dark:bg-blue-900/20 text-[#1a73e8]"
                            : "text-[#202124] dark:text-white",
                        )}
                      >
                        <ReactCountryFlag
                          countryCode={c.code}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                        {c.name} ({c.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Address fields ── */}
              <div className="ml-7 space-y-5">
                <FloatingField
                  label={t("address_line_1_label")}
                  value={addressLine1}
                  onChange={(v) => {
                    setAddressLine1(v);
                    setAddressError("");
                  }}
                  error={addressError}
                />
                <FloatingField
                  label={t("address_line_2_label")}
                  value={addressLine2}
                  onChange={setAddressLine2}
                />
                <FloatingField
                  label={t("city")}
                  value={city}
                  onChange={(v) => {
                    setCity(v);
                    setCityError("");
                  }}
                  error={cityError}
                />
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FloatingField
                      label={t("postal_code")}
                      value={postalCode}
                      onChange={setPostalCode}
                    />
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-2"
                    aria-label="Info"
                    tabIndex={-1}
                  >
                    <Info className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* ── Bank nickname (optional) ── */}
              <FloatingField
                label={t("bank_nickname")}
                value={nickname}
                onChange={setNickname}
                icon={
                  <Pencil className="w-[18px] h-[18px] text-[#5f6368] dark:text-gray-400" />
                }
              />
            </div>
          )}

          {/* ─── Cancel + Update buttons ─── */}
          <div className="flex justify-end items-center gap-3 mt-8 pt-4">
            <button
              onClick={handleClose}
              className="text-[#1a73e8] text-[14px] font-medium px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {t("cancel")}
            </button>
            <Button
              onClick={handleUpdate}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium px-8 h-9 rounded text-[14px]"
            >
              {t("update")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
