import FrontPageHeading from "@/components/FrontPageHeading";
import ProfileImage from "@/components/ProfileImage";
import FrontPageText from "@/components/FrontPageText";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-5 p-4 text-center space-y-4">
      <FrontPageHeading />
      <ProfileImage />
      <FrontPageText />
      <SocialLinks />
    </main>
  );
}
