import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type MemberId = CommonTypes.EntityId;

  public type TeamMember = {
    id : MemberId;
    name : Text;
    registrationNo : Text;
    branch : Text;
    role : Text;
    image : Storage.ExternalBlob;
  };
};
