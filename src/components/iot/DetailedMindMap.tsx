import mindmapImg from "../../assets/mindmap.png";

export const DetailedMindMap = () => {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "2.5rem 1rem 2rem",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "hsl(215 12% 52%)",
            marginBottom: 10,
          }}
        >
          Visual Reference
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "hsl(210 100% 56%)",
            textShadow: "0 0 24px hsl(210 100% 56% / 0.35)",
          }}
        >
          Detailed Mind Map
        </h2>
        <p
          style={{
            color: "hsl(215 12% 52%)",
            fontSize: 13,
            maxWidth: 380,
            margin: "10px auto 0",
            lineHeight: 1.6,
          }}
        >
          A complete overview of the Internet of Things ecosystem
        </p>
      </div>

      {/* Mind Map Image */}
      <div
        style={{
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid hsl(225 12% 16%)",
          boxShadow: "0 0 40px hsl(210 100% 56% / 0.08)",
        }}
      >
        <img
          src={mindmapImg}
          alt="IoT Detailed Mind Map"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};
