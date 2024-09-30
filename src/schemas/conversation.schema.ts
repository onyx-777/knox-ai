import { ZodType, z } from 'zod'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './domain.schema'

export type ConversationSearchProps = {
  query: string
  domain: string
}

export const ConversationSearchSchema: ZodType<ConversationSearchProps> =
  z.object({
    query: z.string().min(1, { message: 'You must entery a search query' }),
    domain: z.string().min(1, { message: 'You must select a domain' }),
  })
