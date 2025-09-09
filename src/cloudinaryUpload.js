// cloudinaryUpload.js
export async function uploadFileToCloudinary(file) {
  const cloudName = 'dgfqrseb4'; // Replace with your Cloudinary cloud name
  const unsignedUploadPreset = 'DeveloperTask'; // Replace with your Upload Preset name

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
  return data.secure_url; // This is the file URL you store in your database
}
