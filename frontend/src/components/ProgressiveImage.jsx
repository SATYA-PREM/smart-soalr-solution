import React, { useState, useEffect, useRef } from "react";

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
 * Displays the lightweight `-thumb.webp` image in the background immediately,
 * then smoothly reveals the full-resolution `.webp` image once loaded.
 */
export default function ProgressiveImage({
  src,
  thumb,
  alt = "",
  className = "",
  wrapperClassName = "",
  style = {},
  loading = "lazy",
  objectFit = "cover",
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const thumbUrl = thumb || getThumbUrl(src);

  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      className={`${className} progressive-webp-img ${
        isLoaded ? "is-loaded" : "is-loading"
      }`.trim()}
      style={{
        backgroundImage: !isLoaded && thumbUrl ? `url("${thumbUrl}")` : "none",
        backgroundSize: objectFit,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "opacity 0.35s ease, filter 0.35s ease",
        ...style,
      }}
      {...rest}
    />
  );
}

