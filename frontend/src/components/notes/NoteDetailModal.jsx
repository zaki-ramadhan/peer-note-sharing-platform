import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Star,
  Calendar,
  User,
  FileText,
  Eye,
  Heart,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  Tag,
  Clock,
  FileType,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@ui/Card";
import Button from "@ui/Button";
import { Badge, Avatar } from "@ui";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

const NoteDetailModal = ({ isOpen, onClose, note, onDownload, onRate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey, false);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey, false);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !note) return null;

  const {
    id: noteId,
    title,
    description,
    subject,
    author,
    authorEmail,
    uploadDate,
    downloadCount,
    averageRating,
    reviewCount,
    fileType,
    tags,
    fileName,
    fileSize,
    thumbnails = [],
  } = note;

  const handleDownload = () => {
    onDownload(note);
  };

  const handleRate = () => {
    onRate(note);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Check out this note: ${title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Show toast notification
        console.log("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileExtension = (filename) => {
    if (!filename) return "";
    const lastDot = filename.lastIndexOf(".");
    if (lastDot === -1) return "";
    return filename.substring(lastDot + 1).toLowerCase();
  };

  const getDisplayFileType = (fileType, fileName) => {
    if (fileType) return fileType.toUpperCase();
    const extension = getFileExtension(fileName);
    if (extension) return extension.toUpperCase();
    return "Unknown";
  };

  const getFileTypeIcon = (type, fileName) => {
    const actualType = type || getFileExtension(fileName);
    const lowerType = actualType?.toLowerCase() || "";

    if (lowerType.includes("pdf"))
      return <FileText className="w-5 h-5 text-red-500" />;
    if (lowerType.includes("doc") || lowerType.includes("docx"))
      return <FileText className="w-5 h-5 text-blue-500" />;
    if (lowerType.includes("ppt") || lowerType.includes("pptx"))
      return <FileText className="w-5 h-5 text-orange-500" />;
    if (lowerType.includes("xls") || lowerType.includes("xlsx"))
      return <FileText className="w-5 h-5 text-green-500" />;
    if (lowerType.includes("txt"))
      return <FileText className="w-5 h-5 text-gray-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white px-8 py-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32"></div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 pr-16">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {getFileTypeIcon(fileType, fileName)}
              </div>
              <Badge className="bg-white/25 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold rounded-xl">
                {subject}
              </Badge>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-sm text-white/90">
                  {formatDistanceToNow(new Date(uploadDate), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text">
              {title}
            </h1>

            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2">
                <Avatar className="w-8 h-8 bg-white/20 text-white font-semibold text-sm border-2 border-white/30">
                  {author?.charAt(0)?.toUpperCase() || "A"}
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {author}
                  </div>
                  <div className="text-xs text-white/70">Author</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="font-semibold">
                    {averageRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1">
                  <Download className="w-4 h-4 text-green-300" />
                  <span className="font-semibold">{downloadCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-8">
            {/* Enhanced Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {downloadCount || 0}
                  </div>
                  <div className="text-sm font-medium text-blue-700">
                    Downloads
                  </div>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {averageRating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="text-sm font-medium text-yellow-700">
                    Rating
                  </div>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {reviewCount || 0}
                  </div>
                  <div className="text-sm font-medium text-green-700">
                    Reviews
                  </div>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {downloadCount * 3 || 0}
                  </div>
                  <div className="text-sm font-medium text-purple-700">
                    Views
                  </div>
                </Card>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Description</h3>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200/50">
                <p
                  className={`text-gray-700 leading-relaxed text-base ${
                    !showFullDescription ? "overflow-hidden" : ""
                  }`}
                  style={
                    !showFullDescription
                      ? {
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }
                      : {}
                  }
                >
                  {description || "No description available for this note."}
                </p>
                {description && description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Tags */}
            {tags && tags.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-200 rounded-xl font-semibold text-sm hover:scale-105"
                    >
                      <span className="text-blue-500">#</span>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Enhanced File Info */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3">
                    <FileType className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    File Information
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <span className="text-sm font-medium text-gray-600 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      File Name:
                    </span>
                    <span className="text-sm font-bold text-gray-900 truncate max-w-xs">
                      {fileName || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <span className="text-sm font-medium text-gray-600 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      File Size:
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatFileSize(fileSize) || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <span className="text-sm font-medium text-gray-600 flex items-center">
                      {getFileTypeIcon(fileType, fileName)}
                      <span className="ml-2">File Type:</span>
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {getDisplayFileType(fileType, fileName)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Author Info */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    About Author
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl border-4 border-white shadow-lg">
                        {author?.charAt(0)?.toUpperCase() || "A"}
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {author}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {authorEmail}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          <Users className="w-3 h-3 mr-1" />
                          Contributor
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Button
                onClick={handleDownload}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl py-3 font-semibold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download
                </div>
              </Button>

              <Button
                onClick={handleRate}
                variant="outline"
                className="group relative overflow-hidden border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 transition-all duration-300 rounded-xl py-3 font-semibold hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Star className="w-5 h-5 mr-2 group-hover:fill-current group-hover:text-yellow-500 transition-all duration-300" />
                  Rate
                </div>
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="group relative overflow-hidden border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-300 rounded-xl py-3 font-semibold hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Share
                </div>
              </Button>

              <Button
                variant="outline"
                className="group relative overflow-hidden border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-300 rounded-xl py-3 font-semibold hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2 group-hover:fill-current group-hover:text-red-500 transition-all duration-300" />
                  Save
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;
