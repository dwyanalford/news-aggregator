// app/components/ArticleImage.tsx

"use client";

import { useState, useEffect } from "react";

interface ArticleImageProps {
  src?: string;
  alt?: string;
}

export default function ArticleImage({ src, alt = "" }: ArticleImageProps) {
  // 1. Set your fallback path here. This file must exist in public/images/rss_backup:
  const fallbackSrc = "/images/default.webp";

  // 2. Decide if the incoming src is invalid or refers to a missing image.
  const isInvalidSrc = !src || src.includes("/rss_backup");

  // 3. Start with fallback if invalid, otherwise use the real src.
  const [imageSrc, setImageSrc] = useState(isInvalidSrc ? fallbackSrc : src);

  // 4. If src changes, check again if we need to use the fallback.
  useEffect(() => {
    if (!src || src.includes("/rss_backup")) {
      setImageSrc(fallbackSrc);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  // 5. If the image fails to load, switch to fallback.
  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="object-cover w-full h-full absolute top-0 left-0"
      onError={handleImageError}
    />
  );
}