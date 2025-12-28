import ContainerWrapper from "@/components/wrapper/container";
import Link from "next/link";

const NotFound = () => {
  return (
    <ContainerWrapper>
      <div className="flex py-10 flex-col items-center justify-center ">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500 underline ">
          Go back to the home page
        </Link>
      </div>
    </ContainerWrapper>
  );
};

export default NotFound;
