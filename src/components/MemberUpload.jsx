import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "../styles/Sections.css";

const CLOUD_NAME = "dedpaxzta";
const UPLOAD_PRESET = "darkempire";

// Helper — crop the image using a canvas
async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
  });
}

export default function MemberUpload({ memberName, onUpload }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  // Read the selected file as a data URL
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
      setDone(false);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!imageSrc || !croppedArea) return;
    setUploading(true);
    setError(null);

    try {
      const blob = await getCroppedImg(imageSrc, croppedArea);
      const formData = new FormData();
      formData.append("file", blob, "profile.jpg");
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "darkempire");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      if (data.secure_url) {
        const saved = JSON.parse(
          localStorage.getItem("de_member_images") || "{}",
        );
        saved[memberName] = data.secure_url;
        localStorage.setItem("de_member_images", JSON.stringify(saved));
        onUpload(data.secure_url);
        setDone(true);
        setShowCropper(false);
        setImageSrc(null);
      } else {
        setError("Upload failed. Try again.");
      }
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <>
      {/* CROPPER MODAL */}
      {showCropper && (
        <div className="de-crop-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="de-crop-modal">
            <p className="de-crop-title">✂️ Adjust Your Photo</p>
            <p className="de-crop-hint">
              Drag to reposition · Pinch or scroll to zoom
            </p>

            {/* Cropper */}
            <div className="de-crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom slider */}
            <div className="de-crop-zoom">
              <span className="de-crop-zoom-label">🔍 Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="de-crop-slider"
              />
            </div>

            {/* Actions */}
            <div className="de-crop-actions">
              <button className="de-crop-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className={`de-crop-confirm ${uploading ? "loading" : ""}`}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span className="de-upload-spinner" /> Uploading...
                  </>
                ) : (
                  <> Save Photo</>
                )}
              </button>
            </div>

            {error && <p className="de-upload-error">{error}</p>}
          </div>
        </div>
      )}

      {/* TRIGGER BUTTON */}
      <div className="de-upload-wrap">
        <label className={`de-upload-btn ${done ? "done" : ""}`}>
          {done ? (
            <>
              <span>✅</span> Photo Updated!
            </>
          ) : (
            <>
              <span className="de-upload-icon">📸</span> Change Profile Photo
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </>
  );
}
