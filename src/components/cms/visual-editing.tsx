import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

export async function CmsVisualEditing() {
  return (await draftMode()).isEnabled ? <VisualEditing /> : null;
}
