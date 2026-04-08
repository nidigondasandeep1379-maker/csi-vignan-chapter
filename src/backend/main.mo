import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import EventLib "lib/events";
import TeamLib "lib/team";
import GalleryLib "lib/gallery";

import EventTypes "types/events";
import TeamTypes "types/team";
import GalleryTypes "types/gallery";
import ContactTypes "types/contact";

import EventsMixin "mixins/events-api";
import TeamMixin "mixins/team-api";
import GalleryMixin "mixins/gallery-api";
import ContactMixin "mixins/contact-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (gallery and team photo uploads)
  include MixinObjectStorage();

  // Events state
  let events = List.empty<EventTypes.Event>();
  var nextEventId : Nat = EventLib.seedEvents(events, 1);
  include EventsMixin(accessControlState, events, nextEventId);

  // Team members state
  let members = List.empty<TeamTypes.TeamMember>();
  var nextMemberId : Nat = TeamLib.seedMembers(members, 1);
  include TeamMixin(accessControlState, members, nextMemberId);

  // Gallery state
  let galleryImages = List.empty<GalleryTypes.GalleryImage>();
  var nextImageId : Nat = GalleryLib.seedImages(galleryImages, 1);
  include GalleryMixin(accessControlState, galleryImages, nextImageId);

  // Contact submissions state
  let contactSubmissions = List.empty<ContactTypes.ContactSubmission>();
  var nextSubmissionId : Nat = 1;
  include ContactMixin(accessControlState, contactSubmissions, nextSubmissionId);
};
