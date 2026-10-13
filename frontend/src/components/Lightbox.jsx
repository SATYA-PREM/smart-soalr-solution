import React, { useEffect, useState } from "react";
import { getThumbUrl } from "./ProgressiveImage";

export default function Lightbox({
  lightboxState,
  closeLightbox,
  prevLightbox,
  nextLightbox,
  selectLightboxIndex,
  // Direct props support
  isOpen: propIsOpen,
  items: propItems,
  currentIndex: propCurrentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const isOpen = lightboxState ? lightboxState.isOpen : Boolean(propIsOpen);
  const items = (lightboxState ? lightboxState.items : propItems) || [];
  const currentIndex =
    (lightboxState ? lightboxState.currentIndex : propCurrentIndex) || 0;

  const [fullImgLoaded, setFullImgLoaded] = useState(false);

  const handleClose = closeLightbox || onClose || (() => {});
  const handlePrev = prevLightbox || onPrev || (() => {});
  const handleNext = nextLightbox || onNext || (() => {});

  const currentItem = items[currentIndex] || {};
  const currentThumb = currentItem.thumb || getThumbUrl(currentItem.image);

  useEffect(() => {
    setFullImgLoaded(false);
  }, [currentIndex, currentItem.image]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  return (
    <div
      className={`lightbox ${isOpen ? "open" : ""}`}
      id="lightbox"
      aria-hidden={!isOpen}
      role="dialog"
      onClick={(e) => {
        if (e.target.id === "lightbox") handleClose();
      }}
    >
      <button
        className="lightbox-close"
        id="lightboxClose"
        aria-label="Close Lightbox"
        onClick={handleClose}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <button
        className="lightbox-prev"
        id="lightboxPrev"
        aria-label="Previous Image"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        className="lightbox-next"
        id="lightboxNext"
        aria-label="Next Image"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div
          className="lightbox-media"
          style={{
            backgroundImage:
              !currentItem.youtubeId && currentThumb
                ? `url("${currentThumb}")`
                : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {currentItem.youtubeId ? (
            <div className="lightbox-video-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentItem.youtubeId}?autoplay=1&rel=0`}
                title={currentItem.title || "Solar Project Video"}
                className="lightbox-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              className={`lightbox-image ${
                fullImgLoaded ? "loaded" : "loading"
              }`}
              id="lightboxImage"
              src={currentItem.image || ""}
              alt={currentItem.title || "Enlarged Project View"}
              onLoad={() => setFullImgLoaded(true)}
            />
          )}
        </div>
        <div className="lightbox-caption">
          <strong id="lightboxTitle">
            {currentItem.title || "Solar Installation"}
          </strong>
          <span id="lightboxDescription">
            {currentItem.description || "Smart Solar Solutions Project"}
          </span>
        </div>

        {/* THUMBNAIL STRIP UNDER FULL IMAGE */}
        {items.length > 1 && (
          <div className="lightbox-thumb-strip">
            {items.map((item, idx) => {
              const tUrl = item.thumb || getThumbUrl(item.image);
              return (
                <button
                  key={item.id || idx}
                  type="button"
                  className={`lightbox-thumb-item ${
                    idx === currentIndex ? "active" : ""
                  } ${item.youtubeId ? "is-video" : ""}`}
                  onClick={() =>
                    selectLightboxIndex && selectLightboxIndex(idx)
                  }
                  aria-label={item.title || `Thumbnail ${idx + 1}`}
                >
                  <img src={tUrl || item.image} alt={item.title || ""} />
                  {item.youtubeId && (
                    <span className="thumb-video-icon">
                      <i className="fa-brands fa-youtube"></i>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
