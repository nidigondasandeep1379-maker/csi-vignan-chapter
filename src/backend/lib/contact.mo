import List "mo:core/List";
import ContactTypes "../types/contact";

module {
  public type ContactSubmission = ContactTypes.ContactSubmission;
  public type ContactId = ContactTypes.ContactId;

  public func listSubmissions(submissions : List.List<ContactSubmission>) : [ContactSubmission] {
    submissions.toArray();
  };

  public func addSubmission(
    submissions : List.List<ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    message : Text,
    submittedAt : Int,
  ) : ContactSubmission {
    let submission : ContactSubmission = {
      id = nextId;
      name;
      email;
      message;
      submittedAt;
    };
    submissions.add(submission);
    submission;
  };
};
