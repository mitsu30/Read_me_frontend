import Header from "../header";

export default function Layout2({ children }) {
  return (
    <>
      <Header position="bottom" />
      <main className="layout2">
        {children}
      </main>
    </>
  );
}
