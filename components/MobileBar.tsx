import Link from "next/link";
import Icon from "@/components/Icon";

/** Fixed bottom bar on phones: what's pouring + order to go. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-foam/95 p-2.5 backdrop-blur sm:hidden [padding-bottom:max(0.625rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-2">
        <Link href="/beer/" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-stout font-bold tracking-wide text-paper uppercase">
          <Icon name="beer" className="h-4 w-4" /> On tap
        </Link>
        <Link href="/to-go/" className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-brick font-bold tracking-wide text-paper uppercase">
          <Icon name="bag" className="h-4 w-4" /> To go
        </Link>
      </div>
    </div>
  );
}
