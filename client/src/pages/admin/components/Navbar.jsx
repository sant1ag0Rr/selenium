import { useDispatch, useSelector } from "react-redux";
import {
  openPages,
  setScreenSize,
  showSidebarOrNot,
  toggleSidebar,
} from "../../../redux/adminSlices/adminDashboardSlice/DashboardSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {  Chat, Notification, UserProfile } from ".";
import profiile from "../../../Assets/profile dummy image.png";
import { useEffect } from "react";
import PropTypes from "prop-types";

// NavButton component moved outside of parent component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position={"BottomCenter"}>
    <button
      type="button"
      onClick={customFunc}
      style={{ color, dotColor }}
      className="relative text-xl p-3  hover:bg-gray-100  rounded-full mb-2"
      aria-label={title}
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full right-[8px] top-2  h-2 w-2"
      ></span>
      {icon}
    </button>
  </TooltipComponent>
);

NavButton.propTypes = {
  title: PropTypes.string.isRequired,
  customFunc: PropTypes.func.isRequired,
  icon: PropTypes.node, // assuming icon can be any renderable component
  color: PropTypes.string,
  dotColor: PropTypes.string,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const {  chat, notification, userProfile, screenSize } = useSelector(
    (state) => state.adminDashboardSlice
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(showSidebarOrNot(false));
    } else {
      dispatch(showSidebarOrNot(true));
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <div>
        <NavButton
          title="Menú"
          customFunc={() => dispatch(toggleSidebar())}
          color={"blue"}
          icon={<AiOutlineMenu />}
        />
      </div>

      <div className="flex justify-between">
       

        <NavButton
          title="Chat"
          customFunc={() => dispatch(openPages("chat"))}
          color={"blue"}
          dotColor={"cyan"}
          icon={<BsChatLeft />}
        />

        <NavButton
          title="Notificación"
          customFunc={() => dispatch(openPages("notification"))}
          color={"blue"}
          dotColor={"gold"}
          icon={<RiNotification3Line />}
        />
                  <TooltipComponent content="perfil" position="BottomCenter">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-lg mt-2"
            onClick={() => dispatch(openPages("userProfile"))}
            onKeyDown={(e) => e.key === 'Enter' && dispatch(openPages("userProfile"))}
            aria-label="Abrir perfil de usuario"
          >
            <img src={profiile} alt="" className="w-4 h-4 rounded-full " />
            <p>
              <span className="text-[12px] text-gray-400">Hola,</span>{" "}
              <span className="text-gray-400 font-semi-bold  text-[12px]">
                {currentUser?.username || "Usuario"}
              </span>
            </p>
            <MdKeyboardArrowDown />
          </button>
        </TooltipComponent>

        
        {chat && <div className="relative top-9 right-0"><Chat /></div>}
        {notification && <div className="relative top-9 right-0"><Notification /></div>}
        {userProfile && <div className="relative top-9 right-0"><UserProfile /></div>}
      </div>
    </div>
  );
};

export default Navbar;
