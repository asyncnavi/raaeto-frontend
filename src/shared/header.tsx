import { useUser } from "@clerk/clerk-react";
import { IconChevronDown, IconUser } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateOrganizationModal from "./createOrganizationModal";
import { useGetUserOrganization } from "../api/organization";
import LoadingOverlay from "../ui/loadingOverlay";

type ProfileMenuProps = {
  name: string;
  email: string;
};

// TODO : Create profile dropdown
const ProfileMenu: FC<ProfileMenuProps> = ({ name, email }) => {
  return (
    <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-50 p-2">
      <div className="border border-black w-8 h-8 flex justify-center items-center rounded-full">
        <IconUser />
      </div>
      <div className="flex flex-col">
        <span className="text-sm">{name}</span>
        <span className="text-xs">{email}</span>
      </div>
      <div className="border  w-5 h-5 flex justify-center items-center rounded-full">
        <IconChevronDown />
      </div>
    </div>
  );
};

// TODO : Create profile dropdown
const Header = () => {
  const [createModal, setCreateModal] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  const { data: organization, isLoading } = useGetUserOrganization();

  const triggerCreateModal = () => setCreateModal(!createModal);
  return (
    <header className="w-full border-b-2 border-black py-4  top-0 bg-white">
      <LoadingOverlay loading={isLoading || !isLoaded} />
      <CreateOrganizationModal
        opened={createModal}
        trigger={triggerCreateModal}
      />
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold font-['Gorditas'] text-4xl">
          {" "}
          Raateo{" "}
        </Link>
        {!isSignedIn ? (
          <div className="flex gap-2">
            <Link
              to="/auth/signin"
              className="outline-none border-2 border-black px-4 py-2 bg-lime-300 font-semibold hover:shadow-[4px_4px_black]"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="outline-none border-2 border-black px-4 py-2  font-semibold hover:shadow-[4px_4px_black]"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex">
            {pathname != "/dashboard" && (
              <>
                {" "}
                {organization ? (
                  <Link
                    to="/dashboard"
                    className="outline-none border-2 border-black px-2 py-1 bg-lime-300 font-semibold text-sm flex items-center"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={triggerCreateModal}
                    className="outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold"
                  >
                    Create Organization
                  </button>
                )}{" "}
              </>
            )}

            <ProfileMenu
              name={user.firstName as string}
              email={user.primaryEmailAddress?.emailAddress ?? ""}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
