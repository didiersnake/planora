import React from 'react';
import { motion } from 'motion/react';

// Spinner with themed text
export function CustomSpinner({ message = "Chargement des vibrations..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-600 animate-spin"></div>
      </div>
      <p className="text-sm font-semibold text-neutral-500 font-display animate-pulse">{message}</p>
    </div>
  );
}

// Skeleton loading cards for events grid
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 p-4 space-y-4 animate-pulse">
      <div className="h-44 w-full bg-neutral-200 rounded-xl"></div>
      <div className="space-y-2">
        <div className="h-5 bg-neutral-200 rounded-md w-3/4"></div>
        <div className="h-3 bg-neutral-200 rounded-md w-1/2"></div>
      </div>
      <div className="pt-2 border-t border-neutral-100 space-y-2">
        <div className="h-3 bg-neutral-200 rounded-md w-2/3"></div>
        <div className="h-3 bg-neutral-200 rounded-md w-1/2"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-neutral-200 rounded-md w-1/4"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

// Full Dashboard/List view skeleton loader
export function DashboardSkeleton() {
  return (
    <div className="space-y-8" id="dashboard_skeleton">
      {/* Hero Banner Skeleton */}
      <div className="h-64 bg-neutral-200 rounded-3xl animate-pulse"></div>
      
      {/* Header and Grid Skeletons */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2 w-1/3">
            <div className="h-6 bg-neutral-200 rounded-md"></div>
            <div className="h-3 bg-neutral-200 rounded-md w-3/4"></div>
          </div>
          <div className="h-6 bg-neutral-200 rounded-full w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>
    </div>
  );
}

// Single Event Details view skeleton loader
export function EventPageSkeleton() {
  return (
    <div className="space-y-6" id="event_page_skeleton">
      <div className="h-16 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[400px] bg-neutral-200 rounded-3xl animate-pulse"></div>
          <div className="h-40 bg-neutral-200 rounded-3xl animate-pulse"></div>
        </div>
        <div className="space-y-6">
          <div className="h-[250px] bg-neutral-200 rounded-3xl animate-pulse"></div>
          <div className="h-[150px] bg-neutral-200 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Full screen Event Creation view skeleton loader
export function EventCreationSkeleton() {
  return (
    <div className="space-y-6" id="event_creation_skeleton">
      <div className="h-24 bg-neutral-200 rounded-3xl animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-[400px] bg-neutral-200 rounded-3xl animate-pulse"></div>
        <div className="md:col-span-2 h-[500px] bg-neutral-200 rounded-3xl animate-pulse"></div>
      </div>
    </div>
  );
}
