import { CopyLeft } from "./CopyLeft";
import SiteIcon from "../Common/SiteIcon";
import Socials from "../Common/Socials";

export default function Footer({}) {
  return (
    <>
      <footer className='w-screen place-self-end bg-me-base text-me-inverted'>
        <div className='flex-row items-center space-y-4 py-6 md:flex'>
          <div className='flex justify-center md:mx-8'>
            <SiteIcon />
          </div>
          <CopyLeft />
          <Socials />
        </div>
      </footer>
    </>
  );
}