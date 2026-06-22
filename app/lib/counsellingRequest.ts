export type CounsellingRequestDetails = {
  leadCode: string;
  name: string;
  mobile: string;
  course: string;
  preference: string;
  location: string;
  message: string | null;
};

const COUNSELLING_WHATSAPP_NUMBER = "919563910223";

export function buildCounsellingWhatsAppMessage(
  request: CounsellingRequestDetails
) {
  const locationLabel =
    request.preference === "India" ? "Preferred State" : "Preferred Country";

  return [
    "Hello ILMALINK MEDIGO,",
    "",
    "I have submitted my counselling request and would like an instant reply.",
    "",
    `Request ID: ${request.leadCode}`,
    `Name: ${request.name}`,
    `Mobile: ${request.mobile}`,
    `Course: ${request.course}`,
    `Study Preference: ${request.preference}`,
    `${locationLabel}: ${request.location}`,
    `Message: ${request.message || "Not provided"}`,
  ].join("\n");
}

export function buildCounsellingWhatsAppUrl(
  request: CounsellingRequestDetails
) {
  return `https://wa.me/${COUNSELLING_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildCounsellingWhatsAppMessage(request)
  )}`;
}
