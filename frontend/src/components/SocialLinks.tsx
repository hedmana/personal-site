// SocialLinks.tsx
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SocialLink from "./SocialLink";

export default function SocialLinks() {
  return (
    <div className="flex space-x-6 select-none">
      <SocialLink
        href="https://github.com/hedmana"
        label="GitHub"
        icon={<FaGithub className="text-xl" />}
      />
      <SocialLink
        href="https://www.linkedin.com/in/axel7/"
        label="LinkedIn"
        icon={<FaLinkedin className="text-xl" />}
      />
      <SocialLink
        href="https://x.com/hedmanax"
        label="X"
        icon={<FaXTwitter className="text-xl" />}
      />
      <SocialLink
        href="mailto:axelhedman00@gmail.com"
        label="Email"
        icon={<FaEnvelope className="text-xl" />}
      />
    </div>
  );
}
