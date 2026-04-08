import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import GalleryLib "../lib/gallery";
import GalleryTypes "../types/gallery";

mixin (
  accessControlState : AccessControl.AccessControlState,
  images : List.List<GalleryTypes.GalleryImage>,
  nextImageId : Nat,
) {
  var _nextImageId : Nat = nextImageId;

  public query func listGalleryImages() : async [GalleryTypes.GalleryImage] {
    GalleryLib.listImages(images);
  };

  public shared ({ caller }) func addGalleryImage(
    title : Text,
    description : Text,
    image : Storage.ExternalBlob,
  ) : async GalleryTypes.GalleryImage {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add gallery images");
    };
    let img = GalleryLib.addImage(images, _nextImageId, title, description, image, Time.now());
    _nextImageId += 1;
    img;
  };

  public shared ({ caller }) func deleteGalleryImage(id : GalleryTypes.GalleryId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery images");
    };
    GalleryLib.deleteImage(images, id);
  };
};
