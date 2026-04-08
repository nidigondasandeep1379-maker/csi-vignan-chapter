import List "mo:core/List";
import Text "mo:core/Text";
import Storage "mo:caffeineai-object-storage/Storage";
import GalleryTypes "../types/gallery";

module {
  public type GalleryImage = GalleryTypes.GalleryImage;
  public type GalleryId = GalleryTypes.GalleryId;

  public func listImages(images : List.List<GalleryImage>) : [GalleryImage] {
    images.toArray();
  };

  public func addImage(
    images : List.List<GalleryImage>,
    nextId : Nat,
    title : Text,
    description : Text,
    image : Storage.ExternalBlob,
    uploadedAt : Int,
  ) : GalleryImage {
    let img : GalleryImage = {
      id = nextId;
      title;
      description;
      image;
      uploadedAt;
    };
    images.add(img);
    img;
  };

  public func deleteImage(images : List.List<GalleryImage>, id : GalleryId) : Bool {
    let sizeBefore = images.size();
    let filtered = images.filter(func(img) { img.id != id });
    images.clear();
    images.append(filtered);
    images.size() < sizeBefore;
  };

  public func seedImages(images : List.List<GalleryImage>, startId : Nat) : Nat {
    if (images.size() > 0) { return startId };
    let seed : [(Text, Text)] = [
      ("CSI Orientation Day", "Students gathering at the CSI orientation event at Vignan University."),
      ("Hackathon Winners 2024", "The winning team celebrates at the annual CSI Hackathon: Code for Change."),
      ("Tech Talk Session", "CSI members attending the AI & Machine Learning tech talk session."),
    ];
    var id = startId;
    // Use approximate upload timestamps in nanoseconds
    let timestamps : [Int] = [
      1726444800000000000,
      1730592000000000000,
      1737417600000000000,
    ];
    var i = 0;
    for ((title, description) in seed.values()) {
      let img : GalleryImage = {
        id;
        title;
        description;
        image = "".encodeUtf8();
        uploadedAt = timestamps[i];
      };
      images.add(img);
      id += 1;
      i += 1;
    };
    id;
  };
};
