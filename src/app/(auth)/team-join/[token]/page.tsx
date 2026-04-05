"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { use } from "react";

interface InviteInfo {
  id: string;
  name: string;
  role: string;
  email: string;
  clinicName: string;
}

export default function TeamJoinPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [invite, setInvite] = useState<InviteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    fetch(`/api/team/join?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          if (data.alreadyJoined) setAlreadyJoined(true);
        } else {
          setInvite(data.invite);
        }
      })
      .catch(() => setError("Failed to load invite"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invite) return;
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const supabase = createClient();

      // Sign up with the invite email
      const { error: signupError } = await supabase.auth.signUp({
        email: invite.email,
        password,
        options: {
          data: { full_name: invite.name },
        },
      });

      if (signupError) {
        // If user already exists, try to sign in
        if (signupError.message.includes("already registered")) {
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: invite.email,
            password,
          });
          if (loginError) {
            setError("This email is already registered. Please log in with your existing password.");
            setSubmitting(false);
            return;
          }
        } else {
          setError(signupError.message);
          setSubmitting(false);
          return;
        }
      }

      // Link the auth user to the team member record
      const joinRes = await fetch("/api/team/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const joinData = await joinRes.json();
      if (!joinRes.ok) {
        setError(joinData.error || "Failed to complete setup");
        setSubmitting(false);
        return;
      }

      router.push("/portal");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading invite...</p>
      </div>
    );
  }

  if (alreadyJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold">Already set up</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This invite has already been used. Log in to access your portal.
            </p>
            <Button className="mt-6" onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold text-red-600">Invalid Invite</h2>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            DentiSOP
          </h1>
          <p className="text-sm text-muted-foreground">
            You&apos;ve been invited to join <strong>{invite?.clinicName}</strong>
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm font-medium text-indigo-900">{invite?.name}</p>
              <p className="text-xs text-indigo-700">{invite?.role} · {invite?.email}</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Create a password to set up your account. You&apos;ll use this to
              log in and acknowledge assigned procedures.
            </p>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Setting up..." : "Set Up My Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
