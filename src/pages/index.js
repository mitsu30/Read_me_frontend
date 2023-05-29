function HomePage() {
  return (
    <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        >
          <source src="/video/top.mp4" type="video/mp4" />
        </video>
    );
}

export default HomePage;
