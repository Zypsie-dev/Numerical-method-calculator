import {
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";


const StaggeredDropDown = ({setMode}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleMethodSelect = (method) => {
     setMode(method);
     setOpen(false);
   };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="method"
      ref={dropdownRef}
    >
      <button onClick={() => setOpen((pv) => !pv)} className="dropdown-btn">
        <span>Select Method</span>
        <motion.span variants={iconVariants}>
          <FiChevronDown />
        </motion.span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="dropdown-menu"
      >
        <Option setOpen={setOpen} text="Bisection" OnClick={()=>handleMethodSelect('bisection')}/>
        <Option setOpen={setOpen} text="Secant" OnClick={()=>handleMethodSelect('secant')}/>
      </motion.ul>
    </motion.div>
  );
};

const Option = ({ text, OnClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={OnClick}
      className="dropdown-item"
    >
        <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    display: "flex",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    display: "none",
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};