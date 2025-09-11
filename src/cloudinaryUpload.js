export async function uploadFileToCloudinary(file) {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const unsignedUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', unsignedUploadPreset);

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
}
