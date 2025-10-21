import { PackagePlan } from "@/types";

export const PROMO_PACKAGE_PLANS: PackagePlan[] = [
  {
    speed: 50, // Upgraded from 20
    color: "orange",
    features: [
      "Gratis Upgrade dari 20 Mbps",
      "Kecepatan 50 Mbps selama 17 bulan",
    ],
    prices: {
      monthly: { price: "-" },
      sixMonths: { price: "179.000", total: "1.074.000", savings: "" },
      twelveMonths: {
        price: "126.353",
        total: "2.148.000",
        savings: "5 BULAN",
      },
    },
    badge: "Anniversary Promo",
  },
  {
    speed: 75,
    color: "blue",
    features: ["Bayar 12 Bulan Gratis 5 Bulan"],
    prices: {
      monthly: { price: "-" },
      sixMonths: { price: "299.000", total: "1.794.000", savings: "" },
      twelveMonths: {
        price: "211.059",
        total: "3.588.000",
        savings: "5 BULAN",
      },
    },
    badge: "Anniversary Promo",
  },
  {
    speed: 100,
    color: "green",
    features: ["Bayar 12 Bulan Gratis 5 Bulan"],
    prices: {
      monthly: { price: "-" },
      sixMonths: { price: "319.000", total: "1.914.000", savings: "" },
      twelveMonths: {
        price: "225.177",
        total: "3.828.000",
        savings: "5 BULAN",
      },
    },
    badge: "Anniversary Promo",
  },
  {
    speed: 200,
    color: "red",
    features: ["Bayar 12 Bulan Gratis 5 Bulan"],
    prices: {
      monthly: { price: "-" },
      sixMonths: { price: "369.000", total: "2.214.000", savings: "" },
      twelveMonths: {
        price: "260.471",
        total: "4.428.000",
        savings: "5 BULAN",
      },
    },
    badge: "Anniversary Promo",
  },
];
