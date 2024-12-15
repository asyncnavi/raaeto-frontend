import { IconLoaderQuarter } from "@tabler/icons-react";
import { FC } from "react";

type LoadingOverlayProps = {
  loading: boolean;
};

const LoadingOverlay: FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0  w-full bg-[rgba(0,0,0,0.70)] flex justify-center items-center">
      <div className="animate-spin ">
        <IconLoaderQuarter color="#a3e635" size={100} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
