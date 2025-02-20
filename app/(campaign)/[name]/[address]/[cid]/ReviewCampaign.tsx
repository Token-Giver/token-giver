import { AllFormFields } from "@/app/create/page";
import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import Image from "next/image";

const ReviewCampaign = ({
  setShowReview,
  showReview,
  formData,
  createCampaign
}: {
  setShowReview: (value: React.SetStateAction<boolean>) => void;
  showReview: boolean;
  formData: AllFormFields;
  createCampaign: () => void;
}) => {
  return (
    <Dialog open={showReview} onOpenChange={setShowReview}>
      <DialogContent className="max-h-[90vh] p-6">
        <div className="space-y-6">
          <DialogTitle className="font-agrandir text-2xl font-bold">
            Review Campaign
          </DialogTitle>

          <div className="max-h-[70vh] overflow-y-auto">
            {/* Basic Info (Step 2) */}
            <section className="space-y-4">
              <h3 className="font-agrandir text-lg font-semibold">
                Basic Information
              </h3>
              <div className="grid gap-4 rounded-lg bg-[#F7F6F6] p-4">
                <div>
                  <p className="text-sm text-foreground-secondary">
                    Campaign Name
                  </p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">
                    Description
                  </p>
                  <p className="font-medium">{formData.description}</p>
                </div>
                {formData.category && (
                  <div>
                    <p className="text-sm text-foreground-secondary">
                      Category
                    </p>
                    <p className="font-medium">{formData.category}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Campaign Banner */}
            <section className="space-y-4">
              <h3 className="font-agrandir text-lg font-semibold">
                Campaign Banner
              </h3>
              <div className="rounded-lg bg-[#F7F6F6] p-4">
                {formData.bannerImage &&
                  formData.bannerImage instanceof File && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={URL.createObjectURL(formData.bannerImage)}
                        alt="Campaign banner"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
              </div>
            </section>

            {/* Additional Images */}
            {formData.additionalImages &&
              formData.additionalImages.length > 0 && (
                <section className="space-y-4">
                  <h3 className="font-agrandir text-lg font-semibold">
                    Additional Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4 rounded-lg bg-[#F7F6F6] p-4">
                    {Array.from(formData.additionalImages).map(
                      (image, index) => (
                        <div
                          key={index}
                          className="relative h-32 overflow-hidden rounded-lg"
                        >
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Additional image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* Campaign Details (Step 3) */}
            <section className="space-y-4">
              <h3 className="font-agrandir text-lg font-semibold">
                Campaign Details
              </h3>
              <div className="grid gap-4 rounded-lg bg-[#F7F6F6] p-4">
                <div>
                  <p className="text-sm text-foreground-secondary">
                    Target Amount
                  </p>
                  <p className="font-medium">{formData.target} STRK</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Location</p>
                  <p className="font-medium">{formData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Organiser</p>
                  <p className="font-medium">{formData.organiser}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">
                    Beneficiary
                  </p>
                  <p className="font-medium">{formData.beneficiary}</p>
                </div>
              </div>
            </section>

            {/* Social Links (Step 3) */}
            <section className="space-y-4">
              <h3 className="font-agrandir text-lg font-semibold">
                Social Links
              </h3>
              <div className="grid gap-4 rounded-lg bg-[#F7F6F6] p-4">
                {formData.socials &&
                  Object.entries(formData.socials).map(
                    ([name, url]) =>
                      url && (
                        <div key={name}>
                          <p className="text-sm capitalize text-foreground-secondary">
                            {name}
                          </p>
                          <p className="font-medium">{url}</p>
                        </div>
                      )
                  )}
                {formData.customLinks && formData.customLinks.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm text-foreground-secondary">
                      Additional Links
                    </p>
                    {formData.customLinks.map(
                      (link, index) =>
                        link.url && (
                          <div key={index} className="mt-2">
                            <p className="text-sm text-foreground-secondary">
                              Website {index + 1}
                            </p>
                            <p className="font-medium">{link.url}</p>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </section>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowReview(false)}
                className="rounded-[8px] border border-gray-300 px-6 py-2 text-sm text-foreground-secondary hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={createCampaign}
                className="rounded-[8px] bg-accent-green px-4 py-2 text-sm text-white"
              >
                mint Campaign
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewCampaign;
