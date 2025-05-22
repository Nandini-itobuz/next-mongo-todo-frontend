"use client";

import Header from "@/components/Header";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Home from "pages/Home";

export default function HomePage() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      // navbar={{
      //   width: 300,
      //   breakpoint: "sm",
      //   collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      // }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}
      <AppShell.Main>
        {/* <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button> */}
        <Home />
      </AppShell.Main>
    </AppShell>
  );
}
