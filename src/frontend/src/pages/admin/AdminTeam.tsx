import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { TeamMember, TeamRole } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Plus, Trash2, UserCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROLES: { value: TeamRole; label: string }[] = [
  { value: "faculty_advisor", label: "Faculty Advisor" },
  { value: "chairperson", label: "Chairperson" },
  { value: "vice_chairperson", label: "Vice Chairperson" },
  { value: "secretary", label: "Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "webmaster", label: "Webmaster" },
  { value: "committee", label: "Committee" },
  { value: "member", label: "Member" },
];

const ROLE_PRIORITY: Record<string, number> = {
  faculty_advisor: 0,
  chairperson: 1,
  vice_chairperson: 2,
  secretary: 3,
  treasurer: 4,
  webmaster: 5,
  committee: 6,
  member: 7,
};

const ROLE_BADGE: Partial<Record<TeamRole, string>> = {
  faculty_advisor: "bg-accent/10 text-accent border-accent/30",
  chairperson: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  vice_chairperson: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  secretary: "bg-green-500/10 text-green-400 border-green-500/30",
};

type MemberFormData = Omit<TeamMember, "id">;

const defaultForm: MemberFormData = {
  name: "",
  role: "member",
  roleLabel: "Member",
  department: "",
  year: "",
  email: "",
  linkedIn: "",
  imageUrl: "",
  bio: "",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdminTeam() {
  const { data: members, isLoading } = useTeamMembers();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<MemberFormData>(defaultForm);

  const saveMutation = useMutation({
    mutationFn: async (data: MemberFormData) => data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => id,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team"] }),
  });

  const sorted = [...(members ?? [])].sort(
    (a, b) => (ROLE_PRIORITY[a.role] ?? 99) - (ROLE_PRIORITY[b.role] ?? 99),
  );

  const openAdd = () => {
    setEditingMember(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember(member);
    const { id: _id, ...rest } = member;
    setForm(rest);
    setDialogOpen(true);
  };

  const handleRoleChange = (role: TeamRole) => {
    const label = ROLES.find((r) => r.value === role)?.label ?? role;
    setForm({ ...form, role, roleLabel: label });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveMutation.mutateAsync(form);
      toast.success(editingMember ? "Member updated" : "Member added");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save member");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the team?`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Member removed");
    } catch {
      toast.error("Failed to remove member");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin-team">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Team Members
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {members?.length ?? 0} members in the executive committee.
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          onClick={openAdd}
          data-ocid="admin-add-member"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Member
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                Role
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                Department
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Year
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? ["t1", "t2", "t3", "t4", "t5"].map((sk) => (
                  <tr key={sk} className="border-b border-border/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-8 w-16 ml-auto" />
                    </td>
                  </tr>
                ))
              : sorted.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    data-ocid={`admin-member-${member.id}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={member.imageUrl}
                            alt={member.name}
                          />
                          <AvatarFallback className="bg-secondary text-xs font-medium">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {member.name}
                          </p>
                          {member.email && (
                            <p className="text-xs text-muted-foreground truncate hidden sm:block">
                              {member.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className={`text-xs ${ROLE_BADGE[member.role] ?? "bg-muted text-muted-foreground border-border"}`}
                      >
                        {member.roleLabel}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell truncate max-w-[160px]">
                      {member.department}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                      {member.year ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => openEdit(member)}
                          aria-label="Edit member"
                          data-ocid={`admin-edit-member-${member.id}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(member.id, member.name)}
                          aria-label="Delete member"
                          data-ocid={`admin-delete-member-${member.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && (!members || members.length === 0) && (
          <div
            className="py-16 text-center text-muted-foreground"
            data-ocid="team-empty-state"
          >
            <UserCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No team members yet</p>
            <p className="text-sm mt-1">Click "Add Member" to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {editingMember ? "Edit Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="m-name">Full Name *</Label>
              <Input
                id="m-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Arjun Reddy"
                required
                data-ocid="member-name-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="m-role">Role *</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => handleRoleChange(v as TeamRole)}
                >
                  <SelectTrigger id="m-role" data-ocid="member-role-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="m-year">Year</Label>
                <Input
                  id="m-year"
                  value={form.year ?? ""}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g. 3rd Year"
                  data-ocid="member-year-input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="m-dept">Department *</Label>
              <Input
                id="m-dept"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                placeholder="e.g. Computer Science & Engineering"
                required
                data-ocid="member-dept-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="m-email">Email</Label>
              <Input
                id="m-email"
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@student.vignan.ac.in"
                data-ocid="member-email-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="m-linkedin">LinkedIn URL</Label>
              <Input
                id="m-linkedin"
                value={form.linkedIn ?? ""}
                onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                placeholder="https://linkedin.com/in/…"
                data-ocid="member-linkedin-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="m-photo">Photo URL</Label>
              <Input
                id="m-photo"
                value={form.imageUrl ?? ""}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://… or /assets/…"
                data-ocid="member-photo-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="m-bio">Bio</Label>
              <Textarea
                id="m-bio"
                value={form.bio ?? ""}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Short biography…"
                rows={2}
                data-ocid="member-bio-input"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={saveMutation.isPending}
                data-ocid="save-member-btn"
              >
                {editingMember ? "Save Changes" : "Add Member"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
