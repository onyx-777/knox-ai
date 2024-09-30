import AiChatBot from '@/components/chatbot'
import React from 'react'

type Props = {
  searchParams: {
    domainId : string
  }
}

const ChatBot = ({ searchParams }: Props) => {
  const domainId = searchParams.domainId
  console.log('domainId : ', domainId)

  return <AiChatBot domainId={domainId}/>
}

export default ChatBot