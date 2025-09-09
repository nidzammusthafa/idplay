import React from "react";

// Types for Landing Page
export interface PriceDetail {
  price: string;
  total?: string;
  savings?: string;
}

export interface PackagePrices {
  monthly: PriceDetail;
  sixMonths: PriceDetail;
  twelveMonths: PriceDetail;
}

export interface PackagePlan {
  speed: number;
  color: string;
  features: string[];
  prices: PackagePrices;
  badge?: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InstallationStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  timeline: string;
}

// Types for Coverage Checker Tool
export interface Position {
  lat: number;
  lng: number;
}

export interface Odp {
  ODP: string;
  center: Position;
}

export interface CoverageResult {
  isCovered: boolean;
  nearestOdp: Odp;
  distance: number; // in meters
  address: string;
}
