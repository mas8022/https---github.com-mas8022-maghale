import React, { memo } from "react";
import Title from "../../_components/template/title";
import MessageBoxAuthor from "../../_components/modules/messageBoxAuthor";
import AuthorReceiveMessageModel from "@/models/AuthorReceiveMessage";
import { GetAuthorId } from "@/utils/author";
import TextBox from "../../_components/modules/textBox";

const page = memo(async () => {
  const authorId = await GetAuthorId();
  const messages = await AuthorReceiveMessageModel.find(
    {
      ...(authorId && { author: authorId }),
      seen: false,
    },
    "-author -seen -__v"
  ).lean();

  return (
    <div className="w-full">
      <Title title={"پیام های شما از طرف سایت"} />
      {messages?.length ? (
        <div className="w-full p-12 flex flex-col gap-8 bg-second/5 dark:bg-[#0f172a] rounded-3xl">
          {messages.map((item) => (
            <MessageBoxAuthor
              messageData={JSON.parse(JSON.stringify(item))}
              key={item._id}
            />
          ))}
        </div>
      ) : (
        <TextBox text="پیامی در این قسمت وجود ندارد" />
      )}
    </div>
  );
});

export default page;
