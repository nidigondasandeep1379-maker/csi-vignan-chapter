import CommonTypes "common";

module {
  public type ContactId = CommonTypes.EntityId;
  public type Timestamp = CommonTypes.Timestamp;

  public type ContactSubmission = {
    id : ContactId;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Timestamp;
  };
};
