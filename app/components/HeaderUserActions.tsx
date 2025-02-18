// app/components/HeaderUserActions.tsx

import HoverTooltip from "@/app/components/HoverToolTip";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import UserMenu from "./UserMenu";
import ActiveLink from "./ActiveLink"; 

const HeaderUserActions = ({ status }: { status: string }) => {
  return (
    <div className="w-1/5 flex flex-row justify-end gap-2 items-center">
        <div><DarkModeToggle /></div>
      {status === "authenticated" ? (
        <UserMenu />
      ) : (
        <>
          <HoverTooltip label="Login">
            <ActiveLink href="/login">
                <Link href="/login">
                <FontAwesomeIcon icon={faSignInAlt} className="w-6 h-6 text-gray-500 hover:text-yellow-500 xl:hidden" />
                <span className="hidden xl:inline-block">Login</span>
                </Link>
            </ActiveLink>
          </HoverTooltip>
          <HoverTooltip label="Register">
            <ActiveLink href="/register">
                <Link href="/register">
                <FontAwesomeIcon icon={faUserPlus} className="w-6 h-6 text-gray-500 hover:text-blue-500 xl:hidden" />
                <span className="hidden xl:inline-block">Register</span>
                </Link>
            </ActiveLink>
          </HoverTooltip>
        </>
      )}
    </div>
  );
};

export default HeaderUserActions;