import React, { useState } from 'react';
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import api from '../../Api';

export const ProfileCard = ({ user, setUpdate }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    if (!user) {
        return <p className="text-gray-400">Loading your profile...</p>;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
        e.target.value = null;

    };

    const handleUpload = async () => {
        if (!image) return;
        setUploading(true);
        setError('');
        try {
            const formdata = new FormData();
            formdata.append("profileImg", image);
            const res = await api.post(
                `/profilepic`,
                formdata,
                { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            );
            console.log(res.data);
            alert("Image uploaded successfully!");
            // setImage(null);
            // setPreview(null);
            setUpdate(pre => !pre)
        } catch (err) {
            console.error("Upload failed:", err);
            setError(err?.response?.data?.message || "Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const clearPreview = () => {
        setImage(null);
        setPreview(null);
        setError('');
    };

    return (
        <div className="border border-gray-700 w-full md:w-1/3 flex flex-col items-center space-y-4 p-5 rounded-lg bg-gray-800/90 min-h-[410px] relative">
            <h4 className="text-gray-300 text-2xl font-bold first-letter:uppercase">{user.fullName}</h4>
            <p className="text-green-400 uppercase tracking-wider text-[12px]">
                {user.accountType || "Savings Account"}
            </p>

            <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handleImageChange}
                className="hidden"
                id="imageInput"

            />
            {
                preview && <button
                    onClick={(e) => {
                        e.stopPropagation();
                        clearPreview();
                    }}
                    aria-label="Clear selected image"
                    title="Clear selected image"
                    className="text-red-400 font-bold text-xl cursor-pointer bg-transparent border-none p-0 absolute top-0 right-1"
                    type="button"
                >
                    &times;
                </button>
            }
            <label htmlFor="imageInput" className="flex flex-col items-center relative cursor-pointer">
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="object-cover w-40 h-40 rounded-full border-2 border-gray-600"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center absolute bottom-2 w-full">
                                {error}
                            </p>
                        )}
                    </>
                ) : (
                    <div className="border-4 border-gray-600 w-40 h-40 flex items-center justify-center rounded-full overflow-hidden">
                        {user?.profileImg?.url && user.profileImg?.url.trim().length > 0 ? (
                            <img
                                src={user?.profileImg?.url}
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <FaUserPlus size={110} className="text-white" />
                        )}
                    </div>
                )}
            </label>

            <div className="w-full mt-3 space-y-1">
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs font-semibold">Account No</span>
                    <span className="text-md font-bold">{user.accountNumber}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-gray-500 text-xs font-semibold">Balance</span>
                    <span className="text-lg font-bold text-green-300">
                        ₹{Number(user.balance || 0).toLocaleString()}
                    </span>
                </div>
            </div>
            {
                preview &&
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpload();
                    }}
                    disabled={uploading}
                    className="bg-green-500  text-white text-sm flex items-center gap-2 py-2 px-4 rounded cursor-pointer transition relative bottom-0 left-1/2 transform -translate-x-1/2 disabled:opacity-50"
                    type="button"
                >
                    {uploading ? "Uploading..." : "Update"} <AiOutlineCloudUpload />
                </button>
            }
        </div>
    );
};
