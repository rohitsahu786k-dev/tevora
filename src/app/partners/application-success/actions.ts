"use server";

import { partnerApplicationAdapters } from "@/lib/integrations/partner-application";

export async function getPartnerApplicationReceipt(reference: string) {
  if (
    !partnerApplicationAdapters.configured ||
    !/^TVP-\d{8}-[A-F0-9]{8}$/.test(reference)
  )
    return null;
  return partnerApplicationAdapters.database.getReceipt(reference);
}
