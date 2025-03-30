import { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Plant Disease Detection</h2>
      <input type="file" onChange={handleImageChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload Image
      </button>
      {prediction && <p className="mt-4 text-xl">Prediction: {prediction}</p>}
    </div>
  );
};

export default UploadImage;
