import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ModeToggle } from '@/components/layout/ModeToggler'

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  // { href: "#", label: "Pricing" },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },

  /* {
    label: "Features",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#",
        label: "Components",
        description: "Browse all components in the library.",
      },
      {
        href: "#",
        label: "Documentation",
        description: "Learn how to use the library.",
      },
      {
        href: "#",
        label: "Templates",
        description: "Pre-built layouts for common use cases.",
      },
    ],
  }, */
  /* {
    label: "Pages",
    submenu: true,
    type: "simple",
    items: [
      { href: "#", label: "Page A" },
      { href: "#", label: "Page B" },
      { href: "#", label: "Page C" },
      { href: "#", label: "Page D" },
    ],
  }, */
  /* {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      { href: "#", label: "Getting Started", icon: "BookOpenIcon" },
      { href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
      { href: "#", label: "About Us", icon: "InfoIcon" },
    ],
  }, */
]

export default function DashboardHeader() {
  return (
    <header className="border-b px-4 md:px-6 w-full">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          

        </div>
        {/* Right side */}
{/*         <div className="flex items-center gap-2 w-full">
           <Button asChild size="sm" className="text-sm">
            <a href="#">Signin</a>
          </Button> 
        </div> */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button className='bg-primary-foreground dark:text-white text-black'>Logout</Button>
        </div>
      </div>
    </header>
  )
}
