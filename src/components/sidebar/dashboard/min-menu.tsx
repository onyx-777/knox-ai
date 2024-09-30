import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMenuOpts } from "@/constants/dashboard";
import {
  Cable,
  Contact,
  Globe,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircleMore,
  Receipt,
  Settings,
} from "lucide-react";
import Image from "next/image";

const iconMap: Record<string, React.ComponentType> = {
  LayoutDashboard,
  MessageCircleMore,
  Receipt,
  Cable,
  Settings,
  Contact,
  Mail,
  Globe,
};

const MinMenu = () => {
  return (
    <Sheet open={true}>
      <SheetContent side={"left"} className="w-fit h-full">
        <div className="mt-10">
          <Tabs defaultValue="dashboard">
            <div>
              <Sheet defaultOpen={true}>
                <SheetTrigger asChild>
                  <Menu className="w-full" />
                </SheetTrigger>
                <SheetContent side={"left"} className="w-full h-full">
                  <SheetHeader>
                    <div className="w-full flex justify-between items-center">
                      <div>
                        <Image
                          src={"/images/logo.png"}
                          alt="logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="mt-10">
                    <Tabs defaultValue="dashboard">
                      <div>
                        <TabsList className="flex flex-col justify-center items-center h-fit bg-white py-10 rounded-xl gap-5">
                          {dashboardMenuOpts.map(({ icon, name, value }) => {
                            const IconComponent = iconMap[icon];
                            return (
                              <TabsTrigger
                                key={name}
                                value={value}
                                className="gap-4 flex justify-start items-center pl-4 w-full rounded-xl hover:shadow-lg hover:bg-orange text-gray-700 hover:text-white focus:bg-red-600"
                              >
                                <span>
                                  <IconComponent />
                                </span>
                                <span className="font-bold text-xl">
                                  {name}
                                </span>
                              </TabsTrigger>
                            );
                          })}
                        </TabsList>
                      </div>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>

              <TabsList className="flex flex-col justify-center items-center w-fit h-fit bg-white py-10 rounded-xl gap-5">
                {dashboardMenuOpts.map(({ icon, name, value }) => {
                  const IconComponent = iconMap[icon];
                  return (
                    <TabsTrigger
                      key={name}
                      value={value}
                      className="gap-4 flex justify-start items-center px-4 w-full rounded-xl hover:shadow-lg hover:bg-orange text-gray-700 hover:text-white focus:bg-red-600"
                    >
                      <span>
                        <IconComponent />
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MinMenu;
