'use client';

import React from 'react';

export default function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Back Office System
        </h1>
        <div className="text-sm text-gray-500">Namplao Used Cars</div>
      </div>
      <main className="flex-1 p-6 md:p-10 container mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
