import { useRouter } from "next/navigation";

type BottomWarningType = {
  warning: string;
  link: string;
};

const BottomWarning = ({ warning, link }: BottomWarningType) => {
  const router = useRouter();
  return (
    <div className=" font-semibold flex mt-2 mb-7">
      {warning}{" "}
      <p className="underline ml-2 cursor-pointer">
        <button
          onClick={() => {
            if (link == "Login") {
              router.push("signin");
            }
            else{
              router.push("/signup")
            }
          }}
          className=" underline"
        >
          {link}
        </button>{" "}
      </p>
    </div>
  );
};

export default BottomWarning;
