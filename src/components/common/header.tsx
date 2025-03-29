import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem, User,
    Link as HeroLink, Switch
} from "@heroui/react";
import {Link} from 'react-router-dom'
import {useUser, useClerk } from "@clerk/clerk-react";
import {useTheme} from "@heroui/use-theme";
import {IconMoon, IconSun} from "@tabler/icons-react";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const { theme, setTheme } = useTheme()



    return (
        <Navbar isBordered maxWidth="2xl" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="space-x-4">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link to="/" className="font-bold text-2xl text-inherit">RateO</Link>
                </NavbarBrand>
            </NavbarContent>

            {
                !isSignedIn ? (<NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link to="/auth/signin">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" to="/auth/signup" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>) : (

                    <NavbarContent as="div" justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <User
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                        isBordered : true,
                                        size : "sm",
                                        color  : "success",
                                    }}
                                    description={user?.primaryEmailAddress?.emailAddress}
                                    name={user?.firstName}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{user?.primaryEmailAddress?.emailAddress}</p>
                                </DropdownItem>
                                <DropdownItem as={HeroLink} href="/o" key="organization">Organization</DropdownItem>
                                <DropdownItem key="theme_switch">
                                    <Switch
                                        isSelected={theme=="dark"}
                                        color="success"
                                        endContent={<IconMoon />}
                                        size="sm"
                                        startContent={<IconSun/>}
                                        onChange={(e) => {
                                            setTheme(e.target.checked ? "dark" : "light")
                                        }}
                                    >
                                        Dark mode
                                    </Switch>
                                </DropdownItem>

                                <DropdownItem key="help_and_feedback">My Profile</DropdownItem>
                                <DropdownItem onPress={() =>signOut()} key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                )
            }

        </Navbar>
    );
}

