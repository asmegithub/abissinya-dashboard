import { storage } from "@/app/firebase/firebaseConfig";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  type: string;
  name: string;
  price: string;
  image: File | null;
  imageURL: string;
}

const AddSnack = ({
  setShowModal,
  setSnacks,
}: {
  setShowModal: any;
  setSnacks:any
}) => {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    name: "",
    price: "",
    image: null,
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList | null;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageURL: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (formData.image) {
        const storageRef = ref(storage, `snacks/${formData.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.image);
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(true);
          },
          (error) => {
            setLoading(false);
            toast.error("Image upload failed. Please try again.");
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setLoading(false);
            resolve(downloadURL);
          }
        );
      } else {
        reject(new Error("No file selected"));
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imageURL = await handleUpload();
      const formDataWithImageURL = { ...formData, imageURL };

      const requestBody = {
        type: formDataWithImageURL.type,
        name: formDataWithImageURL.name,
        image: formDataWithImageURL.imageURL,
        price: parseFloat(formDataWithImageURL.price),
      };

      await axios.post(
        `https://abissinia-backend.vercel.app/api/snacks`,
        requestBody
      );
      const response = await axios.get(
        "https://abissinia-backend.vercel.app/api/snacks"
      );
      const snacks= response.data;
      setSnacks(snacks);

      toast.success("Snack added successfully!");

      setFormData({
        type: "",
        name: "",
        price: "",
        image: null,
        imageURL: "",
      });

      setShowModal(false); // Close the modal after successful submission
    } catch (error) {
      toast.error("Failed to add snack. Please try again.");
      console.error(error);
    }
  };

  const inputStyle = {
    backgroundColor: "#1A1F33",
    color: "white",
    borderColor: "#4E5460",
    borderWidth: "1px",
    outline: "none",
    borderRadius: "8px",
    padding: "10px",
    width: "100%",
  };

  return (
    <div className="p-4 overflow-y-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <input
            type="text"
            className="grow"
            style={inputStyle}
            placeholder="Snack Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="grow"
            style={inputStyle}
            placeholder="Snack Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="grow"
            style={inputStyle}
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="grow"
            style={inputStyle}
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn border-2 bg-blue-700 rounded-lg px-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Add Snack"}
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center mt-4">
        <button
          className="button btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddSnack;
