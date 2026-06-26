import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * SafeImage component for handling image loading with fallbacks
 *
 * This component solves the "data:;base64,=:1 Failed to load resource: net::ERR_INVALID_URL" error
 * by validating image sources and providing a fallback when needed.
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL or base64 string
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.fallbackSrc - Fallback image to display on error
 * @param {Object} props.style - Custom styles for the image
 * @param {string} props.className - CSS class names
 * @returns {React.ReactElement} - React component
 */
const SafeImage = ({
  src,
  alt,
  fallbackSrc = "https://via.placeholder.com/150?text=Image+Not+Available",
  style = {},
  className = "",
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const [hasError, setHasError] = useState(false);

  // Validate the image source on mount and when src changes
  useEffect(() => {
    // Reset error state when source changes
    setHasError(false);

    // Handle empty or null src
    if (!src) {
      setImgSrc(fallbackSrc);
      return;
    }

    // Check if the source is a valid data URL
    if (src.startsWith("data:")) {
      // Handle the common error case "data:;base64,=" explicitly
      if (src === "data:;base64,=" || src === "data:,") {
        console.warn("Empty or invalid base64 data URL detected");
        setImgSrc(fallbackSrc);
        setHasError(true);
        return;
      }

      // Simple validation for data URLs - must have correct format
      const isValidDataUrl =
        /^data:image\/(jpeg|png|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/.test(
          src
        );

      if (isValidDataUrl) {
        setImgSrc(src);
      } else {
        console.warn("Invalid data URL format:", src.substring(0, 30) + "...");
        setImgSrc(fallbackSrc);
        setHasError(true);
      }
    } else {
      // For regular URLs, we'll let the image element's error handler deal with it
      setImgSrc(src);
    }
  }, [src, fallbackSrc]);

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      console.warn("Image failed to load:", src);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={style}
      className={`safe-image ${className} ${
        hasError ? "safe-image--error" : ""
      }`}
      {...restProps}
    />
  );
};

SafeImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default SafeImage;
