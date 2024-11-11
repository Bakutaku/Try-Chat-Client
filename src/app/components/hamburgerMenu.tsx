import { motion, Variants } from "framer-motion";

/**
 * ハンバーガーメニュー(動きあり!)
 */
export default function HamburgerMenu({isOpen = false}){
  // メニューボタンのアニメーション定義
  const menuIcon1:Variants = {
    open: {
      y:12,
      rotate:45
    },
    close:{
      y:0,
      rotate:0
    }
  }
  const menuIcon2:Variants = {
    open: {
      opacity:0
    },
    close:{
      opacity:1
    }
  }
  const menuIcon3:Variants = {
    open: {
      y:-12,
      rotate:-45
    },
    close:{
      y:0,
      rotate:0
    }
  }

  return (
    <motion.div initial={false} animate={isOpen ? "open" : "close"}>
      <motion.div variants={menuIcon1} className="bar bg-text rounded"></motion.div>
      <motion.div variants={menuIcon2} className="bar my-2 bg-text rounded"></motion.div>
      <motion.div variants={menuIcon3} className="bar bg-text rounded"></motion.div>
    </motion.div>
  );
}