import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRouter } from "next/router";

const AdsNavbar = () => {
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  const router = useRouter();

  const menu = useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: "My Ads",
      icon: "pi pi-users",
      command: () => router.push("/ad"),
    },
    {
      label: "Sign Out",
      icon: "pi pi-upload rotate-90",
      command: () => {
        disconnect();
      },
    },
  ];

  return (
    <header className="sticky z-50 top-0 w-full bg-[#111] border-b border-b-gray-600">
      <div className="p-2 md:p-5 flex items-center justify-between">
        <Link href="/">
          <Image
            width={200}
            height={200}
            className="w-20"
            src="/logo.svg"
            alt="BlockTube Logo"
          />
        </Link>

        <div className="flex items-center  gap-5">
          {address ? (
            <>
              <Button onClick={(e) => menu!.current!.toggle(e)} color="green">
                {address.slice(0, 4)}...{address.slice(-4)}
              </Button>
              <Menu className="mt-1" model={items} popup ref={menu} />
            </>
          ) : (
            <Button severity="help" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdsNavbar;
