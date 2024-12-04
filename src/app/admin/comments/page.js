import { requireAdmin } from "@/utils/auth";

export const getServerSideProps = requireAdmin;

export default function AdminCommentsPage() {
  return <h1>Админская панель для управления комментариями</h1>;
}