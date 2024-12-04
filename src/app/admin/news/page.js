import { requireAdmin } from "@/utils/auth";

export const getServerSideProps = requireAdmin;

export default function AdminNewsPage() {
  return <h1>Админская панель для управления новостями</h1>;
}