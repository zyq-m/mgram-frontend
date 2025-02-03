import * as React from "react";
import { Activity, Gauge, ListChecks, ScatterChart } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import { AuthUser, NavUserProps } from "@/lib/type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<NavUserProps>();
  const [nav, setNav] = React.useState({
    navMain: [
      {
        title: "Dashboard",
        url: "home",
        icon: Gauge,
      },
      {
        title: "Predict",
        url: "predict",
        icon: ScatterChart,
      },
      {
        title: "Result",
        url: "result",
        icon: ListChecks,
      },
    ],
  });

  React.useEffect(() => {
    const { sub }: { sub: AuthUser } = jwtDecode(
      sessionStorage.getItem("accessToken") ?? "",
    );
    setUser({
      email: sub?.email ?? "",
      name: sub?.name ?? "",
    });
    if (sub.role == "ADMIN")
      setNav({
        navMain: [
          {
            title: "Dashboard",
            url: "admin/home",
            icon: Gauge,
          },
          {
            title: "Result",
            url: "result",
            icon: ListChecks,
          },
        ],
      });
  }, []);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/app/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mgram</span>
                  <span className="truncate text-xs">
                    Mammogram Classification
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
