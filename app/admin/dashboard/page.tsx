"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function AdminDashboard() {

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("YouTube Thumbnail Normal");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Protect dashboard
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (!user) {
        router.push("/admin/login");
      }

    });

    return () => unsubscribe();

  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {

    const querySnapshot = await getDocs(collection(db, "gallery"));

    const imageList: any[] = [];

    querySnapshot.forEach((docItem) => {
      imageList.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setImages(imageList);

  };

  const handleUpload = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const imageUrl = data.secure_url;

      await addDoc(collection(db, "gallery"), {
        title: title,
        imageUrl: imageUrl,
        category: category,
        createdAt: Date.now(),
      });

      alert("Image uploaded successfully!");

      setFile(null);
      setTitle("");
      setCategory("YouTube Thumbnail Normal");

      fetchImages();

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    }

    setUploading(false);

  };

  const handleDelete = async (id: string) => {

    await deleteDoc(doc(db, "gallery", id));

    alert("Image deleted");

    fetchImages();

  };

  const handleLogout = async () => {

    try {

      await signOut(auth);

      router.push("/admin/login");

    } catch (error) {

      alert("Logout failed");

    }

  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        {/* Upload Section */}
        <div className="bg-gray-900 p-8 rounded-xl space-y-6">

          <h2 className="text-2xl font-semibold">
            Upload New Image
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">

            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 bg-black border border-gray-700 rounded-lg"
            />

            <input
              type="text"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded-lg"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded-lg"
            >
              <option>YouTube Thumbnail Normal</option>
              <option>YouTube Thumbnail AI</option>
              <option>Folk Song Poster</option>
              <option>Graphic Designs</option>
              <option>Political Poster</option>
              <option>Additional Work</option>
            </select>

            <button
              type="submit"
              disabled={uploading}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>

          </form>

        </div>

        {/* Manage Images */}
        <div className="space-y-6">

          <h2 className="text-2xl font-semibold">
            Manage Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            {images.map((img) => (

              <div key={img.id} className="bg-gray-800 p-3 rounded-lg">

                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-40 object-cover rounded"
                />

                <p className="mt-2 text-sm text-gray-300">
                  {img.title}
                </p>

                <button
                  onClick={() => handleDelete(img.id)}
                  className="mt-2 w-full bg-red-500 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}