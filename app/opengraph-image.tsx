import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Centro Popular Comercial";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const Image = async () =>
  new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="bg-gray-50 flex w-full">
        <div tw="flex flex-col w-full py-6 px-4 md:items-center justify-between p-4">
          <h1 tw="flex flex-col text-6xl font-bold tracking-tight text-gray-900 text-center">
            Centro Popular Comerical
          </h1>
          <p tw="flex flex-col text-lg tracking-tight text-gray-900 text-center">
            {process.env.SITE_URL}
          </p>
          <div tw="mt-2 flex">
            <img
              src="https://scontent.fbga1-3.fna.fbcdn.net/v/t39.30808-6/448497032_1006430781483436_3809951709542986804_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=CKbRaQ9mfwwQ7kNvgHvMa-C&_nc_zt=23&_nc_ht=scontent.fbga1-3.fna&_nc_gid=AZk8A9n_vQ_d3ydFDbHAi6v&oh=00_AYAp96pD9S-cmZz5ZTNMP53ILbNeRBG_14ee4y705C1uRA&oe=67148EF6"
              tw="max-w-3xl rounded"
            />
          </div>
        </div>
      </div>
    </div>,
    {
      height: size.height,
      width: size.width,
      emoji: "twemoji",
    },
  );

export default Image;
