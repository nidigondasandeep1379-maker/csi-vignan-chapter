import List "mo:core/List";
import EventTypes "../types/events";

module {
  public type Event = EventTypes.Event;
  public type EventId = EventTypes.EventId;

  public func listEvents(events : List.List<Event>) : [Event] {
    events.toArray();
  };

  public func getEvent(events : List.List<Event>, id : EventId) : ?Event {
    events.find(func(e) { e.id == id });
  };

  public func addEvent(
    events : List.List<Event>,
    nextId : Nat,
    title : Text,
    description : Text,
    date : Int,
    location : Text,
    imageUrl : Text,
  ) : Event {
    let event : Event = {
      id = nextId;
      title;
      description;
      date;
      location;
      imageUrl;
    };
    events.add(event);
    event;
  };

  public func updateEvent(
    events : List.List<Event>,
    id : EventId,
    title : Text,
    description : Text,
    date : Int,
    location : Text,
    imageUrl : Text,
  ) : Bool {
    var found = false;
    events.mapInPlace(func(e) {
      if (e.id == id) {
        found := true;
        { e with title; description; date; location; imageUrl };
      } else { e };
    });
    found;
  };

  public func deleteEvent(events : List.List<Event>, id : EventId) : Bool {
    let sizeBefore = events.size();
    let filtered = events.filter(func(e) { e.id != id });
    events.clear();
    events.append(filtered);
    events.size() < sizeBefore;
  };

  public func seedEvents(events : List.List<Event>, startId : Nat) : Nat {
    if (events.size() > 0) { return startId };
    let seed : [(Text, Text, Text, Text)] = [
      (
        "CSI Orientation 2024",
        "Welcome ceremony for new CSI members at Vignan University. Learn about upcoming events, projects, and opportunities in the Computer Society of India student chapter.",
        "Vignan University Auditorium, Hyderabad",
        "",
      ),
      (
        "Hackathon: Code for Change",
        "A 24-hour coding marathon where students solve real-world problems using technology. Open to all branches. Form teams of 2–4 and register now!",
        "CSE Block, Vignan University",
        "",
      ),
      (
        "Tech Talk: AI & Machine Learning",
        "An expert session on the latest advances in Artificial Intelligence and Machine Learning, featuring live demos and Q&A with industry professionals.",
        "Seminar Hall, Vignan University",
        "",
      ),
    ];
    var id = startId;
    // Use approximate dates: 2024-09-15, 2024-11-02, 2025-01-20 in nanoseconds
    let dates : [Int] = [
      1726358400000000000,
      1730505600000000000,
      1737331200000000000,
    ];
    var i = 0;
    for ((title, description, location, imageUrl) in seed.values()) {
      let event : Event = {
        id;
        title;
        description;
        date = dates[i];
        location;
        imageUrl;
      };
      events.add(event);
      id += 1;
      i += 1;
    };
    id;
  };
};
