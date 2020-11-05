import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
}

export function Head({ title }: Props) {
  return (
    <>
      <Helmet>
        <title>{title} | Centro de salud 5 esquinas</title>
        <link rel="shortcut icon" href="logo-farmacia-removebg-preview.png" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
      </Helmet>
    </>
  );
}
