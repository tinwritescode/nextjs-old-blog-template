import React, { useCallback } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import useToggle from "../hooks/useToggle";
import { signIn, signOut, useSession } from "next-auth/react";

const nav = [
  { name: "Home", href: "/", tooltip: "Về trang chủ" },
  { name: "FB toolkit", href: "/fb-toolkit", tooltip: "Facebook toolkit" },
];
function Header() {
  const [menu, toggleMenu] = useToggle(false);
  const { data: session, status } = useSession({ required: false });

  const turnOffMenu = useCallback(() => {
    if (menu) toggleMenu();
  }, [menu, toggleMenu]);

  return (
    <>
      <div className={styles.header}>
        <div
          className={`${styles.navigatorCollapse} ${
            menu ? styles.navigatorCollapse__active : ""
          }`}
        >
          <div
            onClick={() => toggleMenu()}
            className="absolute p-2 -top-3 -bottom-3 right-0 left-0 select-none z-10"
          />
        </div>
        <div className={styles.logo}>
          <h1>
            <Link href="/">Laputa</Link>
          </h1>
        </div>
        <nav
          className={`${styles.navigator} ${menu ? styles.menu_active : ""}`}
        >
          <ul className="flex-grow z-50">
            {nav.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <a data-tooltip={item.tooltip} onClick={turnOffMenu}>
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <button
              type="submit"
              className="text-white flex gap-1 items-center p-4 bg-black rounded-t-md md:rounded w-full"
              onClick={(e) => {
                if (session) {
                  signOut();
                } else {
                  signIn();
                }
              }}
            >
              <LoginSvg />
              {!session ? "Đăng nhập" : `${session.user.name} | Đăng xuất`}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

const LoginSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    />
  </svg>
);
export default Header;
