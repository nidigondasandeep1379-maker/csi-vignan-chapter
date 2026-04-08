import CommonTypes "common";

module {
  public type EventId = CommonTypes.EntityId;
  public type Timestamp = CommonTypes.Timestamp;

  public type Event = {
    id : EventId;
    title : Text;
    description : Text;
    date : Timestamp;
    location : Text;
    imageUrl : Text;
  };
};
