import List "mo:core/List";
import Text "mo:core/Text";
import Storage "mo:caffeineai-object-storage/Storage";
import TeamTypes "../types/team";

module {
  public type TeamMember = TeamTypes.TeamMember;
  public type MemberId = TeamTypes.MemberId;

  public func listMembers(members : List.List<TeamMember>) : [TeamMember] {
    members.toArray();
  };

  public func getMember(members : List.List<TeamMember>, id : MemberId) : ?TeamMember {
    members.find(func(m) { m.id == id });
  };

  public func addMember(
    members : List.List<TeamMember>,
    nextId : Nat,
    name : Text,
    registrationNo : Text,
    branch : Text,
    role : Text,
    image : Storage.ExternalBlob,
  ) : TeamMember {
    let member : TeamMember = {
      id = nextId;
      name;
      registrationNo;
      branch;
      role;
      image;
    };
    members.add(member);
    member;
  };

  public func updateMember(
    members : List.List<TeamMember>,
    id : MemberId,
    name : Text,
    registrationNo : Text,
    branch : Text,
    role : Text,
    image : Storage.ExternalBlob,
  ) : Bool {
    var found = false;
    members.mapInPlace(func(m) {
      if (m.id == id) {
        found := true;
        { m with name; registrationNo; branch; role; image };
      } else { m };
    });
    found;
  };

  public func deleteMember(members : List.List<TeamMember>, id : MemberId) : Bool {
    let sizeBefore = members.size();
    let filtered = members.filter(func(m) { m.id != id });
    members.clear();
    members.append(filtered);
    members.size() < sizeBefore;
  };

  public func seedMembers(members : List.List<TeamMember>, nextId : Nat) : Nat {
    if (members.size() > 0) { return nextId };
    // 17 CSI Vignan chapter members
    let seed : [(Text, Text, Text, Text)] = [
      ("UJWAL SINGH",     "",  "CSE-D",           "PRESIDENT"),
      ("DHANVI MALPANI",  "",  "CSE-D",           "VICE PRESIDENT"),
      ("VISHNU",          "",  "CSE-B",           "SECRETARY"),
      ("DEEPAK CHAND",    "",  "CSE-D",           "JOINT SECRETARY"),
      ("AHMAD FRAZ",      "",  "CSE-CS",          "TREASURER"),
      ("VENKATESHWAR",    "",  "CSE-CS",          "EVENT COORDINATOR"),
      ("EKSHITH",         "",  "CSE-B",           "EVENT COORDINATOR"),
      ("LASYA",           "",  "CSE-D",           "EVENT COORDINATOR"),
      ("RUPIKA",          "",  "CSE-D",           "EVENT COORDINATOR"),
      ("SIRIVENNELA",     "",  "AIML-C",          "EXECUTIVE COMMITTEE"),
      ("RAMALAXMI",       "",  "AIML-C",          "EXECUTIVE COMMITTEE"),
      ("ABHIRAM",         "",  "ACSE-CS",         "EXECUTIVE COMMITTEE"),
      ("ASHWIK",          "",  "ACSE-D",          "EXECUTIVE COMMITTEE"),
      ("SRIKAR",          "",  "ACSE-C",          "EXECUTIVE COMMITTEE"),
      ("SANDEEP",         "",  "MEDIA",           "MEDIA"),
      ("YUVRAJ",          "",  "ACSE-D",          "MEDIA"),
      ("YASHWAN",         "",  "CYBER SECURITY",  "MEDIA"),
    ];
    var id = nextId;
    for ((name, registrationNo, branch, role) in seed.values()) {
      let member : TeamMember = {
        id;
        name;
        registrationNo;
        branch;
        role;
        image = "".encodeUtf8();
      };
      members.add(member);
      id += 1;
    };
    id;
  };
};
