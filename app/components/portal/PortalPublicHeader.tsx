import { LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PortalPublicHeader() {
  return (
    <div className="border-b border-[#D9E7F3] bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logoimage.svg"
            alt="ilmaLink logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>
            <strong className="block text-sm font-black tracking-wide text-[#082A62]">
              ilmaLink
            </strong>
            <span className="block text-[9px] font-semibold text-[#60738F]">
              ilmaLink portal
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 text-xs font-bold text-[#48627F] sm:flex">
          <ShieldCheck className="h-4 w-4 text-[#08A776]" />
          Verified student access
          <LockKeyhole className="ml-2 h-4 w-4 text-[#1769E8]" />
          Secure password login
        </div>
      </div>
    </div>
  );
}
