import { useParams } from "@remix-run/react";

export default function Meals() {
  const params = useParams();
  return <div>Meals for {params["foodType"]}</div>;
}
