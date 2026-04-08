import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContactLib "../lib/contact";
import ContactTypes "../types/contact";

mixin (
  accessControlState : AccessControl.AccessControlState,
  submissions : List.List<ContactTypes.ContactSubmission>,
  nextSubmissionId : Nat,
) {
  var _nextSubmissionId : Nat = nextSubmissionId;

  public shared func submitContactForm(
    name : Text,
    email : Text,
    message : Text,
  ) : async ContactTypes.ContactSubmission {
    let submission = ContactLib.addSubmission(submissions, _nextSubmissionId, name, email, message, Time.now());
    _nextSubmissionId += 1;
    submission;
  };

  public query ({ caller }) func listContactSubmissions() : async [ContactTypes.ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    ContactLib.listSubmissions(submissions);
  };
};
