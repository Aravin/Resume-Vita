import { ErrorScreen } from "../../components/errors/ErrorScreen";

export default function ServerErrorPage() {
  return (
    <ErrorScreen
      title="Server error"
      description="We couldn’t complete this request. Please try again in a moment. If the problem continues, contact us below or open an issue on GitHub."
      code="500"
    />
  );
}
