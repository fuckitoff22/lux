export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/lux-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
        }}
      ></div>

      {/* Center Content */}
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "60px", letterSpacing: "8px" }}>LUX</h1>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Elevate Your Lifestyle
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "12px 30px",
            fontSize: "16px",
            background: "white",
            color: "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Explore Now
        </button>
      </div>
    </main>
  );
}