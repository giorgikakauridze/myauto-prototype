import { LogoIcon } from "@/icons/logo";
import Link from "next/link";
import ContainerWrapper from "./wrapper/container";

const Navigation = () => {
  return (
    <nav className="bg-white">
      <ContainerWrapper>
        <Link href="/" className="inline-block">
          <LogoIcon />
        </Link>
      </ContainerWrapper>
    </nav>
  );
};

export default Navigation;
