import React, { useState, useEffect } from "react";

/**
 * Helper to derive the tiny -thumb.webp path from any .webp image path
 */
export function getThumbUrl(src) {
  if (!src) return "";
  if (src.endsWith("-thumb.webp")) return src;
  return src.replace(/\.(webp|png|jpe?g)$/i, "-thumb.webp");
}

/**
 * Progressive WebP Image Component
 * Shows the lightweight thumbnail preview initially, then smoothly reveals
 * the crystal clear full-resolution image once downloaded in the background.
 */
export default function ProgressiveImage({
  src,
  thumb,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
  objectFit = "cover",
  ...rest
}) {
  const thumbUrl = thumb || getThumbUrl(src);
  const hasDistinctThumb = thumbUrl && thumbUrl !== src;

  const [currentSrc, setCurrentSrc] = useState(hasDistinctThumb ? thumbUrl : src);
  const [isLoaded, setIsLoaded] = useState(!hasDistinctThumb);

  useEffect(() => {
    if (!src) return;

    if (!hasDistinctThumb) {
      setCurrentSrc(src);
      setIsLoaded(true);
      return;
    }

    // Start with thumbnail
    setCurrentSrc(thumbUrl);
    setIsLoaded(false);

    // Preload the full resolution clear image in the background
    let isMounted = true;
    const imgLoader = new Image();
    imgLoader.src = src;

    imgLoader.onload = () => {
      if (isMounted) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };

    imgLoader.onerror = () => {
      if (isMounted) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };

    if (imgLoader.complete && imgLoader.naturalWidth > 0) {
      setCurrentSrc(src);
      setIsLoaded(true);
    }

    return () => {
      isMounted = false;
      imgLoader.onload = null;
      imgLoader.onerror = null;
    };
  }, [src, thumbUrl, hasDistinctThumb]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={`${className} progressive-webp-img ${
        isLoaded ? "is-loaded" : "is-loading"
      }`.trim()}
      style={{
        objectFit,
        transition: "filter 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease",
        filter: isLoaded ? "none" : "blur(4px)",
        ...style,
      }}
      {...rest}
    />
  );
}
