import Layout from "../../components/layout/Layout";
import TableHeader from "../../components/common/TableHeader";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <Layout>
      <TableHeader title="Change Password" />

      <ChangePasswordForm />
    </Layout>
  );
}