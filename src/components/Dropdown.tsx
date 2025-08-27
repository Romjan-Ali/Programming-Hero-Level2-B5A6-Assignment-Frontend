import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type dropdownProps = {
  title: string
  items: string[]
  inputKey: string
  setInputData: React.Dispatch<React.SetStateAction<any>>
}

export default function Dropdown({
  title,
  items,
  inputKey,
  setInputData,
}: dropdownProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {title}
          <ChevronDownIcon
            className="-me-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
        {items.map((item, index) => (
          <DropdownMenuItem   
            key={index.toString()}
            onSelect={() => setInputData((values: any) => ({ ...values, [inputKey]: item }))}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
