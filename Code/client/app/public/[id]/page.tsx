import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const path = `${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}/${id}.pdf`;

  return (
    <div className="top-0 left-0 bottom-0 right-0 absolute">
      <object
        className="w-full h-screen"
        data={path}
        type="application/pdf"
      ></object>
    </div>
  );
}
