import Link from "next/link";
import { FaVirus, FaLongArrowAltLeft } from "react-icons/fa";

export default function GameLink() {
  return (
    <div className="flex items-center text-white select-none">
      <Link
        href="/NKCellGame"
        aria-label="Play NK Cell Game"
        className="flex items-center"
      >
        <FaVirus className="text-3xl mr-4 virus-flip" />
      </Link>
      <FaLongArrowAltLeft className="text-xl mr-2 text-white" />
      <span className="text-xs italic text-white">click me</span>
    </div>
  );
}
