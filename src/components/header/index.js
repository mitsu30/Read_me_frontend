import Image from "next/image";
import Link from "next/link";

export default function Header({ position }) {
  const navList = [
    "07_router",
    "08_multipage",
    "09_multipage_state",
    "10_layout",
    "11_head_script",
  ];
  return (
    <header
      className={position === "top" ? "header" : "headerBottom"}
    >
      <Link href="/">
        <a>
          <Image src="/vercel.svg" alt="vercel" width={177} height={40} />
        </a>
      </Link>
      <nav>
        <ul className="nav">
          {navList.map((item) => {
            return (
              <li key={item}>
                <Link href={`/${item}`}>
                  <a className="link">{item}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
