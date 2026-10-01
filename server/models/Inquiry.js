import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    interest: { type: String, trim: true, default: "General" },
    message: { type: String, trim: true, default: "" },
    source: { type: String, trim: true, default: "contact" },
    estimate: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
