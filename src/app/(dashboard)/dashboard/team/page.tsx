import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Mail } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Badge variant="outline">Pro Plan Required</Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        This feature is available on Pro and Business plans.
      </p>

      {/* Invite Member */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Invite Member</h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="Email address" type="email" />
            </div>
            <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Team Members</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No team members yet. Invite someone to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
