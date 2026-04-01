"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Government",
  "Other",
];

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "user@example.com",
    companyName: "",
    industry: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profile</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={profile.email} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input
              value={profile.companyName}
              onChange={(e) =>
                setProfile({ ...profile, companyName: e.target.value })
              }
              placeholder="Your company"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <select
              value={profile.industry}
              onChange={(e) =>
                setProfile({ ...profile, industry: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Change Password</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input
              type="password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <h2 className="text-xl font-semibold text-destructive">
            Danger Zone
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. All your SOPs,
            templates, and data will be permanently removed.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
