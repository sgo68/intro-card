type Props = {
  title?: string;
  content?: string;
};

export default function ProfileItem({ title, content }: Props) {
  return (
    <>
      <div className="uppercase flex items-center justify-center rounded-full bg-(--main-color) text-(--title-font-color) w-1/2 h-8 px-4 mb-2">
        {title}
      </div>
      <div className="w-full text-left">{content}</div>
    </>
  );
}
