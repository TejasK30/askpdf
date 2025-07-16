import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "Inbox",
    url: "#",
  },
  {
    title: "Calendar",
    url: "#",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-indigo-50">
        <div>
          <h1 className="text-center text-lg font-bold text-blue-800">
            Askpdf
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-indigo-50">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem className="px-1" key={item.title}>
              <SidebarMenuButton className=" hover:bg-indigo-200" asChild>
                <a href={item.url}>
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
