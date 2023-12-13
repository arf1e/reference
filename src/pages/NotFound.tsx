import ListEmpty from '../components/ListEmpty';

export default function NotFound() {
  return (
    <ListEmpty
      title="We don't have the page you tried to request."
      description="We're sorry. Kind of."
    />
  );
}
