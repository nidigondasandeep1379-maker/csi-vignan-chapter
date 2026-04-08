import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import TeamLib "../lib/team";
import TeamTypes "../types/team";

mixin (
  accessControlState : AccessControl.AccessControlState,
  members : List.List<TeamTypes.TeamMember>,
  nextMemberId : Nat,
) {
  var _nextMemberId : Nat = nextMemberId;

  public query func listTeamMembers() : async [TeamTypes.TeamMember] {
    TeamLib.listMembers(members);
  };

  public query func getTeamMember(id : TeamTypes.MemberId) : async ?TeamTypes.TeamMember {
    TeamLib.getMember(members, id);
  };

  public shared ({ caller }) func addTeamMember(
    name : Text,
    registrationNo : Text,
    branch : Text,
    role : Text,
    image : Storage.ExternalBlob,
  ) : async TeamTypes.TeamMember {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add team members");
    };
    let member = TeamLib.addMember(members, _nextMemberId, name, registrationNo, branch, role, image);
    _nextMemberId += 1;
    member;
  };

  public shared ({ caller }) func updateTeamMember(
    id : TeamTypes.MemberId,
    name : Text,
    registrationNo : Text,
    branch : Text,
    role : Text,
    image : Storage.ExternalBlob,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update team members");
    };
    TeamLib.updateMember(members, id, name, registrationNo, branch, role, image);
  };

  public shared ({ caller }) func deleteTeamMember(id : TeamTypes.MemberId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete team members");
    };
    TeamLib.deleteMember(members, id);
  };
};
