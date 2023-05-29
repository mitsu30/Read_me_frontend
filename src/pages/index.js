export default function HomePage() {
  return (
    <div style={{
      position: 'fixed',
      right: 0,
      bottom: 0,
      width: '100%',  // change from minWidth
      height: '100%', // change from minHeight
      zIndex: -100
    }}>
      <video autoPlay loop muted style={{
        position: 'fixed',
        right: '50%',
        bottom: '50%',
        width: '100%',  // change from minWidth
        height: '100%', // change from minHeight
        transform: 'translate(50%, 50%)',
        objectFit: 'cover'
      }}>
        <source src="/video/top.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Here is the rest of your content */}
      <div style={{
        position: 'relative',
        zIndex: 100
      }}>
        {/* Rest of your content goes here */}
      </div>
    </div>
  );
}
