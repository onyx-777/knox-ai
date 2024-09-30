import { getAllDomainsData } from "@/actions/domain";
import { getAllHelpDeskQuestions, onGetAllAccountDomains } from "@/actions/bot-training";
import { DomainSettingsProps } from "@/schemas/domain.schema";
import { Prisma } from "@prisma/client";

export type DomainData = Prisma.PromiseReturnType<typeof getAllDomainsData>

export type IntegrateDomainWithoutUser = Prisma.DomainUpdateWithoutUserInput & DomainSettingsProps

export type HelpDeskQuestions = Prisma.PromiseReturnType<typeof getAllHelpDeskQuestions>

export type ConversationCustomerType = Prisma.PromiseReturnType<typeof onGetAllAccountDomains>