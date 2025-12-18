"use client";

import React, { useState } from "react";

export default function DevPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSendEmail = async () => {
    if (!email) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/dev/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Dev Tools</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Test Email Sending</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be your Resend account email if domain is not verified.
              </p>
            </div>

            <button
              onClick={handleSendEmail}
              disabled={loading || !email}
              className="w-full bg-black text-white py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Test Email"}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md overflow-auto">
              <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
