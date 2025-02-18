import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ActiveLink from "./ActiveLink"; 
import HoverTooltip from "./HoverToolTip"; 

const HeaderMenu = () => {
  return (
    <nav className="w-3/5 flex justify-center items-center">
      <div>
        {/* Articles Link */}
        <HoverTooltip label="Articles">
          <ActiveLink href="/articles">
            <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6 text-gray-500 hover:text-green-500 xl:hidden" />
            <span className="hidden xl:inline-block">Articles</span>
          </ActiveLink>
        </HoverTooltip>

        {/* About Link */}
        <HoverTooltip label="About">
          <ActiveLink href="/about">
            <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-6 text-gray-500 hover:text-blue-500 xl:hidden" />
            <span className="hidden xl:inline-block">About</span>
          </ActiveLink>
        </HoverTooltip>

        {/* Contact Link */}
        <HoverTooltip label="Contact">
          <ActiveLink href="/contact">
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gray-500 hover:text-purple-500 xl:hidden" />
            <span className="hidden xl:inline-block">Contact</span>
          </ActiveLink>
        </HoverTooltip>
      </div>
    </nav>
  );
};

export default HeaderMenu;