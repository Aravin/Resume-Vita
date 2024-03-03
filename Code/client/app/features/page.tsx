import { Metadata } from "next";
import FeaturesList from "../../components/feature/FeatureList";
import Features from "../../components/feature/Feature";

export const metadata: Metadata = {
  title: "ResumeVita.com Features",
};

export default function Page() {
  return (
    <>
      <Features />
      <FeaturesList />
    </>
  );
}
