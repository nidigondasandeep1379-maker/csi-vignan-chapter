import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import EventLib "../lib/events";
import EventTypes "../types/events";

mixin (
  accessControlState : AccessControl.AccessControlState,
  events : List.List<EventTypes.Event>,
  nextEventId : Nat,
) {
  var _nextEventId : Nat = nextEventId;

  public query func listEvents() : async [EventTypes.Event] {
    EventLib.listEvents(events);
  };

  public query func getEvent(id : EventTypes.EventId) : async ?EventTypes.Event {
    EventLib.getEvent(events, id);
  };

  public shared ({ caller }) func addEvent(
    title : Text,
    description : Text,
    date : Int,
    location : Text,
    imageUrl : Text,
  ) : async EventTypes.Event {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create events");
    };
    let event = EventLib.addEvent(events, _nextEventId, title, description, date, location, imageUrl);
    _nextEventId += 1;
    event;
  };

  public shared ({ caller }) func updateEvent(
    id : EventTypes.EventId,
    title : Text,
    description : Text,
    date : Int,
    location : Text,
    imageUrl : Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update events");
    };
    EventLib.updateEvent(events, id, title, description, date, location, imageUrl);
  };

  public shared ({ caller }) func deleteEvent(id : EventTypes.EventId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    EventLib.deleteEvent(events, id);
  };
};
