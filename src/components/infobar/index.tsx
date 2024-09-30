import React from 'react'
import { Card } from '../ui/card'
import { Headphones, Star, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Domain } from '@prisma/client'

type Props = {
  data ?: Domain
}

const InfoBar = ({data}: Props) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-3 items-center">
        <div>
          <Card className="rounded-xl flex gap-3 py-3 px-4 text-ghost">
            <Trash />
            <Star></Star>
          </Card>
        </div>
        <Avatar>
          <AvatarFallback className="bg-orange text-white">
            <Headphones />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src={data?.icon ? data.icon : undefined}
            alt="avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default InfoBar
