import { storage } from "@/app/firebase/firebaseConfig";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  profilePhoto: File | null;
  profilePhotoURL: string;
}

const EditStar = ({
  setShowModal,
  starId,
}: {
  setShowModal: any;
  starId: string;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    profilePhoto: null,
    profilePhotoURL: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStar = async () => {
      try {
        const response = await axios.get(
          `https://abissinia-backend.vercel.app/api/stars/${starId}`
        );
        setFormData({
          name: response.data.name,
          email: response.data.address.email,
          phone: response.data.address.phone || "",
          website: response.data.address.website || "",
          profilePhoto: null,
          profilePhotoURL: response.data.profilePhoto,
        });
      } catch (error) {
        console.error("Error in fetching star:", error);
        toast.error("Error in fetching star data.");
      }
    };

    getStar();
  }, [starId]);

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
      setFormData((prevData) => ({ ...prevData, profilePhoto: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePhotoURL: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (formData.profilePhoto) {
        const storageRef = ref(storage, `stars/${formData.profilePhoto.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          formData.profilePhoto
        );
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
        resolve(formData.profilePhotoURL);
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const profilePhotoURL = await handleUpload();
      const formDataWithProfilePhotoURL = { ...formData, profilePhotoURL };

      const requestBody = {
        name: formDataWithProfilePhotoURL.name,
        address: {
          email: formDataWithProfilePhotoURL.email,
          phone: formDataWithProfilePhotoURL.phone,
          website: formDataWithProfilePhotoURL.website,
        },
        profilePhoto: formDataWithProfilePhotoURL.profilePhotoURL,
      };

      await axios.put(
        `https://abissinia-backend.vercel.app/api/stars/${starId}`,
        requestBody
      );

      toast.success("Star updated successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        profilePhoto: null,
        profilePhotoURL: "",
      });
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update star. Please try again.");
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
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="grow"
            style={inputStyle}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            className="grow"
            style={inputStyle}
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="url"
            className="grow"
            style={inputStyle}
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            className="grow"
            style={inputStyle}
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn border-2 bg-blue-700 rounded-lg px-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Update Star"}
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

export default EditStar;
