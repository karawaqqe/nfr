import { useState } from "react";
import { Camera } from "lucide-react";
import styles from "./ProductImage.module.css";

export default function ProductImage({ src, alt = "", className = "", loading = "lazy" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src) {
    return (
      <div className={`${styles.placeholder} ${className}`} role="img" aria-label={alt ? `${alt} — photo coming soon` : "Photo coming soon"}>
        <Camera aria-hidden="true" strokeWidth={1.5} />
        <span aria-hidden="true">NO PHOTO</span>
      </div>
    );
  }
  return <img className={className} src={src} alt={alt} loading={loading} onError={() => setFailedSrc(src)} />;
}
