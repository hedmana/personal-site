import Image from "next/image";

export default function ProfileImage() {
  return (
    <Image
      src="/axel.jpg"
      alt="Axel Hedman"
      width={300}
      height={300}
      priority
      className="rounded-full border-4 border-gray-200 shadow-md select-none"
    />
  );
}
