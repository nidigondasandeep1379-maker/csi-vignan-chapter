import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type GalleryId = CommonTypes.EntityId;
  public type Timestamp = CommonTypes.Timestamp;

  public type GalleryImage = {
    id : GalleryId;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
    uploadedAt : Timestamp;
  };
};
