export default async function EditUser({
  params,
}: {
  params: Promise<{ USER_ID: string }>;
}) {
  const { USER_ID } = await params;

  return <div>{USER_ID}</div>;
}
