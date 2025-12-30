"use client";
import { useState, useEffect } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsBookmarked(false);
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id)
      .then((res) => {
        if (res.error) return toast.error(res.error);
        setIsBookmarked(res.isBookmarked);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to check bookmark status");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a listing");
      return;
    }

    bookmarkProperty(property._id)
      .then((res) => {
        if (res.error) return toast.error(res.error);
        setIsBookmarked(res.isBookmarked);
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong");
      });
  };

  if (loading) {
    return (
      <button
        className="bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        disabled
      >
        <FaBookmark className="mr-2" /> Loading...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
