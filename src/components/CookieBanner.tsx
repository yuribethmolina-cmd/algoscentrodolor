import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const KEY = "algos_cookies_ok";

const DEEP_TEAL = "#1a4a55";
const CREAM = "#f5f0e8";
const GOLD = "#c69636";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        backgroundColor: DEEP_TEAL,
        color: CREAM,
        borderRadius: 10,
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        maxWidth: "calc(100vw - 32px)",
        width: "max-content",
      }}
    >
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          lineHeight: 1.4,
          margin: 0,
          color: "rgba(245,240,232,0.85)",
        }}
      >
        Usamos cookies de análisis.{" "}
        <Link
          to="/politica-cookies"
          style={{ color: GOLD, textDecoration: "underline", whiteSpace: "nowrap" }}
        >
          Más información
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: DEEP_TEAL,
          backgroundColor: CREAM,
          border: "none",
          borderRadius: 6,
          padding: "6px 14px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Entendido
      </button>
    </div>
  );
}
