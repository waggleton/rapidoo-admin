import Link from "next/link";
import UpdateMobileBox from "@/components/Modal/update_mobile_box";


type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};


export default function Page({ searchParams }: SearchParamProps) {
  const show = searchParams?.show;

  return (
    <>
      <Link href="/Modal?show=true">
        SUMMON THE MODAL
      </Link>

      {show && <UpdateMobileBox admin_id = {1} />}
    </>
  );
}